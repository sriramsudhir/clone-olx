"use client";

import { categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function FilterSortBar() {
  const router = useRouter();

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all') {
      router.push('/listings');
    } else {
      router.push(`/listings?category=${slug}`);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-sm">
      <div className="p-4 border-b">
        {/* Main filters visible on all screens */}
        <div className="flex flex-col md:flex-row gap-4">
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sort by: Newest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Sort by: Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Additional filters trigger */}
      <div className="p-4">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-muted-foreground">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Location, price, and more filters...
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                    <div className="grid gap-3">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="e.g., San Francisco" />
                    </div>
                    <div className="grid gap-3">
                        <Label>Price Range</Label>
                        <div className="flex items-center gap-2">
                            <Input type="number" placeholder="Min" />
                            <span>-</span>
                            <Input type="number" placeholder="Max" />
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <Button type="button" variant="outline" className="w-full">Clear</Button>
                    <Button type="submit" className="w-full">Apply Filters</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
