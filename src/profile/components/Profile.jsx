import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { updateProfile, updatePassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/ui/card";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function ProfileUpdate() {
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(tab);

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-muted-foreground">Please login to continue</p>
      </div>
    );

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName,
        photoURL,
      });
      alert("Profile updated successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePasswordChange = async () => {
    try {
      await updatePassword(user, newPassword);
      alert("Password updated successfully");
      setNewPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <div className="min-h-screen bg-muted/40 flex justify-center items-start py-16 px-4">
    <Card className="w-full max-w-xl shadow-lg border bg-background">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">
          My Account
        </CardTitle>
        <CardDescription>
          Manage your profile settings
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* PROFILE TAB */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-semibold">
                    {displayName?.charAt(0)?.toUpperCase()}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Profile Preview
              </p>
            </div>

            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Profile Image URL</Label>
              <Input
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>

            <Button
              className="w-full mt-2"
              onClick={handleProfileUpdate}
            >
              Save Changes
            </Button>
          </TabsContent>

          {/* PASSWORD TAB */}
          <TabsContent value="password" className="space-y-6">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <Button
              variant="destructive"
              className="w-full"
              onClick={handlePasswordChange}
            >
              Update Password
            </Button>
          </TabsContent>

          {/* HISTORY TAB */}
          <TabsContent value="history">
            <div className="text-center text-muted-foreground py-8">
              No activity yet
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
);
}