'use client';

import { useEffect, useRef } from 'react';
import { Box, Text } from '@chakra-ui/react';
import type { MapLocation } from '@/lib/maps';

interface OLAMapProps {
  location?: MapLocation;
  zoom: number;
  onLocationClick: (location: MapLocation) => void;
  height: string;
}

export default function OLAMap({ location, zoom, onLocationClick, height }: OLAMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || !process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY) return;

    // Initialize OLA Map
    const initMap = async () => {
      try {
        // Load OLA Maps SDK
        const script = document.createElement('script');
        script.src = `https://api.maps.olakrutrim.com/krutrim/v1/js?key=${process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY}`;
        script.async = true;
        
        script.onload = () => {
          if (window.OlaMap && mapRef.current) {
            const center = location ? [location.lat, location.lng] : [28.6139, 77.2090];
            
            mapInstanceRef.current = new window.OlaMap.Map({
              container: mapRef.current,
              style: 'https://api.maps.olakrutrim.com/krutrim/v1/styles/default',
              center: center,
              zoom: zoom,
            });

            // Add click event listener
            mapInstanceRef.current.on('click', (e: any) => {
              onLocationClick({
                lat: e.lngLat.lat,
                lng: e.lngLat.lng,
              });
            });

            // Add marker if location is provided
            if (location) {
              new window.OlaMap.Marker()
                .setLngLat([location.lng, location.lat])
                .addTo(mapInstanceRef.current);
            }
          }
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load OLA Maps:', error);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && location) {
      mapInstanceRef.current.setCenter([location.lng, location.lat]);
      mapInstanceRef.current.setZoom(zoom);
      
      // Add new marker
      new window.OlaMap.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(mapInstanceRef.current);
    }
  }, [location, zoom]);

  if (!process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY) {
    return (
      <Box
        height={height}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.100"
        borderRadius="lg"
      >
        <Text color="gray.500">OLA Maps API key not configured</Text>
      </Box>
    );
  }

  return <Box ref={mapRef} height={height} width="100%" borderRadius="lg" />;
}

// Extend window object for OLA Maps
declare global {
  interface Window {
    OlaMap: any;
  }
}