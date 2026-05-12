import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserButton() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
  <Avatar className="cursor-pointer bg-green-700 text-white hover:bg-blue-700 transition-colors shadow-md">
    <AvatarFallback className="bg-green-800 text-white">
      {user.email?.charAt(0).toUpperCase()}
    </AvatarFallback>
  </Avatar>
</DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>
          {user.email}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}