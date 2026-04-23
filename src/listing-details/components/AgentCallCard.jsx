import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function AgentCallCard({ user, carDetail, onClose }) {
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [name, setName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    fetch("https://car-marketplace-3wi8.onrender.com/api/health")
    .then(() => console.log("Backend Ready"))
    .catch((err) => console.log("Backend Wake Failed", err));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

 const handleCall = async () => {
  if (!phone || !name) return;

  setLoading(true);

  try {
    await fetch("https://car-marketplace-3wi8.onrender.com/api/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,          // ✅ Added
        phone,
        carName: carDetail?.listingTitle || "Car",
        price: carDetail?.sellingPrice || "Price",
        year: carDetail?.year || "2021",
      }),
    });

    setCalled(true);
  } catch (e) {
    console.error(e);
  }

  setLoading(false);
};

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{
        background: visible ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(4px)" : "blur(0px)",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        style={{
          transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.35s cubic-bezier(.22,1,.36,1), opacity 0.35s ease",
        }}
        className="w-full max-w-md mx-4 mb-6 sm:mb-0"
      >
        <Card className="overflow-hidden border-0 shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 text-white relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-xl leading-none"
            >
              ✕
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <p className="text-xs text-white/70 uppercase tracking-widest font-medium">
                  AI Marketing Agent
                </p>
                <h3 className="font-semibold text-lg leading-tight">Get a Personalised Call</h3>
              </div>
            </div>
            <p className="mt-2 text-sm text-white/80 leading-snug">
              Our AI agent will call you about{" "}
              <span className="font-medium text-white">
                {carDetail?.listingTitle || "this car"}
              </span>{" "}
              and answer all your questions.
            </p>
          </div>

          <CardContent className="px-6  space-y-4 bg-white">
            {called ? (
              <div className="text-center py-4 space-y-2">
                <div className="text-4xl">📞</div>
                <p className="font-semibold text-gray-800">Call Initiated!</p>
                <p className="text-sm text-muted-foreground">
                  Expect a call on{" "}
                  <span className="font-medium text-gray-700">{phone}</span> shortly.
                </p>
                <Button
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleClose}
                >
                  Done
                </Button>
              </div>
            ) : (
              <>
                {/* Name Field */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Your Name
                  </label>
                  
                    <input
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                
                 
                </div>

                {/* Phone Field */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Mobile Number
                  </label>
                
                    <input
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 00000 00000"
                    />
                 
                    
                 
                </div>

                {/* Edit toggle */}
               
                <Separator />

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    onClick={handleCall}
                    disabled={loading || !phone || !name}
                  >
                    {loading ? "Calling…" : "📞 Get a Call"}
                  </Button>
                  <Button variant="outline" className="flex-1 text-sm" onClick={handleClose}>
                    Skip
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground text-center">
                  We'll never share your number with third parties.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AgentCallCard;