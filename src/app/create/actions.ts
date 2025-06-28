
"use server";

import { listings, users } from '@/lib/data';
import type { Listing } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function createListing(data: {
    title: string;
    category: string;
    subCategory?: string;
    description: string;
    price: number;
    priceTo?: number;
    location: string;
    images: string[];
}) {
    const newListing: Listing = {
        id: `listing-${Date.now()}-${Math.random()}`,
        ...data,
        seller: users[0], // Mock current user as the seller
        createdAt: new Date().toISOString(),
        condition: 'used', // Default condition
    };
    listings.unshift(newListing); // Add to beginning of array for visibility
    revalidatePath('/profile');
    revalidatePath('/');
}

export async function updateListing(id: string, data: {
    title: string;
    category: string;
    subCategory?: string;
    description: string;
    price: number;
    priceTo?: number;
    location: string;
    images: string[];
}) {
    const listingIndex = listings.findIndex(l => l.id === id);
    if (listingIndex > -1) {
        const existingListing = listings[listingIndex];
        listings[listingIndex] = {
            ...existingListing,
            ...data,
        };
        revalidatePath(`/listings/${id}`);
        revalidatePath('/profile');
    } else {
        console.error(`Listing with id ${id} not found for update.`);
        throw new Error('Listing not found');
    }
}
