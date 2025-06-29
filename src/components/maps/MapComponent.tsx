'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Text,
  useToast,
  Select,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { Search, Navigation, Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import dynamic from 'next/dynamic';
import { MapService, type MapLocation, type MapProvider } from '@/lib/maps';

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false });
const OLAMap = dynamic(() => import('./OLAMap'), { ssr: false });

interface MapComponentProps {
  initialLocation?: MapLocation;
  onLocationSelect?: (location: MapLocation) => void;
  showSearch?: boolean;
  showControls?: boolean;
  height?: string;
}

export default function MapComponent({
  initialLocation,
  onLocationSelect,
  showSearch = true,
  showControls = true,
  height = '400px',
}: MapComponentProps) {
  const [currentProvider, setCurrentProvider] = useState<'ola' | 'leaflet'>('leaflet');
  const [providers, setProviders] = useState<MapProvider[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MapLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | undefined>(initialLocation);
  const [zoom, setZoom] = useState(13);
  const [isLoading, setIsLoading] = useState(false);
  
  const toast = useToast();

  useEffect(() => {
    const availableProviders = MapService.getAvailableProviders();
    setProviders(availableProviders);
    
    // Set default provider based on availability
    if (availableProviders.find(p => p.id === 'ola')) {
      setCurrentProvider('ola');
    } else {
      setCurrentProvider('leaflet');
    }
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const results = await MapService.searchLocation(searchQuery, currentProvider);
      setSearchResults(results);
      
      if (results.length > 0) {
        setSelectedLocation(results[0]);
        onLocationSelect?.(results[0]);
      } else {
        toast({
          title: 'No results found',
          description: 'Try searching with a different query',
          status: 'info',
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: 'Search failed',
        description: 'Unable to search for locations',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, currentProvider, onLocationSelect, toast]);

  const handleCurrentLocation = useCallback(async () => {
    setIsLoading(true);
    try {
      const location = await MapService.getCurrentLocation();
      if (location) {
        setSelectedLocation(location);
        onLocationSelect?.(location);
        toast({
          title: 'Location found',
          description: 'Showing your current location',
          status: 'success',
          duration: 3000,
        });
      } else {
        toast({
          title: 'Location access denied',
          description: 'Please enable location access in your browser',
          status: 'warning',
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: 'Location error',
        description: 'Unable to get your current location',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [onLocationSelect, toast]);

  const handleLocationClick = useCallback((location: MapLocation) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
  }, [onLocationSelect]);

  return (
    <Box position="relative" height={height} borderRadius="lg" overflow="hidden">
      {showSearch && (
        <Box
          position="absolute"
          top={4}
          left={4}
          right={4}
          zIndex={1000}
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
          p={3}
        >
          <VStack spacing={3}>
            <HStack width="100%">
              <InputGroup flex={1}>
                <InputLeftElement>
                  <Search size={16} />
                </InputLeftElement>
                <Input
                  placeholder="Search for places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </InputGroup>
              <Button
                onClick={handleSearch}
                isLoading={isLoading}
                colorScheme="brand"
                size="md"
              >
                Search
              </Button>
            </HStack>
            
            <HStack width="100%" justify="space-between">
              <Select
                value={currentProvider}
                onChange={(e) => setCurrentProvider(e.target.value as 'ola' | 'leaflet')}
                size="sm"
                width="150px"
              >
                {providers.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </Select>
              
              <Button
                leftIcon={<Navigation size={16} />}
                onClick={handleCurrentLocation}
                isLoading={isLoading}
                size="sm"
                variant="outline"
              >
                My Location
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}

      {showControls && (
        <Box
          position="absolute"
          top={showSearch ? "140px" : "20px"}
          right={4}
          zIndex={1000}
        >
          <VStack spacing={2}>
            <Tooltip label="Zoom In">
              <IconButton
                aria-label="Zoom in"
                icon={<ZoomIn size={16} />}
                onClick={() => setZoom(prev => Math.min(prev + 1, 18))}
                size="sm"
                bg="white"
                boxShadow="md"
              />
            </Tooltip>
            <Tooltip label="Zoom Out">
              <IconButton
                aria-label="Zoom out"
                icon={<ZoomOut size={16} />}
                onClick={() => setZoom(prev => Math.max(prev - 1, 1))}
                size="sm"
                bg="white"
                boxShadow="md"
              />
            </Tooltip>
            <Tooltip label="Reset View">
              <IconButton
                aria-label="Reset view"
                icon={<RotateCcw size={16} />}
                onClick={() => setZoom(13)}
                size="sm"
                bg="white"
                boxShadow="md"
              />
            </Tooltip>
          </VStack>
        </Box>
      )}

      {searchResults.length > 0 && (
        <Box
          position="absolute"
          top={showSearch ? "140px" : "20px"}
          left={4}
          zIndex={1000}
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
          p={3}
          maxWidth="300px"
          maxHeight="200px"
          overflowY="auto"
        >
          <Text fontSize="sm" fontWeight="semibold" mb={2}>
            Search Results
          </Text>
          <VStack spacing={1} align="stretch">
            {searchResults.map((result, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                textAlign="left"
                justifyContent="flex-start"
                onClick={() => handleLocationClick(result)}
                _hover={{ bg: 'brand.50' }}
              >
                <Text fontSize="xs" noOfLines={2}>
                  {result.name || result.address}
                </Text>
              </Button>
            ))}
          </VStack>
        </Box>
      )}

      {currentProvider === 'leaflet' ? (
        <LeafletMap
          location={selectedLocation}
          zoom={zoom}
          onLocationClick={handleLocationClick}
          height={height}
        />
      ) : (
        <OLAMap
          location={selectedLocation}
          zoom={zoom}
          onLocationClick={handleLocationClick}
          height={height}
        />
      )}
    </Box>
  );
}