'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import ListingGrid from '@/components/listings/ListingGrid';
import { listings, categories } from '@/lib/data';
import FilterSortBar from '@/components/listings/FilterSortBar';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from 'next/image';
import SubCategoryNav from '@/components/listings/SubCategoryNav';

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category') || 'all';
  const subCategorySlug = searchParams.get('subCategory') || 'all';

  const currentCategory = categories.find(c => c.slug === categorySlug);
  const subCategories = currentCategory?.subCategories || [];

  const filteredListings = listings.filter(l => {
    const categoryMatch = categorySlug === 'all' || l.category.toLowerCase().replace(/ /g, '-') === categorySlug;
    
    // Check if listing has a subcategory before trying to match
    const subCategoryMatch = subCategorySlug === 'all' || (l.subCategory && l.subCategory.toLowerCase().replace(/ /g, '-') === subCategorySlug);
    
    return categoryMatch && subCategoryMatch;
  });

  const pageTitle = currentCategory ? currentCategory.name : 'All Listings';
  const activeSubCategory = subCategories.find(sc => sc.slug === subCategorySlug);
  const displayTitle = activeSubCategory && subCategorySlug !== 'all' 
    ? activeSubCategory.name 
    : pageTitle;

  return (
    <div className="flex flex-col md:flex-row md:gap-8">
      {subCategories.length > 0 && (
        <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold font-headline mb-4">{pageTitle}</h2>
            <SubCategoryNav
              subCategories={subCategories}
              currentCategorySlug={categorySlug}
              activeSubCategorySlug={subCategorySlug}
              mode="vertical"
            />
          </div>
        </aside>
      )}
      <main className="flex-1">
        <header className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h1 className="text-2xl font-bold font-headline capitalize">
              {displayTitle.replace(/-/g, ' ')}
            </h1>
            <p className="text-sm text-muted-foreground">{filteredListings.length} results found</p>
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
                  <FilterSortBar isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {subCategories.length > 0 && (
           <div className="md:hidden -mx-4">
             <SubCategoryNav
              subCategories={subCategories}
              currentCategorySlug={categorySlug}
              activeSubCategorySlug={subCategorySlug}
              mode="horizontal"
            />
           </div>
        )}

        {categorySlug !== 'all' && (
          <div className="my-4 rounded-lg overflow-hidden aspect-[3/1] relative hidden md:block">
            <Image src={`https://placehold.co/1000x300.png`} alt={`${pageTitle} banner`} layout="fill" objectFit='cover' className="bg-muted" data-ai-hint="marketplace banner"/>
          </div>
        )}
        
        <div className={subCategories.length > 0 ? "mt-6" : ""}>
            <ListingGrid listings={filteredListings} />
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">No results found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your filters or checking a different category.</p>
          </div>
        )}

      </main>
    </div>
  );
}
