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

export default function FilterSortBar() {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-card rounded-lg shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex-row md:flex-1 gap-4 w-full">
         <Select>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat.toLowerCase().replace(' ', '-')}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input placeholder="Location (e.g., San Francisco)" />
        <div className="flex gap-2">
            <Input type="number" placeholder="Min price" />
            <Input type="number" placeholder="Max price" />
        </div>
      </div>
      <div className="flex gap-4 w-full md:w-auto">
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <SlidersHorizontal className="h-5 w-5" />
          <span className="sr-only">More filters</span>
        </Button>
      </div>
    </div>
  );
}
