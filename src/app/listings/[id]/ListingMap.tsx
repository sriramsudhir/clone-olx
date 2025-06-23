
'use client';

import dynamic from 'next/dynamic';
import type { LatLngExpression } from 'leaflet';

// Define the props for our wrapper component
type ListingMapProps = {
    position: LatLngExpression;
    popupText?: string;
};
 
const Map = dynamic(
  () => import('@/components/Map'),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-muted animate-pulse rounded-md" />
  }
);
 
export default function ListingMap({ position, popupText }: ListingMapProps) {
  return <Map position={position} popupText={popupText} />;
}
