"use client"

import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import type { Listing } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useSavedListings } from "@/hooks/use-saved-listings";
import * as React from "react";

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
            "bg-card rounded-xl overflow-hidden flex flex-col transition-all duration-300 shadow-sm border border-transparent hover:shadow-lg hover:border-primary/50",
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
               <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-md z-10 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-600"/> HIGHLIGHT
               </div>
            )}
          </div>
          <div className="p-3 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-sm text-foreground/90 leading-tight group-hover:text-primary transition-colors truncate">{listing.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 truncate">{listing.location}</p>
              <p className="font-bold text-base text-foreground mt-2">
                {formatPrice(listing.price)}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <Button 
        size="icon" 
        variant="secondary" 
        className="absolute top-2 right-2 h-8 w-8 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/70 hover:bg-white disabled:opacity-50"
        onClick={handleSaveClick}
        aria-label={isCurrentlySaved ? "Unsave item" : "Save item"}
        disabled={isLoading}
      >
        <Heart className={cn("w-4 h-4 text-primary", isCurrentlySaved && "fill-primary")} />
      </Button>
    </div>
  );
}
