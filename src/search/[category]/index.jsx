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

  const { category } = useParams();
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCarList();
  }, [category]);

  const GetCarList = async () => {
    setLoading(true);

    const result = await db.select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.CarListingId))
      .where(eq(CarListing.category, category));

    const resp = Service.FormatResult(result);
    setCarList(resp);

    setLoading(false);
  };

  return (
    <div>

      <Header />

      {/* Search Section */}
      <div className="px-4 md:px-16 py-10 bg-black flex justify-center">
        <Search />
      </div>

      {/* Listings */}
      <div className="px-4 md:px-10 py-8">

        <h2 className="font-bold text-2xl md:text-4xl capitalize">
          {category}
        </h2>

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
          mt-7
        ">

          {/* Loading Skeleton */}
          {loading &&
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[320px] rounded-xl bg-slate-200 animate-pulse"
              />
            ))}

          {/* Cars */}
          {!loading && carList.length > 0 &&
            carList.map((item, index) => (
              <CarItem key={index} car={item} />
            ))}

          {/* Empty State */}
          {!loading && carList.length === 0 && (
            <div className="col-span-full text-center py-20">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-600">
                🚗 No cars available in this category
              </h3>

              <p className="text-gray-400 mt-2">
                Try exploring other categories or check back later.
              </p>
            </div>
          )}

        </div>

      </div>

      <Footer />

    </div>
  );
}