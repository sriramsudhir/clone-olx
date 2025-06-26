
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Search, MapPin, ChevronDown } from 'lucide-react';
import ListingGrid from '@/components/listings/ListingGrid';
import { listings, users, categories as categoryData, banners } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import CategoryGrid from '@/components/CategoryGrid';
import { Card } from '@/components/ui/card';
import GlobalSearch from '@/components/GlobalSearch';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import * as React from 'react';

export default function HomePage() {
  const currentUser = users[0];
   const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <div className="space-y-8">
      <header className="space-y-4 md:hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person face" />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{currentUser.name}</p>
              <Link href="/location" className="mt-1">
                <div className="flex items-center gap-1 text-sm text-foreground cursor-pointer hover:text-primary">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">Banten, Tangerang Kota</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <RefreshCw className="w-6 h-6" />
          </Button>
        </div>
        <GlobalSearch />
      </header>
      
      <section>
        <Carousel 
          className="w-full"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {banners.map((bannerSrc, index) => (
              <CarouselItem key={index}>
                <div className="w-full aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1] relative rounded-2xl overflow-hidden shadow-sm">
                  <Image src={bannerSrc} alt={`Ad Banner ${index + 1}`} layout="fill" objectFit='cover' className="bg-muted" data-ai-hint="advertisement banner" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      <section>
        <Card className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-headline">Explore Categories</h2>
            <Link href="/listings?category=all" className="text-sm font-medium text-primary hover:underline">
              See All
            </Link>
          </div>
          <CategoryGrid categories={categoryData} />
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold font-headline">Latest Recommendations</h2>
            <Link href="/listings" className="text-sm font-medium text-primary hover:underline">
                See All
            </Link>
        </div>
        <ListingGrid listings={listings.slice(0, 10)} />
      </section>
    </div>
  );
}
