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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

export default function FilterSortBar({ isMobile = false }: { isMobile?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    router.push(`/listings?${params.toString()}`);
  };
  
  const selectedCategory = searchParams.get('category') || 'all';

  const commonFilters = (
     <div className="space-y-6">
        <div>
            <h3 className="font-semibold mb-2">Sort</h3>
             <Select defaultValue="newest">
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
        
        <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <Select onValueChange={handleCategoryChange} value={selectedCategory}>
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
        </div>

        <Accordion type="multiple" defaultValue={['price', 'condition']} className="w-full">
            <AccordionItem value="price">
                <AccordionTrigger>Price</AccordionTrigger>
                <AccordionContent>
                    <div className="flex items-center gap-2">
                        <Input type="number" placeholder="Min" aria-label="Minimum Price" className="bg-background"/>
                        <span>-</span>
                        <Input type="number" placeholder="Max" aria-label="Maximum Price" className="bg-background"/>
                    </div>
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="condition">
                <AccordionTrigger>Condition</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="new" />
                            <Label htmlFor="new" className="font-normal">New</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="used" />
                            <Label htmlFor="used" className="font-normal">Used</Label>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="location">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent>
                    <Input placeholder="Search location..." className="bg-background"/>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        
        <div className="flex gap-2">
            <Button variant="secondary" className="w-full">Clear</Button>
            <Button className="w-full">Apply</Button>
        </div>
     </div>
  );

  if (isMobile) {
    return commonFilters;
  }

  return (
    <div className="bg-card md:bg-transparent rounded-lg md:rounded-none md:shadow-none p-4 md:p-0">
      {commonFilters}
    </div>
  );
}
