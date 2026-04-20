require("dotenv").config();

const cors = require("cors");
const express = require("express");
const axios = require("axios");
const twilio = require("twilio");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const callSessions = {};

function sanitizeXML(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Trigger Call ────────────────────────────────────────────────────────────
app.post("/api/call", async (req, res) => {
  const { phone, carName, price, year } = req.body;
  console.log("📞 /api/call received:", { phone, carName, price, year });

  if (!phone || !carName) {
    return res.status(400).json({ error: "Missing phone or carName" });
  }

  try {
    const call = await client.calls.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
      url: `${process.env.SERVER_URL}/voice`,
      statusCallback: `${process.env.SERVER_URL}/call-status`,
      statusCallbackMethod: "POST",
    });

    callSessions[call.sid] = {
      carName,
      price,
      year,
      history: [],
    };

    console.log("✅ Call created | SID:", call.sid);
    console.log("📦 Session stored:", callSessions[call.sid]);

    res.json({ success: true, callSid: call.sid });
  } catch (err) {
    console.error("❌ Call creation failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── Opening Message ──────────────────────────────────────────────────────────
app.post("/voice", (req, res) => {
  const sid = req.body.CallSid;
  console.log("🔵 /voice hit | CallSid:", sid);
  console.log("🔵 Sessions available:", Object.keys(callSessions));

  const session = callSessions[sid];
  console.log("🔵 Session found:", session);

  const carName = sanitizeXML(session?.carName ?? "the car");
  const year    = sanitizeXML(session?.year    ?? "");
  const price   = sanitizeXML(session?.price   ?? "");

  const msg = `Hi! You recently viewed the ${carName}${year ? `, ${year} model` : ""}${price ? `, priced at ${price}` : ""}. Are you still interested?`;

  res.type("text/xml");
  res.send(`
<Response>
  <Say voice="alice">${msg}</Say>
  <Gather input="speech" action="/respond?sid=${sid}" method="POST" speechTimeout="2" timeout="6">
  </Gather>
  <Say voice="alice">We didn't catch that. We'll try again later. Goodbye.</Say>
  <Hangup/>
</Response>`);
});

// ─── Handle Customer Reply ────────────────────────────────────────────────────
app.post("/respond", async (req, res) => {
  const sid        = req.body.CallSid || req.query.sid;
  const userSpeech = (req.body.SpeechResult || "").trim();

  console.log("🟡 /respond hit | SID:", sid);
  console.log("🟡 Speech:", userSpeech);
  console.log("🟡 Session:", callSessions[sid]);

  if (!sid || !callSessions[sid]) {
    console.log("❌ No session found for SID:", sid);
    return res.type("text/xml").send(`
<Response>
  <Say voice="alice">Sorry, something went wrong. Goodbye.</Say>
  <Hangup/>
</Response>`);
  }

  if (!userSpeech) {
    return res.type("text/xml").send(`
<Response>
  <Say voice="alice">Sorry, I didn't catch that.</Say>
  <Gather input="speech" action="/respond?sid=${sid}" method="POST" speechTimeout="2" timeout="6">
  </Gather>
  <Hangup/>
</Response>`);
  }

  const session = callSessions[sid];
  session.history.push({ role: "user", content: userSpeech });

  let aiReply;
  try {
    aiReply = await getAIReply(session);
  } catch (err) {
    console.error("❌ AI error:", err.message);
    aiReply = "Sorry, I'm having trouble right now. Our team will follow up with you. Goodbye.";
  }

  session.history.push({ role: "assistant", content: aiReply });
  console.log("🤖 AI Reply:", aiReply);

  const safeReply = sanitizeXML(aiReply);

  // End call if AI signals goodbye
  const isEnding = /goodbye|bye|take care|follow up shortly|not interested/i.test(aiReply);

  res.type("text/xml");
  if (isEnding) {
    res.send(`
<Response>
  <Say voice="alice">${safeReply}</Say>
  <Hangup/>
</Response>`);
  } else {
    res.send(`
<Response>
  <Say voice="alice">${safeReply}</Say>
  <Gather input="speech" action="/respond?sid=${sid}" method="POST" speechTimeout="2" timeout="6">
  </Gather>
  <Say voice="alice">Thanks for your time. Goodbye.</Say>
  <Hangup/>
</Response>`);
  }
});

// ─── Call Status Cleanup ──────────────────────────────────────────────────────
app.post("/call-status", (req, res) => {
  const { CallSid, CallStatus } = req.body;
  console.log("📋 Call status:", CallSid, CallStatus);
  if (["completed", "failed", "busy", "no-answer", "canceled"].includes(CallStatus)) {
    delete callSessions[CallSid];
    console.log("🗑️ Session cleaned up for:", CallSid);
  }
  res.sendStatus(200);
});

// ─── AI Reply ─────────────────────────────────────────────────────────────────
async function getAIReply(session) {
  const systemPrompt = `You are a car sales voice agent on a phone call.

You are calling about ONE specific car only:
- Car: ${session.carName}
- Year: ${session.year}
- Price: ${session.price}

STRICT RULES — follow every turn without exception:
1. Reply in 1 sentence only. Maximum 2 if absolutely needed.
2. Plain speech only — no lists, symbols, markdown, or numbers written as digits.
3. Never say filler words: no "Great!", "Sure!", "Of course!", "Certainly!"
4. ALWAYS refer back to ${session.carName} when relevant — never forget the car.
5. If customer is interested → say the sales team will contact them shortly, then say goodbye.
6. If customer is not interested → thank them politely and say goodbye.
7. If customer asks something off-topic → politely redirect to the ${session.carName}.
8. Never invent details not provided above.
9. Never discuss other cars.`;

  // Always anchor first 2 messages (captures initial yes/no intent) + last 4
  const anchoredHistory =
    session.history.length <= 6
      ? session.history
      : [
          ...session.history.slice(0, 2),
          ...session.history.slice(-4),
        ].filter(
          (v, i, a) => a.findIndex((x) => x.content === v.content) === i
        );

  console.log("📜 Sending history to AI:", anchoredHistory);

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-4o-mini",
      max_tokens: 60,
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        ...anchoredHistory,
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 8000,
    }
  );

  return response.data.choices[0].message.content.trim();
}

app.listen(5000, () => console.log("🚀 Server running on port 5000"));