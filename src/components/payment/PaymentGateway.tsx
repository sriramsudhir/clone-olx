'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Card,
  CardBody,
  Badge,
  Divider,
  Grid,
  SimpleGrid,
} from '@chakra-ui/react';
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  QrCode,
  Banknote,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

interface PaymentGatewayProps {
  amount: number;
  orderId: string;
  onSuccess: (paymentData: any) => void;
  onError: (error: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentGateway({
  amount,
  orderId,
  onSuccess,
  onError,
  isOpen,
  onClose,
}: PaymentGatewayProps) {
  const [selectedGateway, setSelectedGateway] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const toast = useToast();

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: <CreditCard size={24} />,
      description: 'Cards, UPI, Net Banking, Wallets',
      color: 'blue',
      category: 'gateway',
      features: ['Instant Refunds', 'Auto Retry', 'Smart Routing'],
    },
    {
      id: 'cashfree',
      name: 'Cashfree',
      icon: <Banknote size={24} />,
      description: 'Complete Payment Solution',
      color: 'green',
      category: 'gateway',
      features: ['Low Fees', 'Fast Settlement', 'Global Cards'],
    },
    {
      id: 'payu',
      name: 'PayU',
      icon: <Shield size={24} />,
      description: 'Secure Payment Gateway',
      color: 'orange',
      category: 'gateway',
      features: ['EMI Options', 'Fraud Protection', 'Multi-currency'],
    },
    {
      id: 'instamojo',
      name: 'Instamojo',
      icon: <Zap size={24} />,
      description: 'Simple & Fast Payments',
      color: 'purple',
      category: 'gateway',
      features: ['No Setup Fee', 'Quick Integration', 'Mobile Optimized'],
    },
    {
      id: 'justpay',
      name: 'JustPay',
      icon: <Globe size={24} />,
      description: 'Next-Gen Payment Platform',
      color: 'teal',
      category: 'gateway',
      features: ['AI-Powered', 'Real-time Analytics', 'Custom Checkout'],
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: <Smartphone size={24} />,
      description: 'UPI & Digital Payments',
      color: 'purple',
      category: 'upi',
      features: ['Instant Transfer', 'QR Payments', 'Merchant Solutions'],
    },
    {
      id: 'paytm',
      name: 'PayTM',
      icon: <Wallet size={24} />,
      description: 'Wallet & UPI Payments',
      color: 'blue',
      category: 'wallet',
      features: ['Cashback Offers', 'Bill Payments', 'Recharge'],
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: <QrCode size={24} />,
      description: 'Pay with Google',
      color: 'red',
      category: 'upi',
      features: ['Secure', 'Fast', 'Rewards'],
    },
    {
      id: 'upi',
      name: 'UPI Direct',
      icon: <QrCode size={24} />,
      description: 'Pay with any UPI app',
      color: 'green',
      category: 'upi',
      features: ['Universal', 'Instant', 'Free'],
    },
  ];

  const handlePayment = async (gateway: string) => {
    setIsProcessing(true);
    setSelectedGateway(gateway);

    try {
      switch (gateway) {
        case 'razorpay':
          await processRazorpayPayment();
          break;
        case 'cashfree':
          await processCashfreePayment();
          break;
        case 'payu':
          await processPayUPayment();
          break;
        case 'instamojo':
          await processInstamojoPayment();
          break;
        case 'justpay':
          await processJustPayPayment();
          break;
        case 'phonepe':
          await processPhonePePayment();
          break;
        case 'paytm':
          await processPayTMPayment();
          break;
        case 'googlepay':
          await processGooglePayPayment();
          break;
        case 'upi':
          await processUPIPayment();
          break;
        default:
          throw new Error('Invalid payment gateway');
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
      setSelectedGateway('');
    }
  };

  const processRazorpayPayment = async () => {
    const response = await fetch('/api/payment/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId }),
    });

    const orderData = await response.json();

    if (!orderData.success) {
      throw new Error(orderData.error);
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'TradeZone',
      description: 'Payment for order',
      order_id: orderData.orderId,
      handler: async (response: any) => {
        const verifyResponse = await fetch('/api/payment/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderData.orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }),
        });

        const verifyData = await verifyResponse.json();

        if (verifyData.success) {
          onSuccess(response);
          onClose();
        } else {
          throw new Error('Payment verification failed');
        }
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#63B5FF',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const processCashfreePayment = async () => {
    const response = await fetch('/api/payment/cashfree/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId }),
    });

    const orderData = await response.json();

    if (!orderData.success) {
      throw new Error(orderData.error);
    }

    // Redirect to Cashfree payment page
    window.location.href = `https://sandbox.cashfree.com/pg/view/order/${orderData.orderToken}`;
  };

  const processPayUPayment = async () => {
    const response = await fetch('/api/payment/payu/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId }),
    });

    const orderData = await response.json();

    if (!orderData.success) {
      throw new Error(orderData.error);
    }

    // Create form and submit to PayU
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://test.payu.in/_payment';

    Object.entries(orderData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const processInstamojoPayment = async () => {
    const response = await fetch('/api/payment/instamojo/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId }),
    });

    const orderData = await response.json();

    if (!orderData.success) {
      throw new Error(orderData.error);
    }

    // Redirect to Instamojo payment page
    window.location.href = orderData.longurl;
  };

