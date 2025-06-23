import FilterSortBar from '@/components/listings/FilterSortBar';
import ListingGrid from '@/components/listings/ListingGrid';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <header className="text-center md:text-left">
        <h1 className="text-4xl lg:text-5xl font-headline font-bold text-foreground">
          Find Your Next Treasure
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse thousands of items from your local community.
        </p>
      </header>
      <FilterSortBar />
      <ListingGrid />
    </div>
  );
}
