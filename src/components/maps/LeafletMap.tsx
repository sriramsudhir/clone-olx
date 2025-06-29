'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { MapLocation } from '@/lib/maps';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface LeafletMapProps {
  location?: MapLocation;
  zoom: number;
  onLocationClick: (location: MapLocation) => void;
  height: string;
}

function MapEvents({ onLocationClick }: { onLocationClick: (location: MapLocation) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationClick({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}

export default function LeafletMap({ location, zoom, onLocationClick, height }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  const defaultCenter: [number, number] = location ? [location.lat, location.lng] : [28.6139, 77.2090]; // Delhi

  useEffect(() => {
    if (mapRef.current && location) {
      mapRef.current.setView([location.lat, location.lng], zoom);
    }
  }, [location, zoom]);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={zoom}
      style={{ height, width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapEvents onLocationClick={onLocationClick} />
      
      {location && (
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            {location.name || location.address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}