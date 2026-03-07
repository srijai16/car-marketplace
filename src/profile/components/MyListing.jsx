import React, { useEffect, useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import { AuthContext } from "../../context/AuthContext";
import { eq, desc } from "drizzle-orm";
import Service from "@/Shared/Service";
import CarItem from "@/components/CarItem";

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
} from "@/components/ui/alert-dialog";

import { supabase } from "../../../configs/supabaseClient";

export default function MyListing() {

  const { user } = useContext(AuthContext);
  const [carList, setCarList] = useState([]);
  const [deleteLoading, setdeleteLoading] = useState(false);

  useEffect(() => {
    user && GetUserCarListing();
  }, [user]);

  const GetUserCarListing = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.CarListingId))
      .where(eq(CarListing.createdBy, user?.email))
      .orderBy(desc(CarListing.id));

    const resp = Service.FormatResult(result);
    setCarList(resp);
  };

  const handleDelete = async (id) => {
    try {
      setdeleteLoading(true);

      const images = await db
        .select()
        .from(CarImages)
        .where(eq(CarImages.CarListingId, id));

      for (const img of images) {
        const filePath = img.imageUrl.split("/car-marketplace/")[1];

        await supabase.storage
          .from("car-marketplace")
          .remove([filePath]);
      }

      await db.delete(CarImages)
        .where(eq(CarImages.CarListingId, id));

      await db.delete(CarListing)
        .where(eq(CarListing.id, id));

      setCarList(prev => prev.filter(car => car.id !== id));

    } catch (error) {
      console.error("Delete failed:", error);
    }

    setdeleteLoading(false);
  };

  return (
    <div className="mt-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl md:text-4xl">
          My Listing
        </h2>

        <Link to="/add-listing">
          <Button size="sm" className="md:size-default">
            + Add New Listing
          </Button>
        </Link>
      </div>


      {/* Listings */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
        items-stretch
      ">

        {carList.map((item, index) => (

          <div
            key={index}
            className="
            bg-white
            rounded-2xl
            shadow-md
            hover:shadow-xl
            transition-all
            duration-300
            overflow-hidden
            flex
            flex-col
            h-full
            "
          >

            <CarItem car={item} />

            {/* Buttons */}
            <div className="p-4 border-t grid grid-cols-2 gap-3">

            <Link
              to={"/add-listing?mode=edit&id=" + item?.id}
              className="w-full"
            >
              <Button className="w-full" variant="outline">
                Edit
              </Button>
            </Link>

            <AlertDialog>

              <AlertDialogTrigger asChild>
                <Button
                  className="w-full"
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