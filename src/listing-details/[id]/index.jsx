import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import DetailHeader from "../components/DetailHeader";
import { useParams } from "react-router-dom";
import { CarImages, CarListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import Service from "@/Shared/Service";
import { db } from "../../../configs";
import { Card, CardContent } from "@/components/ui/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import features from "../../Shared/features.json";
import CarItem from "@/components/CarItem";
import FinancingCalculator from "../components/FinancingCalculator";

import * as FaIcons from "react-icons/fa";
import carDetails from "../../Shared/carDetails.json";
import Footer from "@/components/Footer";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ListingDetail() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();
  const [relatedCars, setRelatedCars] = useState([]);
  

  useEffect(() => {
    if (id) {
      GetCarDetail();
      window.scrollTo(0, 0);
    }
  }, [id]);

  const GetCarDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.CarListingId))
      .where(eq(CarListing.id, id));

    const resp = Service.FormatResult(result);
    setCarDetail(resp[0]);
  };

  useEffect(() => {
    if (carDetail) {
      GetRelatedCars();
    }
  }, [carDetail]);

  const GetRelatedCars = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.CarListingId));

    const resp = Service.FormatResult(result);
    const filtered = resp.filter((car) => car.id !== carDetail.id);
    setRelatedCars(filtered.slice(0, 4));
  };

  if (!carDetail) return null;

  const onMessageOwnerButtonClick = async () => {
    try {
      if (!user) return;

      const currentUserId = user?.email.split("@")[0].toLowerCase(); // better than email split
      const ownerUserId = carDetail.createdBy.split("@")[0];

      // 1️⃣ Create Current User (if not exists)
      await Service.CreateSendBirdUser(
        currentUserId,
        user.displayName || user.email,
        user.photoURL
      );

      // 2️⃣ Create Owner User (if not exists)
      await Service.CreateSendBirdUser(
        ownerUserId,
        ownerUserId,
        ""
      );

      // 3️⃣ Create / Get 1-to-1 Channel
     const channel = await Service.CreateSendBirdChannel(
        [currentUserId, ownerUserId],
        carDetail.listingTitle
      );

      console.log("Channel created:", channel);
      console.log(currentUserId);
console.log(ownerUserId);

      // 4️⃣ Navigate to Chat Page
      navigate("/profile?tab=inbox");

    } catch (error) {
      console.error("Message owner failed:", error);
    }
  };
  return (
    <div>
      <Header />

      <div className="px-4 sm:px-6 lg:px-20 py-6 space-y-6">

        <DetailHeader carDetail={carDetail} />

        {/* Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 flex flex-col">

            {/* Car Images */}
            <div className="relative overflow-hidden rounded-2xl mb-6">
              <Carousel>
                <CarouselContent>
                  {carDetail?.images?.map((img) => (
                    <CarouselItem key={img.id}>
                      <img
                        src={img.imageUrl}
                        alt={carDetail?.listingTitle}
                        className="w-full h-[250px] sm:h-[350px] lg:h-[450px] object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white" />
              </Carousel>
            </div>

            {/* Description */}
            <Card className="mb-6">
              <CardContent className="p-6 space-y-3">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Description
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {carDetail.listingDescription}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  Features
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {features.features.map((item) => {
                    if (carDetail.features?.[item.name]) {
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="text-sky-600">✔</span>
                          {item.label}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Related Listings */}
            <Card className="mb-2 mt-2">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Related Listings
                </h2>

                <div className="relative">
                  <Carousel opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                      {relatedCars?.map((car) => (
                        <CarouselItem
                          key={car.id}
                          className="basis-full sm:basis-1/2 lg:basis-1/3"
                        >
                          <CarItem car={car} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 text-white z-10" />
                    <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 text-white z-10" />
                  </Carousel>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col">

            {/* Price Card */}
            <Card className="mb-6">
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground text-sm">Our Price</p>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  ${carDetail.sellingPrice}
                </h2>
                <Button className="w-full bg-blue-600 text-sm sm:text-base" onClick={onMessageOwnerButtonClick}>
                  Make An Offer Price
                </Button>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card className="mb-6">
              <CardContent className="p-6 space-y-4">
                <Spec label="Body" name="category" value={carDetail.category} />
                <Spec label="Mileage" name="mileage" value={`${carDetail.mileage} miles`} />
                <Spec label="Fuel Type" name="fuelType" value={carDetail.fuelType} />
                <Spec label="Year" name="year" value={carDetail.year} />
                <Spec label="Transmission" name="transmission" value={carDetail.transmission} />
                <Spec label="Drive Type" name="driveType" value={carDetail.driveType} />
                <Spec label="Condition" name="condition" value={carDetail.condition} />
                <Spec label="Engine Size" name="engineSize" value={carDetail.engineSize} />
                <Spec label="Door" name="door" value={carDetail.door} />
                <Spec label="Cylinder" name="cylinder" value={carDetail.cylinder} />
                <Spec label="Color" name="color" value={carDetail.color} />
                <Spec label="VIN" name="vin" value={carDetail.vin} />
              </CardContent>
            </Card>

            {/* Financing */}
            <FinancingCalculator defaultPrice={carDetail.sellingPrice} />

          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

/* Spec Component */
function Spec({ label, value, name }) {
  if (!value) return null;

  const field = carDetails.carDetails.find(
    (item) => item.name === name
  );

  const Icon = field ? FaIcons[field.icon] : null;

  return (
    <>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          {Icon && <Icon size={14} className="text-blue-600" />}
          {label}
        </div>
        <span className="font-medium text-right">{value}</span>
      </div>
      <Separator />
    </>
  );
}

export default ListingDetail;