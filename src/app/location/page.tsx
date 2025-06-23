
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, LocateFixed, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const popularLocations = [
  'Chennai Central',
  'Porur',
  'Perambur',
  'Chennai Air Port',
];

const recentLocations = ['India'];

export default function LocationPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleGoBack = () => {
    router.back();
  };

  const handleSelectLocation = (location: string) => {
    toast({ title: "Location Updated!", description: `Location set to ${location}.`});
    router.back();
  };
  
  const handleUseCurrentLocation = () => {
     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use position.coords.latitude and position.coords.longitude
          // to reverse-geocode the location name.
          toast({ title: "Location captured!" });
          router.back();
        },
        () => {
          toast({ variant: "destructive", title: "Could not get location." });
        }
      );
    } else {
      toast({ variant: "destructive", title: "Geolocation is not supported by your browser." });
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header for both mobile and desktop, with responsive adjustments */}
      <header className="flex items-center md:mb-4">
        <Button variant="ghost" size="icon" onClick={handleGoBack} className="rounded-full">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg md:text-2xl font-bold uppercase tracking-wider ml-4">Location</h1>
      </header>
      
      <main className="mt-4 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search city, area or locality"
            className="pl-12 w-full rounded-lg text-base h-12"
          />
        </div>

        <div>
          <button onClick={handleUseCurrentLocation} className="w-full text-left p-2 rounded-lg hover:bg-accent">
            <div className="flex items-center gap-4">
              <LocateFixed className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold text-base text-primary">Use current location</p>
                <p className="text-sm text-muted-foreground">Porur Raja Gopal Nagar, Chennai...</p>
              </div>
            </div>
          </button>
        </div>

        {recentLocations.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">Recent Locations</p>
            <div className="flex flex-col">
              {recentLocations.map((location) => (
                <button
                  key={location}
                  className="w-full text-left p-2 rounded-lg hover:bg-accent"
                  onClick={() => handleSelectLocation(location)}
                >
                  <div className="flex items-center gap-4 py-1 w-full">
                    <MapPin className="w-6 h-6 text-muted-foreground" />
                    <span className="text-base">{location}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <Separator />
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">Popular Locations</p>
          <div className="flex flex-col">
            {popularLocations.map((location) => (
              <button
                key={location}
                className="w-full text-left p-2 rounded-lg hover:bg-accent"
                onClick={() => handleSelectLocation(location)}
              >
                <div className="flex items-center gap-4 py-1 w-full">
                  <MapPin className="w-6 h-6 text-muted-foreground" />
                  <span className="text-base">{location}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
