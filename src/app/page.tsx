'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Grid,
  Card,
  CardBody,
  Badge,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { MapPin, CreditCard, Shield, Smartphone } from 'lucide-react';
import SplashScreen from '@/components/mobile/SplashScreen';
import MapComponent from '@/components/maps/MapComponent';
import PaymentGateway from '@/components/payment/PaymentGateway';
import OTPLogin from '@/components/auth/OTPLogin';
import type { MapLocation } from '@/lib/maps';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | undefined>();
  
  const { isOpen: isPaymentOpen, onOpen: onPaymentOpen, onClose: onPaymentClose } = useDisclosure();
  
  const bgGradient = useColorModeValue(
    'linear(to-br, brand.50, accent.50)',
    'linear(to-br, gray.900, gray.800)'
  );

  const features = [
    {
      icon: <MapPin size={24} />,
      title: 'Advanced Maps',
      description: 'OLA Maps & Leaflet integration with route optimization',
      color: 'green',
    },
    {
      icon: <CreditCard size={24} />,
      title: 'Multiple Payments',
      description: 'Razorpay, PayTM, PhonePe, and UPI support',
      color: 'blue',
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure Auth',
      description: 'OTP-based authentication with MSG91',
      color: 'purple',
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile Ready',
      description: 'PWA with offline support and push notifications',
      color: 'orange',
    },
  ];

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const handleLocationSelect = (location: MapLocation) => {
    setSelectedLocation(location);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    console.log('Payment successful:', paymentData);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Box minHeight="100vh" bgGradient={bgGradient}>
      <Container maxW="7xl" py={8}>
        <VStack spacing={12}>
          {/* Hero Section */}
          <VStack spacing={6} textAlign="center" py={12}>
            <Heading
              size="2xl"
              bgGradient="linear(to-r, brand.500, accent.500)"
              bgClip="text"
              fontFamily="heading"
            >
              TradeZone Marketplace
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl">
              Full-stack marketplace with advanced maps integration, multiple payment gateways, 
              secure OTP authentication, and mobile-first design.
            </Text>
            <HStack spacing={4}>
              <Button
                size="lg"
                colorScheme="brand"
                onClick={onPaymentOpen}
                leftIcon={<CreditCard size={20} />}
              >
                Test Payment
              </Button>
              <Button
                size="lg"
                variant="outline"
                colorScheme="brand"
              >
                View Demo
              </Button>
            </HStack>
          </VStack>

          {/* Features Grid */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} width="100%">
            {features.map((feature, index) => (
              <Card key={index} height="200px" _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }} transition="all 0.3s">
                <CardBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
                  <Box color={`${feature.color}.500`} mb={4}>
                    {feature.icon}
                  </Box>
                  <Heading size="md" mb={2} fontFamily="heading">
                    {feature.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    {feature.description}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </Grid>

          {/* Authentication Section */}
          {!isAuthenticated && (
            <Card width="100%" maxW="md">
              <CardBody>
                <VStack spacing={4}>
                  <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
                    Authentication Demo
                  </Badge>
                  <OTPLogin onSuccess={handleLoginSuccess} />
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Maps Section */}
          <Card width="100%">
            <CardBody>
              <VStack spacing={4}>
                <HStack justify="space-between" width="100%">
                  <Heading size="lg" fontFamily="heading">
                    Interactive Maps
                  </Heading>
                  <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
                    OLA Maps + Leaflet
                  </Badge>
                </HStack>
                <Box width="100%" height="500px">
                  <MapComponent
                    onLocationSelect={handleLocationSelect}
                    showSearch={true}
                    showControls={true}
                    height="500px"
                  />
                </Box>
                {selectedLocation && (
                  <Text fontSize="sm" color="gray.600">
                    Selected: {selectedLocation.address || `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`}
                  </Text>
                )}
              </VStack>
            </CardBody>
          </Card>

          {/* Technical Specifications */}
          <Card width="100%">
            <CardBody>
              <VStack spacing={6}>
                <Heading size="lg" fontFamily="heading">
                  Technical Specifications
                </Heading>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8} width="100%">
                  <VStack align="start" spacing={3}>
                    <Text fontWeight="semibold" color="brand.500">Maps Integration</Text>
                    <Text fontSize="sm">• OLA Maps API with route optimization</Text>
                    <Text fontSize="sm">• Leaflet Maps with OpenStreetMap</Text>
                    <Text fontSize="sm">• Location search and geocoding</Text>
                    <Text fontSize="sm">• Real-time navigation</Text>
                  </VStack>
                  <VStack align="start" spacing={3}>
                    <Text fontWeight="semibold" color="brand.500">Payment Gateways</Text>
                    <Text fontSize="sm">• Razorpay integration</Text>
                    <Text fontSize="sm">• PayTM wallet support</Text>
                    <Text fontSize="sm">• PhonePe UPI payments</Text>
                    <Text fontSize="sm">• Direct UPI links</Text>
                  </VStack>
                  <VStack align="start" spacing={3}>
                    <Text fontWeight="semibold" color="brand.500">Authentication</Text>
                    <Text fontSize="sm">• MSG91 OTP service</Text>
                    <Text fontSize="sm">• JWT token management</Text>
                    <Text fontSize="sm">• Role-based access control</Text>
                    <Text fontSize="sm">• Secure session handling</Text>
                  </VStack>
                  <VStack align="start" spacing={3}>
                    <Text fontWeight="semibold" color="brand.500">Mobile Features</Text>
                    <Text fontSize="sm">• Progressive Web App (PWA)</Text>
                    <Text fontSize="sm">• Offline functionality</Text>
                    <Text fontSize="sm">• Push notifications</Text>
                    <Text fontSize="sm">• Touch-optimized interface</Text>
                  </VStack>
                </Grid>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>

      {/* Payment Gateway Modal */}
      <PaymentGateway
        amount={1000}
        orderId="test_order_123"
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        isOpen={isPaymentOpen}
        onClose={onPaymentClose}
      />
    </Box>
  );
}