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
        <ul className='hidden md:flex gap-12'>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Home</li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Search</li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>New</li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Preowned</li>
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
