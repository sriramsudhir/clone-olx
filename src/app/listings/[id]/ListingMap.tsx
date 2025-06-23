
'use client';

import dynamic from 'next/dynamic';

// The Map component from react-leaflet must be loaded on the client side.
// We are dynamically importing it here with ssr: false, and then re-exporting it.
// This new component can then be safely used in Server Components.
const ListingMap = dynamic(() => import('@/components/Map'), { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-muted animate-pulse rounded-md" />
});

export default ListingMap;
