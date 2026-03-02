import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { db } from '../../../configs'
import { CarImages, CarListing } from '../../../configs/schema'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { eq } from 'drizzle-orm'
import { desc } from 'drizzle-orm'
import Service from '@/Shared/Service'
import CarItem from '@/components/CarItem'
import { FaTrashAlt } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { supabase } from "../../../configs/supabaseClient";
export default function MyListing() {
    const { user } = useContext(AuthContext);
    console.log(user?.displayName);
    const [carList,setCarList]=useState([]);
    const [deleteLoading, setdeleteLoading] = useState(false);

    useEffect(()=>{
        user&&GetUserCarListing();
    },[user])

    const GetUserCarListing=async()=>{
        const result=await db.select().from(CarListing)
        .leftJoin(CarImages,eq(CarListing.id,CarImages.CarListingId))
        .where(eq(CarListing.createdBy,user?.email))
        .orderBy(desc(CarListing.id))
        const resp=Service.FormatResult(result)
        console.log(resp);
        console.log(result);
        setCarList(resp);
    }

    const handleDelete = async (id) => {
      try {
        setdeleteLoading(true);

        // 1️⃣ Get all images of listing
        const images = await db
          .select()
          .from(CarImages)
          .where(eq(CarImages.CarListingId, id));

        // 2️⃣ Delete images from storage
        for (const img of images) {
          const filePath = img.imageUrl.split('/car-marketplace/')[1];

          await supabase.storage
            .from('car-marketplace')
            .remove([filePath]);
        }

        // 3️⃣ Delete images from DB
        await db.delete(CarImages)
          .where(eq(CarImages.CarListingId, id));

        // 4️⃣ Delete listing
        await db.delete(CarListing)
          .where(eq(CarListing.id, id));

        // 5️⃣ Refresh page or remove from state
        setCarList(prev => prev.filter(car => car.id !== id));

      } catch (error) {
        console.error("Delete failed:", error);
      }

      setdeleteLoading(false);
    };
  return (
  <div className="mt-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="font-bold text-4xl">My Listing</h2>

      <Link to="/add-listing">
        <Button>+ Add New Listing</Button>
      </Link>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-stretch">
      {carList.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
        >
          <CarItem car={item} />

          <div className="p-4 border-t flex gap-3 w-full">
          <Link to={'/add-listing?mode=edit&id='+item?.id} className='w-full'>
          <Button className="flex-1" variant="outline">
            Edit
          </Button>
          </Link>

         <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="flex-1"
                variant="destructive"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your car listing and all its images.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleteLoading}>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => handleDelete(item.id)}
                  disabled={deleteLoading}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {deleteLoading ? "Deleting..." : "Yes, Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
