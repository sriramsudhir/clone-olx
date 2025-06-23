"use client"
import { getListingById } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MapPin, MessageSquare, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const listing = getListingById(params.id);

  if (!listing) {
    return (
        <div className="p-4 md:px-6">
            <header className="flex items-center mb-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
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

  return (
    <div className="p-4 md:px-6">
       <header className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold font-headline truncate">{listing.title}</h1>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden rounded-xl">
            <CardContent className="p-0">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  layout="fill"
                  objectFit="cover"
                  className="bg-muted"
                  data-ai-hint="product image"
                />
              </div>
              {listing.images.length > 1 && (
                <div className="p-2 grid grid-cols-5 gap-2">
                  {listing.images.slice(1, 5).map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      <Image
                        src={img}
                        alt={`${listing.title} thumbnail ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="cursor-pointer"
                        data-ai-hint="product image"
                      />
                    </div>
                  ))}
                  {listing.images.length > 5 && (
                      <div className="relative aspect-square rounded-md overflow-hidden bg-muted flex items-center justify-center text-foreground font-bold">
                          +{listing.images.length - 5}
                      </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6 rounded-xl">
              <CardHeader>
                  <CardTitle className="font-headline">Description</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-foreground/90">{listing.description}</p>
              </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card className="rounded-xl">
              <CardContent className="p-6">
                  <h1 className="text-2xl font-bold font-headline">{listing.title}</h1>
                  <p className="text-3xl font-bold text-primary mt-2">Rp {listing.price.toLocaleString('de-DE')}</p>
                  <div className="flex items-center text-muted-foreground mt-2 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                      <Button size="lg" className="flex-1 rounded-full" asChild>
                          <Link href={`/messages?conversationId=convo-1&listingId=${listing.id}`}>
                              <MessageSquare className="mr-2 h-5 w-5"/> Message
                          </Link>
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                          <Heart className="h-5 w-5"/>
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                          <Share2 className="h-5 w-5"/>
                      </Button>
                  </div>
              </CardContent>
          </Card>
          <Card className="rounded-xl">
              <CardHeader>
                  <CardTitle className="font-headline text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                          <AvatarImage src={listing.seller.avatarUrl} alt={listing.seller.name} data-ai-hint="person face" />
                          <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                          <p className="font-semibold text-lg">{listing.seller.name}</p>
                          <Link href="#" className="text-sm text-primary hover:underline">View profile</Link>
                      </div>
                  </div>
              </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
