import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { IoSearchOutline } from "react-icons/io5";
import Data from "@/Shared/Data";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();

  const [cars, setCars] = useState();
  const [make, setMake] = useState();
  const [price, setPrice] = useState();

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
    <div className="flex flex-row items-center gap-2 md:gap-5 py-2 md:p-5 px-3 md:px-5 bg-white rounded-full w-[95%] md:w-[60%] shadow-md">

      {/* Cars */}
      <Select onValueChange={(value) => setCars(value)}>
        <SelectTrigger className="outline-none border-none w-full shadow-none text-sm md:text-lg truncate">
          
          <SelectValue placeholder="Cars" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Used">Used</SelectItem>
            <SelectItem value="Certified Pre-Owned">
              Certified Pre-Owned
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      {/* Car Makes */}
      <Select onValueChange={(value) => setMake(value)}>
        <SelectTrigger className="outline-none border-none w-full shadow-none text-sm md:text-lg truncate">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>

        <SelectContent>
          {Data.CarMakes.map((maker, index) => (
            <SelectItem key={index} value={maker.name}>
              {maker.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      {/* Pricing */}
      <Select onValueChange={(value) => setPrice(value)}>
        <SelectTrigger className="outline-none border-none w-full shadow-none text-sm md:text-lg truncate">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>

        <SelectContent>
          {Data.Pricing.map((item, index) => (
            <SelectItem key={index} value={item.amount}>
              {item.amount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search Button */}
      <div
        onClick={handleSearch}
        className="bg-blue-600 rounded-full p-2 md:p-3 shadow-md hover:scale-110 transition-all duration-200 cursor-pointer"
      >
        <IoSearchOutline size={20} color="white" />
      </div>
    </div>
  );
}