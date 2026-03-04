import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { IoSearchOutline } from "react-icons/io5";
import Data from '@/Shared/Data';
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

    export default function Search() {
      const navigate = useNavigate();
      const[cars,setCars]=useState();
      const[make,setMake]=useState();
      const[price,setPrice]=useState();
      const handleSearch = () => {
      if (!cars && !make && !price) {
        alert("Please select at least one filter");
        return;
      }

      const searchParams = new URLSearchParams();

      if (cars) searchParams.append("cars", cars);
      if (make) searchParams.append("make", make);
      if (price) searchParams.append("price", price);

      navigate(`/search?${searchParams.toString()}`);
    };
  return (
    <div className="flex flex-col md:flex-row items-center gap-5 p-3 md:p-5 bg-white rounded-md md:rounded-full px-5 w-[60%] shadow-md">
      
      <Select onValueChange={(value)=>setCars(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Used">Used</SelectItem>
            <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select onValueChange={(value)=>setMake(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
            {Data.CarMakes.map((maker,index)=>(
                <SelectItem value={maker.name}>{maker.name}</SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select onValueChange={(value)=>setPrice(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
           {Data.Pricing.map((maker,index)=>(
                <SelectItem value={maker.amount}>{maker.amount}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      <div
        onClick={handleSearch}
        className="bg-blue-600 rounded-full p-3 shadow-md hover:scale-110 transition-all duration-200 cursor-pointer"
      >
        <IoSearchOutline size={22} color="white" />
      </div>
      
    </div>
  );
}