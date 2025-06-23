import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, MapPin, Car, Building2, Bike, Briefcase, Monitor, Dumbbell, Sofa, Shirt } from 'lucide-react';
import ListingCard from '@/components/listings/ListingCard';
import { listings } from '@/lib/data';
import type { LucideIcon } from 'lucide-react';

const categories: { name: string; icon: LucideIcon }[] = [
  { name: 'Iklan Terdekat', icon: MapPin },
  { name: 'Mobil', icon: Car },
  { name: 'Properti', icon: Building2 },
  { name: 'Motor', icon: Bike },
  { name: 'Jasa & Loker', icon: Briefcase },
  { name: 'Gadget', icon: Monitor },
  { name: 'Olahraga', icon: Dumbbell },
  { name: 'Rumah Tangga', icon: Sofa },
  { name: 'Pribadi', icon: Shirt },
];

function CategoryButton({ name, icon: Icon }: { name: string; icon: LucideIcon }) {
  return (
    <Link href={`/listings?category=${name.toLowerCase().replace(' ', '-')}`} className="flex flex-col items-center justify-center gap-2 p-3 bg-card rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent">
        <Icon className="w-6 h-6 text-accent-foreground" />
      </div>
      <span className="text-xs font-medium text-muted-foreground">{name}</span>
    </Link>
  );
}

export default function HomePage() {
  const recommendedListings = listings.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="bg-gradient-to-b from-primary/80 to-primary/60 text-primary-foreground p-4 md:p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold font-headline">Pencarian</h1>
            <div className="flex items-center gap-1 text-sm opacity-90">
              <MapPin className="w-4 h-4" />
              <span>Slipi, Jakarta Barat</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20">
            <Bell className="w-6 h-6" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Temukan Mobil, Motor, dan lainnya..."
            className="pl-10 w-full bg-card text-card-foreground placeholder:text-muted-foreground"
          />
        </div>
      </header>

      {/* Categories Section */}
      <section className="px-4 md:px-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold font-headline">Telusuri Kategori</h2>
          <Link href="/listings" className="text-sm font-medium text-primary hover:underline">
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {categories.slice(0, 9).map((cat) => (
            <CategoryButton key={cat.name} {...cat} />
          ))}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="px-4 md:px-6">
        <h2 className="text-lg font-bold font-headline mb-3">Rekomendasi Baru</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
