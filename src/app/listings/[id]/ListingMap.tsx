
'use client';

import dynamic from 'next/dynamic';
import type { LatLngExpression } from 'leaflet';
import React from 'react';

// Define the props for our wrapper component
type ListingMapProps = {
    position: LatLngExpression;
    popupText?: string;
};
 
export default function ListingMap({ position, popupText }: ListingMapProps) {
  const Map = React.useMemo(() => dynamic(
    () => import('@/components/Map'),
    { 
      loading: () => <div className="h-full w-full bg-muted animate-pulse rounded-md" />,
      ssr: false
    }
  ), []);

  return <Map position={position} popupText={popupText} />;
}
