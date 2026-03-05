import React from 'react'
import Search from './Search'

export default function Hero() {
  return (
    <div>
        <div className="flex flex-col items-center md:p-10 py-12 md:py-20 gap-6 md:h-[650px] w-full bg-[#eef0fc]">
           <h2 className="text-sm md:text-lg text-gray-600 tracking-wide text-center">
  Find cars for sale and rent near you
</h2>

<h1 className="text-4xl md:text-6xl font-bold text-center leading-tight">
  Find Your Dream Car
</h1>
            <Search/>
            <img src='/tesla.png' className="mt-25.5 md:mt-11"/>
        </div>

    </div>
  )
}

