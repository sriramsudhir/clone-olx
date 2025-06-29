"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, Filter, MapPin, Clock, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { listings, categories } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';

export default function EnhancedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState(['iPhone', 'Car', 'Laptop', 'Furniture']);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = listings.filter(listing =>
        listing.title.toLowerCase().includes(query.toLowerCase()) ||
        listing.description.toLowerCase().includes(query.toLowerCase()) ||
        listing.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      setQuery('');
      setIsOpen(false);
    }
  };

  const formatPrice = (price: number, priceTo?: number) => {
    const formatNumber = (num: number) => '₹' + new Intl.NumberFormat('en-IN').format(num);
    if (priceTo && priceTo > price) {
      return `${formatNumber(price)} - ${formatNumber(priceTo)}`;
    }
    return formatNumber(price);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search for anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(query);
                }
              }}
              className="pl-12 pr-12 h-12 text-base rounded-full border-2 border-primary/20 focus:border-primary bg-white shadow-sm"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </PopoverTrigger>
        
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0 mt-2"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="p-2">
                <p className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Search Results
                </p>
                {results.map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/listings/${listing.id}`}
                    className="block p-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => {
                      handleSearch(query);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={listing.images[0]}
                        alt={listing.title}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{listing.title}</p>
                        <p className="text-sm text-primary font-semibold">
                          {formatPrice(listing.price, listing.priceTo)}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{listing.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : query.length > 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No results found for "{query}"
              </div>
            ) : (
              <div className="p-2 space-y-3">
                {recentSearches.length > 0 && (
                  <div>
                    <p className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Recent Searches
                    </p>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-2 py-2 rounded-lg hover:bg-accent text-sm"
                          onClick={() => {
                            setQuery(search);
                            handleSearch(search);
                          }}
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <p className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </p>
                  <div className="flex flex-wrap gap-1 px-2">
                    {trendingSearches.map((trend) => (
                      <Badge
                        key={trend}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => {
                          setQuery(trend);
                          handleSearch(trend);
                        }}
                      >
                        {trend}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}