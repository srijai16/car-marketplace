import React from "react";
import { Separator } from "./ui/separator";
import { BsFuelPumpFill } from "react-icons/bs";
import { SlSpeedometer } from "react-icons/sl";
import { GiGearStickPattern } from "react-icons/gi";
import { IoMdOpen } from "react-icons/io";

export default function CarItem({ car }) {
  return (
    <div className="flex flex-col h-full relative">

      <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
        New
      </span>

      <div className="overflow-hidden bg-gray-200">
        <img
          src={car?.images?.[0]?.imageUrl || "https://via.placeholder.com/400x300"}
          alt={car?.listingTitle}
          className="w-full h-60 object-cover hover:scale-105 transition-all duration-300"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">

        <h2 className="font-semibold text-lg text-gray-800 mb-3">
          {car?.listingTitle}
        </h2>

        <Separator />

        <div className="grid grid-cols-3 text-center text-sm text-gray-600 gap-4 my-3">
          <div className="flex flex-col items-center">
            <BsFuelPumpFill className="text-lg mb-1 text-blue-600" />
            <span>{car?.mileage} Miles</span>
          </div>

          <div className="flex flex-col items-center">
            <SlSpeedometer className="text-lg mb-1 text-blue-600" />
            <span>{car?.fuelType}</span>
          </div>

          <div className="flex flex-col items-center">
            <GiGearStickPattern className="text-lg mb-1 text-blue-600" />
            <span>{car?.transmission}</span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between mt-auto pt-3">
          <h2 className="font-bold text-xl text-gray-900">
            ${car?.sellingPrice}
          </h2>

          <div className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:underline">
            <IoMdOpen />
            View
          </div>
        </div>

      </div>
    </div>
  );
}