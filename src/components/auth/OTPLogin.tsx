'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  PinInput,
  PinInputField,
  HStack,
  Heading,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { Phone, Shield } from 'lucide-react';

interface OTPLoginProps {
  onSuccess: (token: string) => void;
}

export default function OTPLogin({ onSuccess }: OTPLoginProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  const toast = useToast();

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid 10-digit phone number',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (data.success) {
        setStep('otp');
        setOtpSent(true);
        toast({
          title: 'OTP sent successfully',
          description: 'Please check your phone for the verification code',
          status: 'success',
          duration: 3000,
        });
      } else {
        toast({
          title: 'Failed to send OTP',
          description: data.message || 'Please try again',
          status: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: 'Network error',
        description: 'Please check your connection and try again',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter the complete 6-digit OTP',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess(data.token);
        toast({
          title: 'Login successful',
          description: 'Welcome to TradeZone!',
          status: 'success',
          duration: 3000,
        });
      } else {
        toast({
          title: 'Invalid OTP',
          description: data.message || 'Please check your OTP and try again',
          status: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: 'Verification failed',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    await handleSendOTP();
  };

  return (
    <Box maxWidth="400px" mx="auto" mt={8}>
      <Card>
        <CardBody>
          <VStack spacing={6}>
            <Box textAlign="center">
              <Heading size="lg" mb={2}>
                {step === 'phone' ? 'Login with Phone' : 'Verify OTP'}
              </Heading>
              <Text color="gray.600">
                {step === 'phone' 
                  ? 'Enter your phone number to receive an OTP'
                  : `We've sent a 6-digit code to ${phone}`
                }
              </Text>
            </Box>

            {step === 'phone' ? (
              <VStack spacing={4} width="100%">
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    leftElement={<Phone size={16} />}
                  />
                </FormControl>
                
                <Button
                  colorScheme="brand"
                  size="lg"
                  width="100%"
                  onClick={handleSendOTP}
                  isLoading={isLoading}
                  loadingText="Sending OTP..."
                >
                  Send OTP
                </Button>
              </VStack>
            ) : (
              <VStack spacing={4} width="100%">
                <FormControl>
                  <FormLabel textAlign="center">Enter OTP</FormLabel>
                  <HStack justify="center">
                    <PinInput
                      value={otp}
                      onChange={setOtp}
                      size="lg"
                      placeholder=""
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </FormControl>

                <VStack spacing={3} width="100%">
                  <Button
                    colorScheme="brand"
                    size="lg"
                    width="100%"
                    onClick={handleVerifyOTP}
                    isLoading={isLoading}
                    loadingText="Verifying..."
                    leftIcon={<Shield size={16} />}
                  >
                    Verify OTP
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResendOTP}
                    isDisabled={isLoading}
                  >
                    Resend OTP
                  </Button>

                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setStep('phone')}
                  >
                    Change phone number
                  </Button>
                </VStack>
              </VStack>
            )}
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}