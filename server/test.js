require("dotenv").config();
const axios = require("axios");

async function test() {
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: "Say hello" }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(res.data.choices[0].message.content);
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

test();