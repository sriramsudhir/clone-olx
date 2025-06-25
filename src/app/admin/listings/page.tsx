
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ListingsClient from "./ListingsClient";
import type { Listing } from "@/lib/types";

async function getListings(search?: string): Promise<Listing[]> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/listings`);
    if (search) {
      url.searchParams.append('search', search);
    }
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch listings');
    }
    return res.json();
}

export default async function AdminListingsPage({ searchParams }: { searchParams?: { search?: string } }) {
    const search = searchParams?.search;
    const listings = await getListings(search);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Listings</CardTitle>
                <CardDescription>Manage all product listings.</CardDescription>
            </CardHeader>
            <CardContent>
                <ListingsClient initialListings={listings} />
            </CardContent>
        </Card>
    );
}
