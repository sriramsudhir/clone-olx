"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Eye } from "lucide-react";
import Image from "next/image";

// Mock data
const listings = [
  {
    id: 1,
    title: "PIAGGIO VESPA MATIC SPRINT 150",
    price: "₹38,000,000",
    category: "Motor",
    status: "active",
    seller: "Ahmad Hudzaifah",
    image: "https://placehold.co/400x300.png",
    createdAt: "2024-07-22",
    views: 245
  },
  {
    id: 2,
    title: "Samsung Galaxy Z Fold 5 512GB",
    price: "₹18,500,000",
    category: "Electronics",
    status: "active",
    seller: "Budi Santoso",
    image: "https://placehold.co/400x300.png",
    createdAt: "2024-07-21",
    views: 189
  },
  {
    id: 3,
    title: "BMW X1 sDrive18i xLine (2014)",
    price: "₹260,000,000",
    category: "Cars",
    status: "pending",
    seller: "Charlie Wilson",
    image: "https://placehold.co/400x300.png",
    createdAt: "2024-07-20",
    views: 156
  }
];

export default function ListingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Listing Management</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search listings..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {listings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    width={80}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{listing.title}</h3>
                    <p className="text-sm text-muted-foreground">by {listing.seller}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                        {listing.status}
                      </Badge>
                      <Badge variant="outline">{listing.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {listing.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{listing.price}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {listing.views} views
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}