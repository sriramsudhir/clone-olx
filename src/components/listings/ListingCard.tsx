"use client"

import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import type { Listing } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useSavedListings } from "@/hooks/use-saved-listings";
import * as React from "react";

const formatPrice = (price: number, priceTo?: number) => {
    const formatNumber = (num: number) => {
        return '₹' + new Intl.NumberFormat('en-IN').format(num);
    }

    if (priceTo && priceTo > price) {
        return `${formatNumber(price)} - ${formatNumber(priceTo)}`;
    }
    return formatNumber(price);
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const { isSaved, toggleSave, isLoading } = useSavedListings();
  const isCurrentlySaved = isSaved(listing.id);

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigating to the listing page
    e.stopPropagation(); // Stop event bubbling
    toggleSave(listing.id, listing.title);
  };

  return (
    <div className="group relative">
      <Link href={`/listings/${listing.id}`} className="block">
        <div className={cn(
            "bg-card rounded-lg md:rounded-xl overflow-hidden flex flex-col transition-all duration-300 shadow-sm border border-transparent hover:shadow-lg hover:border-primary/50",
        )}>
          <div className="relative">
            <Image
              src={listing.images[0]}
              alt={listing.title}
              width={400}
              height={400}
              className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="product image"
            />
            {listing.isHighlighted && (
               <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-yellow-400 text-black text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-md z-10 flex items-center gap-1">
                  <Star className="w-2 h-2 md:w-3 md:h-3 fill-yellow-500 text-yellow-600"/> 
                  <span className="hidden sm:inline">HIGHLIGHT</span>
               </div>
            )}
          </div>
          <div className="p-2 md:p-3 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-xs md:text-sm text-foreground/90 leading-tight group-hover:text-primary transition-colors line-clamp-2">{listing.title}</h3>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1 truncate">{listing.location}</p>
              <p className="font-bold text-sm md:text-base text-foreground mt-1 md:mt-2">
                {formatPrice(listing.price, listing.priceTo)}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <Button 
        size="icon" 
        variant="secondary" 
        className="absolute top-1 right-1 md:top-2 md:right-2 h-6 w-6 md:h-8 md:w-8 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/70 hover:bg-white disabled:opacity-50"
        onClick={handleSaveClick}
        aria-label={isCurrentlySaved ? "Unsave item" : "Save item"}
        disabled={isLoading}
      >
        <Heart className={cn("w-3 h-3 md:w-4 md:h-4 text-primary", isCurrentlySaved && "fill-primary")} />
      </Button>
    </div>
  );
}