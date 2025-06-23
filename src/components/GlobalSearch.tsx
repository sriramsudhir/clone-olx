
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverAnchor } from '@/components/ui/popover';
import { listings } from '@/lib/data';
import type { Listing } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const formatPrice = (price: number, priceTo?: number) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    if (priceTo && priceTo > price) {
        return `${formatter.format(price)} - ${formatter.format(priceTo)}`;
    }
    return formatter.format(price);
};

export default function GlobalSearch({ className }: { className?: string }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Listing[]>([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    useEffect(() => {
        if (query.trim().length > 1) {
            const lowerCaseQuery = query.toLowerCase();
            const filteredResults = listings.filter(listing =>
                listing.title.toLowerCase().includes(lowerCaseQuery) ||
                listing.description.toLowerCase().includes(lowerCaseQuery) ||
                listing.category.toLowerCase().includes(lowerCaseQuery)
            ).slice(0, 10);
            setResults(filteredResults);
            setIsPopoverOpen(true);
        } else {
            setResults([]);
            setIsPopoverOpen(false);
        }
    }, [query]);

    const handleSelect = () => {
        setQuery('');
        setResults([]);
        setIsPopoverOpen(false);
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <div className={cn("relative w-full", className)}>
                <PopoverAnchor asChild>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                        <Input
                            type="search"
                            placeholder="Search anything..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-10 w-full rounded-full bg-secondary border-none focus-visible:ring-primary"
                        />
                    </div>
                </PopoverAnchor>
            </div>
            
            <PopoverContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="w-[var(--radix-popover-trigger-width)] p-0 mt-2 rounded-xl"
            >
                <ScrollArea className="max-h-[70vh]">
                    <div className="p-2">
                        {results.length > 0 ? (
                            <div className="space-y-1">
                                <p className="px-2 py-1 text-xs font-semibold text-muted-foreground tracking-wider uppercase">Listings</p>
                                {results.map((listing) => (
                                    <Link
                                        key={listing.id}
                                        href={`/listings/${listing.id}`}
                                        className="block p-2 rounded-lg hover:bg-accent"
                                        onClick={handleSelect}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={listing.images[0]}
                                                alt={listing.title}
                                                width={48}
                                                height={48}
                                                className="w-12 h-12 object-cover rounded-md bg-muted"
                                                data-ai-hint="product image"
                                            />
                                            <div className="flex-1 overflow-hidden">
                                                <p className="font-semibold truncate text-sm">{listing.title}</p>
                                                <p className="text-sm text-primary">{formatPrice(listing.price, listing.priceTo)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                           <p className="p-8 text-center text-sm text-muted-foreground">No results found for "{query}".</p>
                        )}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}
