"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import type { Listing } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";


export default function ListingCard({ listing }: { listing: Listing }) {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("savedListings");
    if (saved) {
      const savedIds = JSON.parse(saved);
      setIsSaved(savedIds.includes(listing.id));
    }
  }, [listing.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    const saved = localStorage.getItem("savedListings");
    let savedIds = saved ? JSON.parse(saved) : [];
    if (savedIds.includes(listing.id)) {
      savedIds = savedIds.filter((id: string) => id !== listing.id);
      setIsSaved(false);
      toast({ title: "Removed from saved items." });
    } else {
      savedIds.push(listing.id);
      setIsSaved(true);
      toast({ title: "Item saved!" });
    }
    localStorage.setItem("savedListings", JSON.stringify(savedIds));
  };

  return (
    <Link href={`/listings/${listing.id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
        <div className="relative">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="product image"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 rounded-full h-8 w-8 bg-card/70 hover:bg-card"
            onClick={toggleSave}
          >
            <Heart className={cn("h-4 w-4", isSaved ? "fill-red-500 text-red-500" : "text-foreground")} />
          </Button>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-headline font-semibold text-lg truncate">{listing.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{listing.location}</span>
            </div>
          </div>
          <p className="text-xl font-bold text-primary mt-2">
            ${listing.price.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
