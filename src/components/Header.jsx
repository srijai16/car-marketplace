import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./ui/ui/button";
import UserButton from "./UserButton";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center shadow-sm h-16 px-6">

      {/* Logo */}
      <img
        src="/logo.svg"
        width={200}
        height={200}
        className="cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-12">
        <li>
          <Link className="font-medium hover:scale-105 transition-all hover:text-primary" to="/">
            Home
          </Link>
        </li>

        <li>
          <Link className="font-medium hover:scale-105 transition-all hover:text-primary" to="/search">
            Search
          </Link>
        </li>

        <li>
          <Link className="font-medium hover:scale-105 transition-all hover:text-primary" to="/search?cars=New">
            New
          </Link>
        </li>

        <li>
          <Link className="font-medium hover:scale-105 transition-all hover:text-primary" to="/search?cars=Certified+Pre-Owned">
            Preowned
          </Link>
        </li>
      </ul>

      {/* Right Side (Mobile + Desktop) */}
      <div className="flex items-center gap-3 md:gap-5">

        {user && <UserButton />}

        <Link to="/profile">
          <Button className="bg-blue-600 text-xs md:text-sm px-3 md:px-4">
            Submit Listing
          </Button>
        </Link>

      </div>
    </div>
  );
}