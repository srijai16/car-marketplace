import Service from '@/Shared/Service';
import { db } from '../../configs';
import { CarImages, CarListing } from '../../configs/schema';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '@/components/Header'
import Search from '@/components/Search'
import CarItem from '@/components/CarItem';
import { useParams } from 'react-router-dom';
import { and, eq, lte } from "drizzle-orm";
import Footer from '@/components/Footer';
function SearchByOptions() {
    const [searchParm]=useSearchParams();
    const cars=searchParm.get('cars');
    const make=searchParm.get('make');
    const price=searchParm.get('price');
    const[carList,setCarList]=useState([]);
    const [loading, setLoading] = useState(true);
    const { category } = useParams();
    useEffect(() => {
    

    GetCarList();
    }, [cars, make, price]);

    const GetCarList = async () => {
        setLoading(true);

        const conditions = [];

        if (cars) conditions.push(eq(CarListing.condition, cars));
        if (make) conditions.push(eq(CarListing.make, make));
        if (price) conditions.push(lte(CarListing.sellingPrice, Number(price)));

        if (conditions.length === 0) {
            setLoading(false);
            return;
        }

        const result = await db
            .select()
            .from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.CarListingId))
            .where(and(...conditions));

        const resp = Service.FormatResult(result);

        setCarList(resp);
        console.log(resp);
        setLoading(false);
        };
  return (
    <div>
            <Header/>
            <div className='p-16 bg-black flex justify-center'>
                <Search/>
            </div>
            <div className='p-10'>
                <h2 className='font-bold text-4xl '>Search Result</h2>
    
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

export default SearchByOptions