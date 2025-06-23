'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression, Map as LeafletMap } from 'leaflet';
import L from 'leaflet';
import { useCallback } from 'react';

// This is a common fix for a known issue with Leaflet and Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const OLA_MAP_ATTRIBUTION = '&copy; <a href="https://maps.olakrutrim.com/docs/getting-started/attribution/" target="_blank" rel="noopener noreferrer">Ola Krutrim</a>';
const OLA_MAP_TILE_URL = `https://api.maps.olakrutrim.com/krutrim/v1/map/raster/tile/default/{z}/{x}/{y}?api_key=${process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY}`;


export default function Map({ position, popupText }: { position: LatLngExpression, popupText?: string }) {
  const mapRef = useCallback((node: LeafletMap | null) => {
    if (node !== null) {
      // This is to fix a known issue where tiles don't load correctly.
      setTimeout(() => {
        node.invalidateSize();
      }, 100);
    }
  }, []);
  
  if (!process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY || process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY === "your_api_key_here") {
    return (
        <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground p-4 text-center">
            <p>Map cannot be displayed. The Ola Maps API key is missing. Please add it to your .env file.</p>
        </div>
    )
  }

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      className="h-full w-full rounded-md"
      ref={mapRef}
    >
      <TileLayer
        attribution={OLA_MAP_ATTRIBUTION}
        url={OLA_MAP_TILE_URL}
      />
      <Marker position={position}>
        {popupText && <Popup>{popupText}</Popup>}
      </Marker>
    </MapContainer>
  );
}
