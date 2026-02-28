import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from './ui/ui/button';
import UserButton from './UserButton';
export default function Header() {
    const { user } = useContext(AuthContext);
  return (
    <div className='flex justify-between items-center shadow-sm h-16 px-6 '>
        <img src='/logo.svg' width={150} height={150}/>
        <ul className='hidden md:flex gap-12'>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Home</li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Search</li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>New</li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Preowned</li>
        </ul>
        {user?
        <div className='flex items-center gap-5'>
            <UserButton />
            <Button>Submit Listing</Button>
        </div> 
        :
        <Button>Submit Listing</Button>

        }
    </div>
  )
}
