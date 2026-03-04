import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from './ui/ui/button';
import UserButton from './UserButton';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
export default function Header() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center shadow-sm h-16 px-6 '>
        <img src='/logo.svg' width={200} height={200} style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}/>
              <ul className="hidden md:flex gap-12">
        <li>
          <Link
            to="/"
            className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/search"
            className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary"
          >
            Search
          </Link>
        </li>

        <li>
          <Link
            to="/search?cars=New"
            className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary"
          >
            New
          </Link>
        </li>

        <li>
          <Link
            to="/search?cars=Certified+Pre-Owned"
            className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary"
          >
            Preowned
          </Link>
        </li>
      </ul>
        {user?
        <div className='flex items-center gap-5'>
            <UserButton />
            <Link to={'/profile'}>
                <Button className='bg-blue-600'>Submit Listing</Button>
            </Link>
            
        </div> 
        :
        <Button className='bg-blue-600'>Submit Listing</Button>

        }
    </div>
  )
}
