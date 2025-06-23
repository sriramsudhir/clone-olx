import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, Mic, MapPin } from 'lucide-react';
import ListingGrid from '@/components/listings/ListingGrid';
import { listings, users, categories as categoryData, banners } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import CategoryGrid from '@/components/CategoryGrid';

export default function HomePage() {
  const currentUser = users[0];

  return (
    <div className="space-y-6">
      <header className="p-4 space-y-4 bg-card md:bg-transparent md:p-0">
        <div className="flex justify-between items-center md:hidden">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person face" />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{currentUser.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>Banten, Tangerang Kota</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-6 h-6" />
          </Button>
        </div>
        <div className="relative md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search BMW 320i..."
            className="pl-10 w-full rounded-full bg-secondary border-none focus-visible:ring-primary"
          />
           <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full">
            <Mic className="w-5 h-5 text-gray-500"/>
           </Button>
        </div>
      </header>
      
      <section className="px-4 md:px-0">
        <div className="w-full aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1] relative rounded-xl overflow-hidden">
             <Image src={banners[0]} alt="Ad Banner" layout="fill" objectFit='cover' data-ai-hint="advertisement banner" />
        </div>
      </section>

      <section className="px-4 md:px-0">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-blue-100 to-transparent dark:from-blue-900/30 dark:to-transparent">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold font-headline">Telusuri Kategori</h2>
            <Link href="/listings?category=all" className="text-sm font-medium text-primary hover:underline">
              Lihat Semua
            </Link>
          </div>
          <CategoryGrid categories={categoryData} />
        </div>
      </section>

      <section className="px-4 md:px-0 space-y-3">
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold font-headline">Rekomendasi Terbaru</h2>
            <Link href="/listings" className="text-sm font-medium text-primary hover:underline">
                See All
            </Link>
        </div>
        <ListingGrid listings={listings.slice(0, 10)} />
      </section>
    </div>
  );
}
