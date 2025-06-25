
import { NextResponse, type NextRequest } from 'next/server';
import { listings } from '@/lib/data';
import type { Listing } from '@/lib/types';

// In-memory data store for demonstration
let listingsData: Listing[] = [...listings];

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search');
  let filteredListings = listingsData;

  if (search) {
    filteredListings = listingsData.filter(listing => 
      listing.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return NextResponse.json(filteredListings);
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
        return NextResponse.json({ message: 'Listing ID is required' }, { status: 400 });
    }

    const initialLength = listingsData.length;
    listingsData = listingsData.filter((listing) => listing.id !== id);

    if (listingsData.length === initialLength) {
        return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    // Also remove from original mock data if you want persistence across server restarts in dev
    // This is a simplified approach. In a real app, you'd be talking to a database.
    const indexInOriginal = listings.findIndex(l => l.id === id);
    if (indexInOriginal > -1) {
        listings.splice(indexInOriginal, 1);
    }

    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
  }
}
