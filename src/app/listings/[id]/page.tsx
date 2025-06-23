"use client"
import { getListingById } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Share2, ArrowLeft, Info, Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ListingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const listing = getListingById(params.id as string);

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

  return (
    <div className="bg-card md:bg-transparent rounded-lg md:rounded-none">
        <div className="md:grid md:grid-cols-12 md:gap-8 lg:gap-12">
            <div className="md:col-span-7 lg:col-span-8">
                <div className="relative">
                    <div className="absolute top-4 left-4 z-10 md:hidden">
                        <Button variant="secondary" size="icon" onClick={() => router.back()} className="rounded-full bg-black/30 hover:bg-black/50 text-white">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </div>
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                        <Button variant="secondary" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 text-white">
                            <Share2 className="w-5 h-5" />
                        </Button>
                        <Button variant="secondary" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 text-white">
                            <Heart className="w-5 h-5" />
                        </Button>
                    </div>
                    
                    <div className="relative w-full aspect-square md:rounded-lg overflow-hidden">
                        <Image
                            src={listing.images[0]}
                            alt={listing.title}
                            layout="fill"
                            objectFit="cover"
                            className="bg-muted"
                            data-ai-hint="product image"
                        />
                        {listing.isHighlighted && (
                            <div className="absolute top-16 left-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-r-lg z-10 flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-500 text-yellow-600"/> HIGHLIGHT
                            </div>
                        )}
                        {listing.year && (
                            <Badge variant="secondary" className="absolute bottom-4 right-4 bg-black/50 text-white border-none">{listing.year}</Badge>
                        )}
                    </div>
                </div>
            </div>

            <div className="md:col-span-5 lg:col-span-4">
                <div className="p-4 md:p-0 space-y-4 pb-24 md:pb-4">
                    <div className="md:bg-card md:p-6 md:rounded-lg">
                        <div>
                            {listing.tags && (
                                <div className="flex gap-2 mb-2 flex-wrap">
                                    {listing.tags.map(tag => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                            )}
                            <h1 className="text-2xl md:text-3xl font-bold font-headline">{listing.title}</h1>
                        </div>

                        <div className="bg-primary/10 p-4 rounded-xl mt-4">
                            <p className="text-2xl font-bold text-primary">{`Rp ${new Intl.NumberFormat('id-ID').format(listing.price)}`}</p>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <span>bisa nego</span>
                                <Info className="w-4 h-4 ml-2"/>
                            </div>
                        </div>
                    </div>

                    <div className="md:bg-card md:p-6 md:rounded-lg">
                        <h2 className="font-semibold font-headline text-lg">Description</h2>
                        <p className="text-foreground/80 mt-2 text-sm whitespace-pre-line">
                            {listing.description}
                        </p>
                        <Button variant="link" className="p-0 h-auto text-primary">Read More</Button>
                    </div>
                    
                    <div className="md:bg-card md:p-6 md:rounded-lg">
                        <h2 className="font-semibold font-headline text-lg mb-2">Seller Information</h2>
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
                            <Button variant="outline" size="sm" className="rounded-full">View Profile</Button>
                        </div>
                    </div>
                     <div className="hidden md:block">
                        <Button size="lg" className="w-full rounded-lg">
                            <MessageSquare className="mr-2 h-5 w-5"/> Chat Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/80 backdrop-blur-sm border-t md:hidden">
            <Button size="lg" className="w-full rounded-full">
                <MessageSquare className="mr-2 h-5 w-5"/> Chat Now
            </Button>
        </div>
    </div>
  );
}
