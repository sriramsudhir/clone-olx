
import { NextResponse } from 'next/server';
import { listings } from '@/lib/data';

// In-memory data store for demonstration
let listingsData = [...listings];

export async function GET() {
  return NextResponse.json(listingsData);
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

    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
  }
}
