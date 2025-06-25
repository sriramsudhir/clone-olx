
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ListingsClient from "./ListingsClient";

async function getListings() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/listings`);
    if (!res.ok) {
        throw new Error('Failed to fetch listings');
    }
    return res.json();
}

export default async function AdminListingsPage() {
    const listings = await getListings();

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
