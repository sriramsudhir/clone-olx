"use client";

import { useState, useEffect } from "react";
import { listings as allListings } from "@/lib/data";
import type { Listing } from "@/lib/types";
import ListingCard from "@/components/listings/ListingCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const ITEMS_PER_PAGE = 8;

export default function SavedPage() {
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedIdsRaw = localStorage.getItem("savedListings");
    if (savedIdsRaw) {
      const savedIds = JSON.parse(savedIdsRaw);
      const filteredListings = allListings
        .filter((listing) => savedIds.includes(listing.id))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setSavedListings(filteredListings);
    }
    setIsLoading(false);
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };
  
  if (isLoading) {
    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-6">Saved Items</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-card p-4 rounded-lg animate-pulse">
                        <div className="bg-muted h-48 rounded-md"></div>
                        <div className="mt-4 h-6 bg-muted rounded w-3/4"></div>
                        <div className="mt-2 h-4 bg-muted rounded w-1/2"></div>
                        <div className="mt-2 h-8 bg-muted rounded w-1/4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Saved Items</h1>
      {savedListings.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedListings.slice(0, visibleCount).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          {visibleCount < savedListings.length && (
            <div className="text-center mt-8">
              <Button onClick={loadMore}>Load More</Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-card rounded-lg">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No saved items yet</h2>
          <p className="mt-2 text-muted-foreground">
            Click the heart icon on any listing to save it for later.
          </p>
        </div>
      )}
    </div>
  );
}
