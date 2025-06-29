"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Star,
  MapPin,
  Download,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function AdminListingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock listings data
  const listings = [
    {
      id: 'listing-1',
      title: 'Samsung Galaxy Z Fold 5 512GB',
      description: 'A slightly used Samsung Galaxy Z Fold. Comes with original box and accessories.',
      price: 18500000,
      priceTo: 19000000,
      category: 'Electronics',
      subcategory: 'Smartphone',
      location: 'Cilandak, Jakarta Selatan',
      images: ['https://placehold.co/800x600.png'],
      status: 'active',
      featured: true,
      seller: {
        id: 'user-1',
        name: 'Ahmad Hudzaifah',
        email: 'ahmad@email.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      createdAt: '2024-07-21T10:00:00Z',
      views: 245,
      likes: 12
    },
    {
      id: 'listing-2',
      title: 'BMW X1 sDrive18i xLine (2014)',
      description: 'A stunning red BMW sports car. Great condition, very low mileage.',
      price: 260000000,
      category: 'Vehicles',
      subcategory: 'SUV',
      location: 'Kebayoran Baru, Jakarta Selatan',
      images: ['https://placehold.co/800x600.png'],
      status: 'pending',
      featured: false,
      seller: {
        id: 'user-2',
        name: 'Budi Santoso',
        email: 'budi@email.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      createdAt: '2024-07-21T11:30:00Z',
      views: 89,
      likes: 5
    },
    {
      id: 'listing-3',
      title: 'MacBook Pro M1 13-inch 2021',
      description: '13-inch laptop, great for students or professionals.',
      price: 16000000,
      category: 'Electronics',
      subcategory: 'Laptop',
      location: 'Menteng, Jakarta Pusat',
      images: ['https://placehold.co/800x600.png'],
      status: 'rejected',
      featured: false,
      seller: {
        id: 'user-3',
        name: 'Charlie Wilson',
        email: 'charlie@email.com',
        avatar: 'https://placehold.co/40x40.png'
      },
      createdAt: '2024-05-23T08:20:00Z',
      views: 156,
      likes: 8
    }
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || listing.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatPrice = (price: number, priceTo?: number) => {
    const formatNumber = (num: number) => {
        return '₹' + new Intl.NumberFormat('en-IN').format(num);
    }
    if (priceTo && priceTo > price) {
        return `${formatNumber(price)} - ${formatNumber(priceTo)}`;
    }
    return formatNumber(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'sold':
        return <Badge variant="outline">Sold</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const stats = {
    total: listings.length,
    active: listings.filter(l => l.status === 'active').length,
    pending: listings.filter(l => l.status === 'pending').length,
    featured: listings.filter(l => l.featured).length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading">Listings Management</h1>
          <p className="text-muted-foreground">
            Manage all marketplace listings and their status.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Listing
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Active Listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">{stats.featured}</div>
            <p className="text-xs text-muted-foreground">Featured Listings</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Vehicles">Vehicles</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Home">Home & Garden</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Listings ({filteredListings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Listing</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Image
                          src={listing.images[0]}
                          alt={listing.title}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                        {listing.featured && (
                          <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{listing.title}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {listing.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="outline">{listing.category}</Badge>
                      {listing.subcategory && (
                        <Badge variant="secondary" className="text-xs">
                          {listing.subcategory}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatPrice(listing.price, listing.priceTo)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Image
                        src={listing.seller.avatar}
                        alt={listing.seller.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium">{listing.seller.name}</div>
                        <div className="text-xs text-muted-foreground">{listing.seller.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{listing.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(listing.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{listing.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{listing.likes}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          {listing.featured ? 'Remove Feature' : 'Make Featured'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {listing.status === 'pending' && (
                          <>
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}