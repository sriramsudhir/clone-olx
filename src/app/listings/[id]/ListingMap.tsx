
'use client';

import dynamic from 'next/dynamic';
import type { LatLngExpression } from 'leaflet';

// By defining the Map component at the module level using next/dynamic,
// we ensure that the component definition is created only once. This is a robust way
// to prevent the "Map container is already initialized" error that can occur
// during development with hot-reloading or React's Strict Mode.
const Map = dynamic(
  () => import('@/components/Map'),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-muted animate-pulse rounded-md" />
  }
);

// Define the props for our wrapper component
type ListingMapProps = {
    position: LatLngExpression;
    popupText?: string;
};

export default function ListingMap(props: ListingMapProps) {
  return <Map {...props} />;
}
