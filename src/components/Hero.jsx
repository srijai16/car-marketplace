import React from 'react'
import Search from './Search'

export default function Hero() {
  return (
    <div>
        <div className='flex flex-col items-center p-10 py-20 gap-6 h-[650px] w-full bg-[#eef0fc]'>
            <h2 className='text-lg'>Find cars for sale and rent near you</h2>
            <h2 className='text-[50px] font-bold'>Find your Dream Car</h2>
            <Search/>
            <img src='/tesla.png' className='mt-10'/>
        </div>

    </div>
  )
}

