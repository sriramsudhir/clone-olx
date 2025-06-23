'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import type { Listing } from '@/lib/types';

export default function ListingMap({ listing }: { listing: Listing }) {
    const Map = useMemo(() => dynamic(() => import('@/components/Map'), {
        loading: () => <div className="h-full w-full bg-muted animate-pulse rounded-md" />,
        ssr: false
    }), []);

    if (listing.lat === undefined || listing.lng === undefined) {
        return <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground p-4 text-center">Location data not available for this listing.</div>;
    }
    
    const position: [number, number] = [listing.lat, listing.lng];
    
    return <Map position={position} popupText={listing.location} />;
}
