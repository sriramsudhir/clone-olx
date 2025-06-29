'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  
  const bgGradient = useColorModeValue(
    'linear(to-br, brand.500, accent.500)',
    'linear(to-br, brand.600, accent.600)'
  );

  const loadingSteps = [
    { text: 'Initializing...', duration: 800 },
    { text: 'Loading components...', duration: 600 },
    { text: 'Setting up maps...', duration: 700 },
    { text: 'Preparing payment gateways...', duration: 500 },
    { text: 'Almost ready...', duration: 400 },
  ];

  useEffect(() => {
    let currentStep = 0;
    let currentProgress = 0;

    const runLoadingSequence = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);

        const targetProgress = ((currentStep + 1) / loadingSteps.length) * 100;
        const progressIncrement = (targetProgress - currentProgress) / (step.duration / 50);

        const progressInterval = setInterval(() => {
          currentProgress += progressIncrement;
          setProgress(Math.min(currentProgress, targetProgress));

          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            currentStep++;
            
            setTimeout(() => {
              if (currentStep < loadingSteps.length) {
                runLoadingSequence();
              } else {
                setTimeout(onComplete, 500);
              }
            }, 200);
          }
        }, 50);
      }
    };

    const timer = setTimeout(runLoadingSequence, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgGradient={bgGradient}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
    >
      <VStack spacing={8} textAlign="center" color="white">
        {/* Logo Animation */}
        <MotionBox
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Box
            width="120px"
            height="120px"
            bg="white"
            borderRadius="2xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="2xl"
            animation={`${pulseAnimation} 2s infinite`}
          >
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color="brand.500"
              fontFamily="heading"
            >
              TZ
            </Text>
          </Box>
        </MotionBox>

        {/* App Name */}
        <MotionText
          fontSize="4xl"
          fontWeight="bold"
          fontFamily="heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          TradeZone
        </MotionText>

        {/* Tagline */}
        <MotionText
          fontSize="lg"
          opacity={0.9}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Your Marketplace, Simplified
        </MotionText>

        {/* Loading Progress */}
        <MotionBox
          width="300px"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <VStack spacing={4}>
            <Progress
              value={progress}
              size="lg"
              colorScheme="whiteAlpha"
              bg="whiteAlpha.300"
              borderRadius="full"
              width="100%"
            />
            
            <Text fontSize="sm" opacity={0.8}>
              {loadingText}
            </Text>
          </VStack>
        </MotionBox>

        {/* Features Preview */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <VStack spacing={2}>
            <Text fontSize="sm" opacity={0.7}>
              ✨ Advanced Maps Integration
            </Text>
            <Text fontSize="sm" opacity={0.7}>
              💳 Multiple Payment Gateways
            </Text>
            <Text fontSize="sm" opacity={0.7}>
              🔐 Secure OTP Authentication
            </Text>
          </VStack>
        </MotionBox>
      </VStack>
    </Box>
  );
}