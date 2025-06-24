import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Package, Pencil } from 'lucide-react';
import { users, listings } from "@/lib/data";
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListingCard from "@/components/listings/ListingCard";
import ListingGrid from "@/components/listings/ListingGrid";
import ProfileSettings from "./ProfileSettings";

export default function ProfilePage({ searchParams }: { searchParams: { tab: string } }) {
  const currentUser = users[0];
  const myListings = listings.filter(l => l.seller.id === currentUser.id);
  const savedListings = listings.slice(0, 4); // Placeholder
  const activeTab = searchParams.tab || 'listings';

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="bg-muted h-32 md:h-48" />
          <div className="px-4 md:px-6 pb-4 -mt-16 sm:-mt-20">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left gap-4">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person face" />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h1 className="text-2xl font-bold font-headline">{currentUser.name}</h1>
                <p className="text-muted-foreground">Member since May 2024</p>
              </div>
               <Button asChild size="sm" className="w-full sm:w-auto sm:ml-auto rounded-full">
                <Link href="/profile?tab=settings">Edit Profile</Link>
               </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <Tabs defaultValue={activeTab} className="w-full">
            <div className="border-b">
              <TabsList className="bg-transparent p-0 -mb-px">
                <TabsTrigger value="listings" className="bg-transparent text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none py-3">My Listings</TabsTrigger>
                <TabsTrigger value="saved" className="bg-transparent text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none py-3">Saved</TabsTrigger>
                <TabsTrigger value="settings" className="bg-transparent text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none py-3">Settings</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="listings" className="mt-6">
                {myListings.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                        {myListings.map((listing) => (
                            <div key={listing.id} className="relative group/edit">
                                <ListingCard listing={listing} />
                                <Button asChild size="icon" className="absolute top-12 right-2 h-8 w-8 z-20 opacity-0 group-hover/edit:opacity-100 transition-opacity bg-background hover:bg-secondary rounded-full shadow-md">
                                    <Link href={`/listings/${listing.id}/edit`}>
                                        <Pencil className="h-4 w-4 text-foreground" />
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No listings yet</h3>
                        <p className="mt-1 text-sm text-muted-foreground">When you post items, they will appear here.</p>
                        <Button asChild className="mt-4">
                            <Link href="/create">Post a Listing</Link>
                        </Button>
                    </div>
                )}
            </TabsContent>
            <TabsContent value="saved" className="mt-6">
                 <ListingGrid listings={savedListings} />
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
                <ProfileSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
