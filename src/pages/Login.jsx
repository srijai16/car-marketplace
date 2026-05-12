import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { useNavigate, useLocation, Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [loginMode, setLoginMode] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Redirect back after login
  const from = location.state?.from?.pathname || "/";

  // 🔹 Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Send OTP
  const handleSendOTP = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      alert("OTP Sent");
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Verify OTP
  const handleVerifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      navigate(from, { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 GitHub Login
  const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Apple Login
  const handleAppleLogin = async () => {
    try {
      const provider = new OAuthProvider("apple.com");
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/40">
      <Card className="w-[420px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Login to Car Marketplace
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* EMAIL LOGIN */}
          {loginMode === "email" && (
            <>
              <form onSubmit={handleEmailLogin} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>

              <div className="text-right text-sm">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setLoginMode("phone")}
                >
                  Use mobile instead
                </button>
              </div>
            </>
          )}

          {/* PHONE LOGIN */}
          {loginMode === "phone" && (
            <>
              <div className="space-y-3">
                <Input
                  type="tel"
                  placeholder="+91XXXXXXXXXX"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button className="w-full" onClick={handleSendOTP}>
                  Send OTP
                </Button>

                <Input
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button className="w-full" onClick={handleVerifyOTP}>
                  Verify OTP
                </Button>

                <div id="recaptcha-container"></div>
              </div>

              <div className="text-right text-sm">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setLoginMode("email")}
                >
                  Use email instead
                </button>
              </div>
            </>
          )}

          {/* Divider */}
          <div className="text-center text-sm text-muted-foreground">
            OR continue with
          </div>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleGoogleLogin}>
              Google
            </Button>

            <Button variant="outline" onClick={handleGithubLogin}>
              GitHub
            </Button>

            <Button
              variant="outline"
              className="col-span-2"
              onClick={handleAppleLogin}
            >
              Apple
            </Button>
          </div>

          {/* Signup */}
          <div className="text-center text-sm pt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}