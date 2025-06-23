import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, MapPin, ChevronDown } from 'lucide-react';
import ListingGrid from '@/components/listings/ListingGrid';
import { listings, users, categories as categoryData, banners } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import CategoryGrid from '@/components/CategoryGrid';
import { Card } from '@/components/ui/card';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import GlobalSearch from '@/components/GlobalSearch';

export default function HomePage() {
  const currentUser = users[0];

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
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground cursor-pointer hover:text-primary">
                    <MapPin className="w-3 h-3" />
                    <span>Banten, Tangerang Kota</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Change Location</h4>
                      <p className="text-sm text-muted-foreground">
                        Enter a new location to see listings near you.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="Banten, Tangerang Kota" />
                      <Button>Change</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-6 h-6" />
          </Button>
        </div>
        <GlobalSearch />
      </header>
      
      <section>
        <div className="w-full aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1] relative rounded-2xl overflow-hidden shadow-sm">
             <Image src={banners[0]} alt="Ad Banner" layout="fill" objectFit='cover' className="bg-muted" data-ai-hint="advertisement banner" />
        </div>
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
