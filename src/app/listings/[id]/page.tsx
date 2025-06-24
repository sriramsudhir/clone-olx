import { getListingById } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Info, MessageSquare, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ListingGrid from '@/components/listings/ListingGrid';
import { notFound } from 'next/navigation';
import ImageGallery from './ImageGallery';
import BackButton from '@/components/layout/BackButton';
import { listings } from '@/lib/data';
import ListingMap from './ListingMap';

type ListingDetailPageProps = {
  params: { id: string };
};

export default function ListingDetailPage({ params }: ListingDetailPageProps) {
  const listing = getListingById(params.id);

  if (!listing) {
    notFound();
  }

  const suggestedListings = listings
    .filter((l) => l.category === listing.category && l.id !== listing.id)
    .slice(0, 4);

  const formatPrice = (price: number, priceTo?: number) => {
    const formatNumber = (num: number) => {
        return 'Rp' + new Intl.NumberFormat('id-ID').format(num);
    }
    if (priceTo && priceTo > price) {
        return `${formatNumber(price)} - ${formatNumber(priceTo)}`;
    }
    return formatNumber(price);
  };
  
  return (
    <div>
      <div className="flex items-center mb-4">
        <BackButton className="mr-2 rounded-full" />
        <span className="text-sm text-muted-foreground hidden sm:block">Back to results</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <ImageGallery listing={listing} />
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
                        <ListingMap listing={listing} />
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
