import type { Listing } from "@/lib/types";
import ListingCard from "./ListingCard";

export default function ListingGrid({ listings = [] }: { listings?: Listing[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}