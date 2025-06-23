
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import ListingGrid from '@/components/listings/ListingGrid';
import { listings, categories } from '@/lib/data';
import FilterSortBar from '@/components/listings/FilterSortBar';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from 'next/image';
import SubCategoryNav from '@/components/listings/SubCategoryNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ListingsPageProps = {
  searchParams: {
    category?: string;
    subCategory?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    condition?: string | string[];
    location?: string;
  };
};

export default function ListingsPage({ searchParams }: ListingsPageProps) {
  // Filter params from props
  const categorySlug = searchParams.category || 'all';
  const subCategorySlug = searchParams.subCategory || 'all';
  const sort = searchParams.sort || 'newest';
  const minPrice = searchParams.minPrice;
  const maxPrice = searchParams.maxPrice;
  const conditions = Array.isArray(searchParams.condition)
    ? searchParams.condition
    : (searchParams.condition ? [searchParams.condition] : []);
  const locationQuery = searchParams.location?.toLowerCase();

  let results = [...listings];

  // Category and SubCategory filtering
  results = results.filter(l => {
    const categoryMatch = categorySlug === 'all' || l.category.toLowerCase().replace(/ /g, '-') === categorySlug;
    const subCategoryMatch = subCategorySlug === 'all' || (l.subCategory && l.subCategory.toLowerCase().replace(/ /g, '-') === subCategorySlug);
    return categoryMatch && subCategoryMatch;
  });

  // Price filtering
  if (minPrice) {
    results = results.filter(l => l.price >= Number(minPrice));
  }
  if (maxPrice) {
    results = results.filter(l => l.price <= Number(maxPrice));
  }
  
  // Condition filtering
  if (conditions.length > 0) {
      results = results.filter(l => conditions.includes(l.condition));
  }

  // Location filtering
  if (locationQuery) {
      results = results.filter(l => l.location.toLowerCase().includes(locationQuery));
  }

  // Sorting
  switch (sort) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }
  
  const filteredListings = results;

  const currentCategory = categories.find(c => c.slug === categorySlug);
  const subCategories = currentCategory?.subCategories || [];

  const pageTitle = currentCategory ? currentCategory.name : 'All Listings';
  const activeSubCategory = subCategories.find(sc => sc.slug === subCategorySlug);
  const displayTitle = activeSubCategory && subCategorySlug !== 'all' 
    ? activeSubCategory.name 
    : pageTitle;

  return (
    <div className="space-y-6">
       <header className="flex items-center justify-between">
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

      {subCategories.length > 0 && categorySlug !== 'all' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-headline">Sub-categories in {pageTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <SubCategoryNav
              subCategories={subCategories}
              currentCategorySlug={categorySlug}
              activeSubCategorySlug={subCategorySlug}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="hidden md:block md:col-span-1">
            <div className="sticky top-24">
                <h2 className="text-xl font-bold font-headline mb-4">Filters</h2>
                <FilterSortBar />
            </div>
        </aside>

        <main className="md:col-span-3 space-y-6">
          {categorySlug !== 'all' && (
            <div className="rounded-lg overflow-hidden aspect-[3/1] relative">
              <Image src={`https://placehold.co/1000x300.png`} alt={`${pageTitle} banner`} layout="fill" objectFit='cover' className="bg-muted" data-ai-hint="marketplace banner"/>
            </div>
          )}
          
          <ListingGrid listings={filteredListings} />

          {filteredListings.length === 0 && (
            <div className="text-center py-20 bg-card rounded-lg">
              <h2 className="text-2xl font-semibold">No results found</h2>
              <p className="mt-2 text-muted-foreground">Try adjusting your filters or checking a different category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
