
'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { LatLngExpression } from 'leaflet';

// Define the props for our wrapper component
type ListingMapProps = {
    position: LatLngExpression;
    popupText?: string;
};

// Create a new wrapper component that uses `useMemo` to ensure the dynamically imported
// map is only created once. This is a common pattern to prevent initialization errors
// with libraries like Leaflet in React.
export default function ListingMap(props: ListingMapProps) {
  const Map = useMemo(() => dynamic(
    () => import('@/components/Map'),
    { 
      ssr: false,
      loading: () => <div className="h-full w-full bg-muted animate-pulse rounded-md" />
    }
  ), []); // The empty dependency array is crucial here.

  return <Map {...props} />;
}
