'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


// This is a workaround for a common issue in React-Leaflet with Next.js where the default marker icon does not load.
// We are manually setting the paths to the marker icon images that come with the leaflet package.
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;  
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

export default function Map({ position, popupText }: { position: LatLngExpression, popupText?: string }) {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full rounded-md z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        {popupText && 
          <Popup>
            {popupText}
          </Popup>
        }
      </Marker>
    </MapContainer>
  );
}
