import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, Mic, MapPin } from 'lucide-react';
import ListingGrid from '@/components/listings/ListingGrid';
import { listings, users, categories as categoryData, banners } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

function CategoryButton({ name, slug }: { name: string; slug: string }) {
  return (
    <Button asChild variant={slug === 'all' ? 'default' : 'secondary'} className="rounded-full flex-shrink-0">
      <Link href={`/listings?category=${slug}`}>{name}</Link>
    </Button>
  );
}

export default function HomePage() {
  const currentUser = users[0];

  return (
    <div className="space-y-4">
      <header className="p-4 space-y-4 bg-card">
        <div className="flex justify-between items-center">
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
        <div className="relative">
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
      
      <section className="px-4">
        <div className="w-full aspect-[2/1] relative rounded-xl overflow-hidden">
             <Image src={banners[0]} alt="Ad Banner" layout="fill" objectFit='cover' data-ai-hint="advertisement banner" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold font-headline px-4">Categories</h2>
        <div className="flex gap-2 overflow-x-auto px-4 pb-2 -mb-2">
          {categoryData.map((cat) => (
            <CategoryButton key={cat.slug} {...cat} />
          ))}
        </div>
      </section>

      <section className="px-4 space-y-3">
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold font-headline">Fresh Recommendations</h2>
            <Link href="/listings" className="text-sm font-medium text-primary hover:underline">
                See All
            </Link>
        </div>
        <ListingGrid listings={listings.slice(0, 6)} />
      </section>
    </div>
  );
}
