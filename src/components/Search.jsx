import React from 'react'
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

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-5 p-3 md:p-5 bg-white rounded-md md:rounded-full px-5 w-[60%] shadow-md">
      
      <Select>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="light">New</SelectItem>
            <SelectItem value="dark">Old</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select>
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

      <Select>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
           {Data.Pricing.map((maker,index)=>(
                <SelectItem value={maker.amount}>{maker.amount}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      <div className="bg-blue-600 rounded-full p-3 shadow-md hover:scale-110 transition-all duration-200 cursor-pointer">
        <IoSearchOutline size={22} color="white" />
      </div>
    </div>
  );
}