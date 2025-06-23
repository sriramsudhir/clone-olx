import type { Listing } from "@/lib/types";
import ListingCard from "./ListingCard";

export default function ListingGrid({ listings = [] }: { listings?: Listing[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
