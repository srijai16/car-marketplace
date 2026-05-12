import FakeData from '@/Shared/FakeData'
import React, { useEffect, useState } from 'react'
import CarItem from './CarItem'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CarImages, CarListing } from '../../configs/schema'
import { db } from '../../configs'
import { eq } from 'drizzle-orm'
import { desc } from 'drizzle-orm'
import Service from '@/Shared/Service'
import Autoplay from "embla-carousel-autoplay"
function MostSearchedCar() {
  const [carList,setCarList]=useState([]);

  useEffect(()=>{
    GetPopularCarList();
  },[])

  const GetPopularCarList=async()=>{
    const result=await db.select().from(CarListing)
      .leftJoin(CarImages,eq(CarListing.id,CarImages.CarListingId))
      .orderBy(desc(CarListing.id))
      .limit(10)

    const resp=Service.FormatResult(result)
    setCarList(resp);
  }

  return (
    <div className='px-8 md:px-24'>
      <h2 className="font-bold text-3xl md:text-3xl text-center mt-12 md:mt-16 mb-8 tracking-tight">
  Most Searched Cars
</h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >

        <CarouselContent>
          {carList.map((car, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <CarItem car={car}/>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />

      </Carousel>
    </div>
  )
}

export default MostSearchedCar