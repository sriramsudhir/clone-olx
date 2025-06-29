"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Siren as Fire, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { listings } from '@/lib/data';

export default function TrendingSection() {
  const trendingListings = listings.slice(0, 6);
  const hotCategories = [
    { name: 'Electronics', count: 234, trend: '+12%' },
    { name: 'Vehicles', count: 189, trend: '+8%' },
    { name: 'Fashion', count: 156, trend: '+15%' },
    { name: 'Home', count: 98, trend: '+5%' }
  ];

  const formatPrice = (price: number, priceTo?: number) => {
    const formatNumber = (num: number) => '₹' + new Intl.NumberFormat('en-IN').format(num);
    if (priceTo && priceTo > price) {
      return `${formatNumber(price)} - ${formatNumber(priceTo)}`;
    }
    return formatNumber(price);
  };

  return (
    <div className="space-y-6">
      {/* Hot Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fire className="h-5 w-5 text-orange-500" />
            Hot Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hotCategories.map((category, index) => (
              <Link
                key={index}
                href={`/listings?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="p-4 rounded-lg border hover:border-primary transition-colors group-hover:shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{category.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {category.trend}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-primary">{category.count}</p>
                  <p className="text-xs text-muted-foreground">items</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {trendingListings.map((listing, index) => (
              <Link key={listing.id} href={`/listings/${listing.id}`} className="group">
                <div className="space-y-2">
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={listing.images[0]}
                      alt={listing.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="destructive" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                    {listing.isHighlighted && (
                      <div className="absolute top-2 right-2">
                        <Badge className="text-xs bg-yellow-500">
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {listing.title}
                    </h4>
                    <p className="text-sm font-bold text-primary">
                      {formatPrice(listing.price, listing.priceTo)}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>2 hours ago</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}