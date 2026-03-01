import React from "react";
import { Separator } from "./ui/separator";
import { BsFuelPumpFill } from "react-icons/bs";
import { SlSpeedometer } from "react-icons/sl";
import { GiGearStickPattern } from "react-icons/gi";
import { IoMdOpen } from "react-icons/io";

export default function CarItem({ car }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer relative">

      {/* Badge */}
      <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
        New
      </span>

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={car?.image}
          alt={car?.name}
          className="w-full h-48 sm:h-56 md:h-60 object-cover hover:scale-105 transition-all duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 space-y-3">

        {/* Title */}
        <h2 className="font-semibold text-lg sm:text-xl text-gray-800">
          {car?.name}
        </h2>

        <Separator />

        {/* Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 text-center text-xs sm:text-sm text-gray-600 gap-4">

          <div className="flex flex-col items-center">
            <BsFuelPumpFill className="text-base sm:text-lg mb-1 text-blue-600" />
            <span>{car?.miles} Miles</span>
          </div>

          <div className="flex flex-col items-center">
            <SlSpeedometer className="text-base sm:text-lg mb-1 text-blue-600" />
            <span>{car?.fuel}</span>
          </div>

          <div className="flex flex-col items-center col-span-2 sm:col-span-1">
            <GiGearStickPattern className="text-base sm:text-lg mb-1 text-blue-600" />
            <span>{car?.gearType}</span>
          </div>

        </div>

        <Separator />

        {/* Price & View */}
        <div className="flex items-center justify-between">

          <h2 className="font-bold text-xl sm:text-2xl text-gray-900">
            ${car?.price}
          </h2>

          <div className="flex items-center gap-1 sm:gap-2 text-blue-600 font-medium text-xs sm:text-sm hover:underline">
            <IoMdOpen />
            View
          </div>

        </div>

      </div>
    </div>
  );
}