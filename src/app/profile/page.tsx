import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Package, Settings, LogOut, Shield } from 'lucide-react';
import { users, listings } from "@/lib/data";
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListingGrid from "@/components/listings/ListingGrid";

export default function ProfilePage() {
  const currentUser = users[0];
  const myListings = listings.filter(l => l.seller.id === currentUser.id);
  const savedListings = listings.slice(0, 4); // Placeholder

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="bg-muted h-32 md:h-48" />
          <div className="px-4 md:px-6 pb-4 -mt-16 sm:-mt-20">
            <div className="flex items-end gap-4">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-card">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person face" />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="pb-2">
                <h1 className="text-2xl font-bold font-headline">{currentUser.name}</h1>
                <p className="text-muted-foreground">Member since May 2024</p>
              </div>
               <Button size="sm" className="ml-auto mb-2 rounded-full">Edit Profile</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="listings">
                <ListingGrid listings={myListings} />
                {myListings.length === 0 && (
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
            <TabsContent value="saved">
                 <ListingGrid listings={savedListings} />
            </TabsContent>
            <TabsContent value="settings">
                <div className="max-w-md mx-auto space-y-2">
                    <Link href="#">
                        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <Shield className="w-5 h-5 text-primary"/>
                                <span className="font-semibold">Verification</span>
                            </div>
                        </div>
                    </Link>
                    <Link href="#">
                        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <Settings className="w-5 h-5 text-primary"/>
                                <span className="font-semibold">General Settings</span>
                            </div>
                        </div>
                    </Link>
                     <Link href="#">
                        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer text-red-500">
                            <div className="flex items-center gap-4">
                                <LogOut className="w-5 h-5"/>
                                <span className="font-semibold">Log Out</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
