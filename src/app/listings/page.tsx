'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import ListingGrid from '@/components/listings/ListingGrid';

export default function ListingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <div className="p-4 md:px-6 space-y-4">
      <header className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold font-headline capitalize">
          {category ? `${category.replace(/-/g, ' ')}` : 'All Listings'}
        </h1>
        <Button variant="outline" className="gap-2 rounded-lg">
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </Button>
      </header>
      <ListingGrid />
    </div>
  );
}
