'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import ListingGrid from '@/components/listings/ListingGrid';
import { listings } from '@/lib/data';
import FilterSortBar from '@/components/listings/FilterSortBar';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function ListingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const filteredListings = (category && category !== 'all')
    ? listings.filter(l => l.category.toLowerCase().replace(/ /g, '-') === category)
    : listings;

  return (
    <div className="flex flex-col md:flex-row md:gap-8">
      <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5">
        <div className="sticky top-24">
          <h2 className="text-2xl font-bold font-headline mb-6">Filters</h2>
          <FilterSortBar />
        </div>
      </aside>
      <main className="flex-1">
        <header className="flex items-center justify-between mb-4 bg-card p-4 rounded-lg md:bg-transparent md:p-0 md:rounded-none">
          <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2 rounded-full md:hidden">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-bold font-headline capitalize">
              {category ? `${category.replace(/-/g, ' ')}` : 'All Listings'}
            </h1>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-lg">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <FilterSortBar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <ListingGrid listings={filteredListings} />
      </main>
    </div>
  );
}
