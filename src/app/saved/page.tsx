"use client";

import { listings as allListings } from "@/lib/data";
import ListingGrid from "@/components/listings/ListingGrid";
import { Heart } from "lucide-react";
import { useSavedListings } from "@/hooks/use-saved-listings";
import { Skeleton } from "@/components/ui/skeleton";

export default function SavedPage() {
  const { savedIds, isLoading } = useSavedListings();

  const savedListings = allListings
    .filter((listing) => savedIds.includes(listing.id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (isLoading) {
    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-6">Saved Items</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
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
        <ListingGrid listings={savedListings} />
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
