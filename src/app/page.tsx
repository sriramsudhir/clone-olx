"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RefreshCw, MapPin, ChevronDown, Bell, Sparkles } from 'lucide-react';
import ListingGrid from '@/components/listings/ListingGrid';
import { listings, users, categories as categoryData, banners } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import CategoryGrid from '@/components/CategoryGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnhancedSearch from '@/components/EnhancedSearch';
import QuickActions from '@/components/QuickActions';
import TrendingSection from '@/components/TrendingSection';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import OfflineIndicator from '@/components/OfflineIndicator';
import VoiceSearch from '@/components/VoiceSearch';
import { Badge } from '@/components/ui/badge';
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
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const handleVoiceSearch = (transcript: string) => {
    // Handle voice search result
    console.log('Voice search:', transcript);
  };

  return (
    <div className="space-y-4 md:space-y-8 pb-20 md:pb-6">
      <OfflineIndicator />
      
      {/* Enhanced Mobile Header */}
      <header className="space-y-3 md:space-y-4 md:hidden px-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <Avatar className="ring-2 ring-primary/20 h-10 w-10 md:h-12 md:w-12">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 md:gap-2">
                <p className="text-sm md:text-base font-semibold truncate">Hello, {currentUser.name.split(' ')[0]}!</p>
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 flex-shrink-0" />
              </div>
              <Link href="/location" className="mt-1">
                <div className="flex items-center gap-1 text-xs md:text-sm text-foreground cursor-pointer hover:text-primary transition-colors">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
                  <span className="font-medium truncate">Banten, Tangerang</span>
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <Button variant="ghost" size="icon" className="rounded-full relative h-8 w-8 md:h-10 md:w-10">
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 md:h-10 md:w-10">
              <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
        
        {/* Enhanced Search with Voice */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <EnhancedSearch />
          </div>
          <VoiceSearch onResult={handleVoiceSearch} />
        </div>
      </header>
      
      {/* Enhanced Banner Carousel */}
      <section className="px-1 md:px-0">
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
                <div className="relative w-full aspect-[2.5/1] md:aspect-[3/1] lg:aspect-[4/1] rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
                  <Image 
                    src={bannerSrc} 
                    alt={`Promotional Banner ${index + 1}`} 
                    fill
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white">
                    <h3 className="text-sm md:text-lg lg:text-2xl font-bold mb-1">Special Offers</h3>
                    <p className="text-xs md:text-sm lg:text-base opacity-90">Discover amazing deals today</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex left-2" />
          <CarouselNext className="hidden md:flex right-2" />
        </Carousel>
      </section>

      {/* Quick Actions */}
      <div className="px-1 md:px-0">
        <QuickActions />
      </div>

      {/* Categories Section */}
      <Card className="overflow-hidden mx-1 md:mx-0">
        <CardHeader className="pb-3 md:pb-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg md:text-xl font-bold font-headline">Explore Categories</CardTitle>
            <Link href="/listings?category=all" className="text-sm font-medium text-primary hover:underline">
              See All
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CategoryGrid categories={categoryData} />
        </CardContent>
      </Card>

      {/* Trending Section */}
      <div className="px-1 md:px-0">
        <TrendingSection />
      </div>

      {/* Latest Recommendations */}
      <section className="space-y-3 md:space-y-4 px-1 md:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-bold font-headline">Latest Recommendations</h2>
          <Link href="/listings" className="text-sm font-medium text-primary hover:underline">
            See All
          </Link>
        </div>
        <ListingGrid listings={listings.slice(0, 8)} />
      </section>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}