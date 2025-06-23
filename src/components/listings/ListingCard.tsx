import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Listing } from "@/lib/types";
import { cn } from "@/lib/utils";

const formatPrice = (price: number) => {
    return `Rp ${new Intl.NumberFormat('id-ID').format(price)}`;
};

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listings/${listing.id}`} className="group block">
      <div className={cn(
          "bg-card rounded-xl overflow-hidden flex flex-col transition-all duration-300 shadow-md hover:shadow-xl",
      )}>
        <div className="relative">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            width={400}
            height={400}
            className="w-full aspect-square object-cover"
            data-ai-hint="product image"
          />
          {listing.isHighlighted && (
             <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-md z-10 flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-600"/> HIGHLIGHT
             </div>
          )}
          {listing.rating && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-md z-10 flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400"/>
              <span>{listing.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="p-3 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-sm text-foreground/90 leading-tight group-hover:text-primary transition-colors">{listing.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{listing.location}</p>
            <p className="font-bold text-base text-foreground mt-2">
              {formatPrice(listing.price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
