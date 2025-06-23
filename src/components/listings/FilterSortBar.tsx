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
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { useState, useEffect } from 'react';

type FilterState = {
  sort: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  condition: string[];
  location: string;
}

export default function FilterSortBar({ isMobile = false }: { isMobile?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterState>({
    sort: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    condition: [],
    location: '',
  });

  useEffect(() => {
    // Initialize state from URL search params
    const newFilters: FilterState = {
        sort: searchParams.get('sort') || 'newest',
        category: searchParams.get('category') || 'all',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        condition: searchParams.getAll('condition') || [],
        location: searchParams.get('location') || '',
    };
    
    // special handling for category change via main nav
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categoryFromUrl !== newFilters.category) {
        newFilters.category = categoryFromUrl;
    }

    setFilters(newFilters);
  }, [searchParams]);

  const handleValueChange = (key: keyof FilterState, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleConditionChange = (cond: 'new' | 'used', checked: boolean) => {
    setFilters(prev => {
        const newConditions = new Set(prev.condition);
        if (checked) {
            newConditions.add(cond);
        } else {
            newConditions.delete(cond);
        }
        return {...prev, condition: Array.from(newConditions)}
    })
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    
    // Set non-empty filters
    if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort);
    if (filters.category && filters.category !== 'all') params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.location) params.set('location', filters.location);

    // Handle condition array
    filters.condition.forEach(c => params.append('condition', c));
    
    // Preserve subCategory if it exists from the original search params
    const subCategory = searchParams.get('subCategory');
    if(subCategory) params.set('subCategory', subCategory);

    router.push(`${pathname}?${params.toString()}`);
  }

  const handleClearFilters = () => {
    const params = new URLSearchParams();
    // Preserve category and subCategory from the base URL if they exist
    if (searchParams.get('category')) params.set('category', searchParams.get('category')!);
    if (searchParams.get('subCategory')) params.set('subCategory', searchParams.get('subCategory')!);
    router.push(`${pathname}?${params.toString()}`);
  }

  const commonFilters = (
     <div className="space-y-6">
        <div>
            <h3 className="font-semibold mb-2">Sort</h3>
             <Select value={filters.sort} onValueChange={(v) => handleValueChange('sort', v)}>
                <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
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
            <Select value={filters.category} onValueChange={(v) => handleValueChange('category', v)}>
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
                        <Input type="number" placeholder="Min" aria-label="Minimum Price" className="bg-background" value={filters.minPrice} onChange={(e) => handleValueChange('minPrice', e.target.value)} />
                        <span>-</span>
                        <Input type="number" placeholder="Max" aria-label="Maximum Price" className="bg-background" value={filters.maxPrice} onChange={(e) => handleValueChange('maxPrice', e.target.value)} />
                    </div>
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="condition">
                <AccordionTrigger>Condition</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="new" checked={filters.condition.includes('new')} onCheckedChange={(c) => handleConditionChange('new', !!c)} />
                            <Label htmlFor="new" className="font-normal">New</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="used" checked={filters.condition.includes('used')} onCheckedChange={(c) => handleConditionChange('used', !!c)} />
                            <Label htmlFor="used" className="font-normal">Used</Label>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="location">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent>
                    <Input placeholder="Search location..." className="bg-background" value={filters.location} onChange={(e) => handleValueChange('location', e.target.value)} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        
        <div className="flex gap-2">
            <Button variant="secondary" className="w-full" onClick={handleClearFilters}>Clear</Button>
            <Button className="w-full" onClick={handleApplyFilters}>Apply</Button>
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
