
"use client"
import { getListingById, listings } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Share2, ArrowLeft, Info, Star, MessageSquare, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import ListingGrid from '@/components/listings/ListingGrid';

export default function ListingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const listing = getListingById(params.id as string);
  const [selectedImage, setSelectedImage] = useState(0);

  const suggestedListings = listing
    ? listings
        .filter((l) => l.category === listing.category && l.id !== listing.id)
        .slice(0, 4)
    : [];

  if (!listing) {
    return (
        <div className="p-4">
            <header className="flex items-center mb-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2 rounded-full">
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-lg font-bold font-headline">Listing Not Found</h1>
            </header>
            <div className="text-center py-20">
                <p>Sorry, we couldn't find the listing you're looking for.</p>
            </div>
        </div>
    );
  }

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

  return (
    <div>
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <span className="text-sm text-muted-foreground hidden sm:block">Back to results</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Image Gallery */}
        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                            <Image
                                src={listing.images[selectedImage]}
                                alt={listing.title}
                                layout="fill"
                                objectFit="cover"
                                className="bg-muted"
                                data-ai-hint="product image"
                            />
                             <div className="absolute top-4 right-4 z-10 flex gap-2">
                                <Button variant="secondary" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 text-white">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                                <Button variant="secondary" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 text-white">
                                    <Heart className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {listing.images.map((img, index) => (
                                <button key={index} onClick={() => setSelectedImage(index)} className={cn("aspect-square relative rounded-md overflow-hidden transition-all", selectedImage === index ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100')}>
                                     <Image
                                        src={img}
                                        alt={`${listing.title} thumbnail ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="bg-muted"
                                     />
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {listing.tags?.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                         {listing.year && <Badge variant="outline">Year: {listing.year}</Badge>}
                    </div>
                    <p className="text-foreground/80 whitespace-pre-line">
                        {listing.description}
                    </p>
                </CardContent>
            </Card>
        </div>

        {/* Right Column - Info */}
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardContent className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold font-headline mb-2">{listing.title}</h1>
                    <p className="text-3xl font-bold text-primary">{formatPrice(listing.price, listing.priceTo)}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <span>bisa nego</span>
                        <Info className="w-4 h-4 ml-2"/>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Seller Information</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={listing.seller.avatarUrl} alt={listing.seller.name} data-ai-hint="person face" />
                                <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{listing.seller.name}</p>
                                <p className="text-sm text-muted-foreground">Member since May 2024</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="#">View Profile</Link>
                        </Button>
                    </div>
                     <div className="flex gap-2 mt-4">
                        <Button size="lg" className="flex-1">
                            <MessageSquare className="mr-2 h-5 w-5"/> Chat
                        </Button>
                        {listing.seller.showPhoneNumber && listing.seller.phoneNumber && (
                            <Button size="lg" variant="outline" className="flex-1" asChild>
                                <a href={`tel:${listing.seller.phoneNumber}`}>
                                    <Phone className="mr-2 h-5 w-5"/> Call Now
                                </a>
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{listing.location}</span>
                    </div>
                    <div className="aspect-video w-full rounded-md overflow-hidden bg-muted">
                        <Image src="https://placehold.co/400x200" alt="Map placeholder" width={400} height={200} className="w-full h-full object-cover" data-ai-hint="map street" />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      
      {suggestedListings.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold font-headline mb-4">You might also like</h2>
          <ListingGrid listings={suggestedListings} />
        </div>
      )}
    </div>
  );
}