  const processJustPayPayment = async () => {
    const response = await fetch('/api/payment/justpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId }),
    });

    const orderData = await response.json();

    if (!orderData.success) {
      throw new Error(orderData.error);
    }

    // Redirect to JustPay payment page
    window.location.href = orderData.paymentUrl;
  };

  const processPhonePePayment = async () => {
    const response = await fetch('/api/payment/phonepe/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId }),
    });

    const orderData = await response.json();

    if (!orderData.success) {
      throw new Error(orderData.error);
    }

    // Redirect to PhonePe payment page
    window.location.href = orderData.paymentUrl;
  };

  const processPayTMPayment = async () => {
    const response = await fetch('/api/payment/paytm/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId }),
    });

    const orderData = await response.json();

    if (!orderData.success) {
      throw new Error(orderData.error);
    }

    // Create form and submit to PayTM
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://securegw-stage.paytm.in/order/process';

    Object.entries(orderData.params).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const processGooglePayPayment = async () => {
    const response = await fetch('/api/payment/googlepay/create-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId }),
    });

    const linkData = await response.json();

    if (!linkData.success) {
      throw new Error(linkData.error);
    }

    // Open Google Pay app
    window.location.href = linkData.googlePayLink;
  };

  const processUPIPayment = async () => {
    const response = await fetch('/api/payment/upi/create-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId }),
    });

    const linkData = await response.json();

    if (!linkData.success) {
      throw new Error(linkData.error);
    }

    // Open UPI app
    window.location.href = linkData.upiLink;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'gateway': return 'blue';
      case 'upi': return 'green';
      case 'wallet': return 'purple';
      default: return 'gray';
    }
  };

  const groupedMethods = paymentMethods.reduce((acc, method) => {
    if (!acc[method.category]) {
      acc[method.category] = [];
    }
    acc[method.category].push(method);
    return acc;
  }, {} as Record<string, typeof paymentMethods>);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent maxH="90vh" overflowY="auto">
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <Text fontSize="xl" fontWeight="bold">Choose Payment Method</Text>
            <HStack>
              <Text fontSize="lg" color="brand.500" fontWeight="semibold">
                ₹{amount.toLocaleString()}
              </Text>
              <Badge colorScheme="green" fontSize="xs">
                Secure Payment
              </Badge>
            </HStack>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody pb={6}>
          <VStack spacing={6}>
            {Object.entries(groupedMethods).map(([category, methods]) => (
              <Box key={category} width="100%">
                <HStack mb={4}>
                  <Text fontSize="md" fontWeight="semibold" textTransform="capitalize">
                    {category === 'gateway' ? 'Payment Gateways' : 
                     category === 'upi' ? 'UPI Payments' : 
                     category === 'wallet' ? 'Digital Wallets' : category}
                  </Text>
                  <Badge colorScheme={getCategoryColor(category)} size="sm">
                    {methods.length} options
                  </Badge>
                </HStack>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {methods.map((method) => (
                    <Card
                      key={method.id}
                      cursor="pointer"
                      onClick={() => handlePayment(method.id)}
                      _hover={{ 
                        boxShadow: 'lg', 
                        transform: 'translateY(-2px)',
                        borderColor: `${method.color}.300`
                      }}
                      transition="all 0.2s"
                      opacity={isProcessing && selectedGateway !== method.id ? 0.5 : 1}
                      border="2px solid"
                      borderColor="transparent"
                    >
                      <CardBody p={4}>
                        <VStack align="start" spacing={3}>
                          <HStack justify="space-between" width="100%">
                            <HStack spacing={3}>
                              <Box color={`${method.color}.500`} p={2} bg={`${method.color}.50`} borderRadius="md">
                                {method.icon}
                              </Box>
                              <VStack align="start" spacing={1}>
                                <Text fontWeight="semibold" fontSize="md">
                                  {method.name}
                                </Text>
                                <Text fontSize="xs" color="gray.600">
                                  {method.description}
                                </Text>
                              </VStack>
                            </HStack>
                            
                            {isProcessing && selectedGateway === method.id && (
                              <Badge colorScheme="blue" size="sm">Processing...</Badge>
                            )}
                          </HStack>
                          
                          <HStack spacing={1} flexWrap="wrap">
                            {method.features.map((feature, index) => (
                              <Badge key={index} variant="outline" size="xs" colorScheme={method.color}>
                                {feature}
                              </Badge>
                            ))}
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </Box>
            ))}
          </VStack>

          <Divider my={6} />

          <VStack spacing={3}>
            <HStack spacing={4} justify="center">
              <Badge colorScheme="green" p={2}>
                <HStack spacing={1}>
                  <Shield size={12} />
                  <Text fontSize="xs">256-bit SSL</Text>
                </HStack>
              </Badge>
              <Badge colorScheme="blue" p={2}>
                <HStack spacing={1}>
                  <CreditCard size={12} />
                  <Text fontSize="xs">PCI DSS Compliant</Text>
                </HStack>
              </Badge>
              <Badge colorScheme="purple" p={2}>
                <HStack spacing={1}>
                  <Zap size={12} />
                  <Text fontSize="xs">Instant Processing</Text>
                </HStack>
              </Badge>
            </HStack>
            
            <Text fontSize="xs" color="gray.500" textAlign="center">
              Your payment information is encrypted and secure. We never store your card details.
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}