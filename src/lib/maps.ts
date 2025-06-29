export interface MapProvider {
  name: string;
  id: 'ola' | 'leaflet';
  apiKey?: string;
  isEnabled: boolean;
}

export interface MapLocation {
  lat: number;
  lng: number;
  address?: string;
  name?: string;
}

export interface RouteOptions {
  origin: MapLocation;
  destination: MapLocation;
  waypoints?: MapLocation[];
  optimize?: boolean;
}

export class MapService {
  private static providers: MapProvider[] = [
    {
      name: 'OLA Maps',
      id: 'ola',
      apiKey: process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY,
      isEnabled: !!process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY,
    },
    {
      name: 'Leaflet Maps',
      id: 'leaflet',
      apiKey: process.env.NEXT_PUBLIC_LEAFLET_ACCESS_TOKEN,
      isEnabled: true, // Leaflet works without API key for basic features
    },
  ];

  static getAvailableProviders(): MapProvider[] {
    return this.providers.filter(p => p.isEnabled);
  }

  static async searchLocation(query: string, provider: 'ola' | 'leaflet' = 'ola'): Promise<MapLocation[]> {
    if (provider === 'ola' && this.providers.find(p => p.id === 'ola')?.isEnabled) {
      return this.searchWithOLA(query);
    } else {
      return this.searchWithNominatim(query);
    }
  }

  private static async searchWithOLA(query: string): Promise<MapLocation[]> {
    try {
      const response = await fetch(
        `https://api.maps.olakrutrim.com/krutrim/v1/geocoding/search?q=${encodeURIComponent(query)}&api_key=${process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY}`
      );
      
      const data = await response.json();
      
      return data.results?.map((result: any) => ({
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        address: result.formatted_address,
        name: result.name,
      })) || [];
    } catch (error) {
      console.error('OLA Maps search failed:', error);
      return [];
    }
  }

  private static async searchWithNominatim(query: string): Promise<MapLocation[]> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      
      const data = await response.json();
      
      return data.map((result: any) => ({
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        address: result.display_name,
        name: result.name,
      }));
    } catch (error) {
      console.error('Nominatim search failed:', error);
      return [];
    }
  }

  static async calculateRoute(options: RouteOptions, provider: 'ola' | 'leaflet' = 'ola') {
    if (provider === 'ola' && this.providers.find(p => p.id === 'ola')?.isEnabled) {
      return this.calculateRouteWithOLA(options);
    } else {
      return this.calculateRouteWithOSRM(options);
    }
  }

  private static async calculateRouteWithOLA(options: RouteOptions) {
    try {
      const { origin, destination, waypoints = [], optimize = false } = options;
      
      let coordinates = `${origin.lng},${origin.lat}`;
      
      if (waypoints.length > 0) {
        const waypointCoords = waypoints.map(wp => `${wp.lng},${wp.lat}`).join(';');
        coordinates += `;${waypointCoords}`;
      }
      
      coordinates += `;${destination.lng},${destination.lat}`;
      
      const response = await fetch(
        `https://api.maps.olakrutrim.com/krutrim/v1/directions/driving/${coordinates}?optimize=${optimize}&api_key=${process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY}`
      );
      
      const data = await response.json();
      
      return {
        success: true,
        route: data.routes?.[0],
        distance: data.routes?.[0]?.distance,
        duration: data.routes?.[0]?.duration,
        geometry: data.routes?.[0]?.geometry,
      };
    } catch (error) {
      console.error('OLA Maps route calculation failed:', error);
      return { success: false, error: 'Route calculation failed' };
    }
  }

  private static async calculateRouteWithOSRM(options: RouteOptions) {
    try {
      const { origin, destination, waypoints = [] } = options;
      
      let coordinates = `${origin.lng},${origin.lat}`;
      
      if (waypoints.length > 0) {
        const waypointCoords = waypoints.map(wp => `${wp.lng},${wp.lat}`).join(';');
        coordinates += `;${waypointCoords}`;
      }
      
      coordinates += `;${destination.lng},${destination.lat}`;
      
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
      );
      
      const data = await response.json();
      
      return {
        success: true,
        route: data.routes?.[0],
        distance: data.routes?.[0]?.distance,
        duration: data.routes?.[0]?.duration,
        geometry: data.routes?.[0]?.geometry,
      };
    } catch (error) {
      console.error('OSRM route calculation failed:', error);
      return { success: false, error: 'Route calculation failed' };
    }
  }

  static async getCurrentLocation(): Promise<MapLocation | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    });
  }
}