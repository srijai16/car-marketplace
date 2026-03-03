import React from "react";
import { Card, CardContent } from "@/components/ui/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Calendar,
  Gauge,
  Fuel,
  Settings,
  GitBranch,
  Car,
} from "lucide-react";

function DetailHeader({ carDetail }) {
  if (!carDetail) return null;

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 space-y-4">

        {/* Title */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {carDetail.listingTitle}
          </h2>

          {carDetail.tagline && (
            <p className="text-muted-foreground text-sm mt-1">
              {carDetail.tagline}
            </p>
          )}
        </div>

     

        {/* Badges */}
        <div className="flex flex-wrap gap-2">

          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 flex items-center gap-1">
            <Calendar size={14} />
            {carDetail.year}
          </Badge>

          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 flex items-center gap-1">
            <Gauge size={14} />
            {carDetail.mileage} miles
          </Badge>

          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 flex items-center gap-1">
            <Settings size={14} />
            {carDetail.transmission}
          </Badge>

          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 flex items-center gap-1">
            <Fuel size={14} />
            {carDetail.fuelType}
          </Badge>

          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 flex items-center gap-1">
            <GitBranch size={14} />
            {carDetail.driveType}
          </Badge>

          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 flex items-center gap-1">
            <Car size={14} />
            {carDetail.condition}
          </Badge>

        </div>
      </CardContent>
    </Card>
  );
}

export default DetailHeader;