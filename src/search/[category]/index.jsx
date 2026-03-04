import Header from '@/components/Header'
import Search from '@/components/Search'
import { db } from '../../../configs';
import { CarImages, CarListing } from '../../../configs/schema';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { eq } from 'drizzle-orm';
import Service from '@/Shared/Service';
import CarItem from '@/components/CarItem';
import Footer from '@/components/Footer';
export default function SearchByCategory() {
    const{category}=useParams();
    useEffect(()=>{
        GetCarList();
    },[])
    const[carList,setCarList]=useState([]);
    const [loading, setLoading] = useState(true);
    const GetCarList=async()=>{
         setLoading(true);
        const result=await db.select().from(CarListing)
        .innerJoin(CarImages,eq(CarListing.id,CarImages.CarListingId))
        .where(eq(CarListing.category,category))
        console.log(result);
        const resp=Service.FormatResult(result);
        setCarList(resp);
         setLoading(false);
    }
    
  return (
    <div>
        <Header/>
        <div className='p-16 bg-black flex justify-center'>
            <Search/>
        </div>
        <div className='p-10'>
            <h2 className='font-bold text-4xl '>{category}</h2>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>

            {/* 🔄 Loading State → Show Skeletons */}
            {loading &&
                [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                    key={index}
                    className='h-[320px] rounded-xl bg-slate-200 animate-pulse'
                />
                ))}

            {/* 🚗 Show Cars */}
            {!loading && carList.length > 0 &&
                carList.map((item, index) => (
                <div key={index}>
                    <CarItem car={item} />
                </div>
                ))}

            {/* ❌ Empty State */}
            {!loading && carList.length === 0 && (
                <div className="col-span-full text-center py-20">
                <h3 className="text-2xl font-semibold text-gray-600">
                    🚗 No cars available in this category
                </h3>
                <p className="text-gray-400 mt-2">
                    Try exploring other categories or check back later.
                </p>
                </div>
            )}

            </div>
        </div>
        <Footer/>
    </div>
  )
}
