"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  MapPin,
  Eye,
  EyeOff,
  Download,
  Filter
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

export default function AdminLocationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Mock locations data
  const locations = [
    {
      id: 'loc-1',
      name: 'Jakarta Selatan',
      type: 'city',
      parent: 'DKI Jakarta',
      coordinates: { lat: -6.2615, lng: 106.8106 },
      listingsCount: 342,
      isActive: true,
      population: 2057000,
      area: '145.73 km²',
      postalCodes: ['12110', '12120', '12130', '12140'],
      subLocations: ['Kebayoran Baru', 'Cilandak', 'Senayan', 'Kemang']
    },
    {
      id: 'loc-2',
      name: 'Jakarta Pusat',
      type: 'city',
      parent: 'DKI Jakarta',
      coordinates: { lat: -6.1944, lng: 106.8294 },
      listingsCount: 289,
      isActive: true,
      population: 914760,
      area: '48.13 km²',
      postalCodes: ['10110', '10120', '10130'],
      subLocations: ['Menteng', 'Tanah Abang', 'Gambir', 'Sawah Besar']
    },
    {
      id: 'loc-3',
      name: 'Jakarta Barat',
      type: 'city',
      parent: 'DKI Jakarta',
      coordinates: { lat: -6.1934, lng: 106.8021 },
      listingsCount: 198,
      isActive: true,
      population: 2434000,
      area: '129.54 km²',
      postalCodes: ['11110', '11120', '11130'],
      subLocations: ['Slipi', 'Kebon Jeruk', 'Palmerah', 'Grogol Petamburan']
    },
    {
      id: 'loc-4',
      name: 'Tangerang',
      type: 'city',
      parent: 'Banten',
      coordinates: { lat: -6.1783, lng: 106.6319 },
      listingsCount: 156,
      isActive: true,
      population: 2139000,
      area: '164.55 km²',
      postalCodes: ['15110', '15120', '15130'],
      subLocations: ['Karawaci', 'Serpong', 'Alam Sutera', 'BSD City']
    },
    {
      id: 'loc-5',
      name: 'Bekasi',
      type: 'city',
      parent: 'Jawa Barat',
      coordinates: { lat: -6.2349, lng: 106.9896 },
      listingsCount: 134,
      isActive: false,
      population: 2543676,
      area: '210.49 km²',
      postalCodes: ['17110', '17120', '17130'],
      subLocations: ['Bekasi Timur', 'Bekasi Barat', 'Bekasi Utara', 'Bekasi Selatan']
    },
    {
      id: 'loc-6',
      name: 'Kebayoran Baru',
      type: 'district',
      parent: 'Jakarta Selatan',
      coordinates: { lat: -6.244, lng: 106.8009 },
      listingsCount: 89,
      isActive: true,
      population: 232000,
      area: '31.12 km²',
      postalCodes: ['12110', '12120'],
      subLocations: ['Senayan', 'Melawai', 'Kramat Pela', 'Gandaria Utara']
    }
  ];

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.parent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || location.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? 
      <Badge variant="default">Active</Badge> : 
      <Badge variant="secondary">Inactive</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'city': 'bg-blue-100 text-blue-800',
      'district': 'bg-green-100 text-green-800',
      'province': 'bg-purple-100 text-purple-800',
      'village': 'bg-orange-100 text-orange-800'
    };
    
    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const stats = {
    total: locations.length,
    active: locations.filter(l => l.isActive).length,
    cities: locations.filter(l => l.type === 'city').length,
    districts: locations.filter(l => l.type === 'district').length,
    totalListings: locations.reduce((acc, loc) => acc + loc.listingsCount, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading">Locations Management</h1>
          <p className="text-muted-foreground">
            Manage geographical locations and service areas.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Active Locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{stats.cities}</div>
            <p className="text-xs text-muted-foreground">Cities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">{stats.districts}</div>
            <p className="text-xs text-muted-foreground">Districts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">{stats.totalListings}</div>
            <p className="text-xs text-muted-foreground">Total Listings</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="district">District</SelectItem>
                <SelectItem value="province">Province</SelectItem>
                <SelectItem value="village">Village</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Locations Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Locations ({filteredLocations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Coordinates</TableHead>
                <TableHead>Listings</TableHead>
                <TableHead>Population</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Area: {location.area}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTypeBadge(location.type)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{location.parent}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Lat: {location.coordinates.lat}</div>
                      <div>Lng: {location.coordinates.lng}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {location.listingsCount} listings
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {location.population.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(location.isActive)}
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
                          Edit Location
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MapPin className="mr-2 h-4 w-4" />
                          View on Map
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {location.isActive ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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