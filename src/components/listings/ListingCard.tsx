"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Listing } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const formatPrice = (price: number) => {
    return `Rp ${new Intl.NumberFormat('de-DE').format(price)}`;
};

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listings/${listing.id}`} className="group block h-full">
      <Card className={cn(
          "overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl shadow-md rounded-xl relative",
          listing.isHighlighted && "shadow-orange-400/50 shadow-lg ring-2 ring-orange-400"
      )}>
        {listing.isHighlighted && (
             <div className="absolute top-2 left-0 bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-r-lg z-10">
                Highlighted
             </div>
        )}
        <div className="relative">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            width={400}
            height={300}
            className="w-full aspect-square sm:aspect-[4/3] object-cover"
            data-ai-hint="car"
          />
        </div>
        <CardContent className="p-3 flex-grow flex flex-col justify-between bg-card">
          <div>
            <h3 className="font-semibold text-md text-foreground/90 truncate">{listing.title}</h3>
            <p className="font-bold text-lg text-foreground mt-1">
              {formatPrice(listing.price)}
            </p>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{listing.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
