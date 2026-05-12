import { useState } from "react";
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/ui/card";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/ui/button";

export default function Signup() {
  const [name, setName] = useState("");   // ✅ NEW
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ✅ Set display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert("Account created Successfully");
      navigate("/login");

    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-[420px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <form onSubmit={handleEmailSignup} className="space-y-4">

            {/* ✅ Name Field */}
            <Input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Password (min 6 characters)"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}