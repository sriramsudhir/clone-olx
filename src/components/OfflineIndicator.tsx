"use client";

import { useOnline } from '@/hooks/use-online';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff, Wifi } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function OfflineIndicator() {
  const isOnline = useOnline();
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    if (isOnline && showOnlineMessage) {
      const timer = setTimeout(() => setShowOnlineMessage(false), 3000);
      return () => clearTimeout(timer);
    } else if (isOnline) {
      setShowOnlineMessage(true);
    }
  }, [isOnline, showOnlineMessage]);

  if (isOnline && !showOnlineMessage) return null;

  return (
    <div className="fixed top-16 left-4 right-4 z-50 mx-auto max-w-sm">
      <Alert className={isOnline ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}>
        {isOnline ? (
          <Wifi className="h-4 w-4 text-green-600" />
        ) : (
          <WifiOff className="h-4 w-4 text-orange-600" />
        )}
        <AlertDescription className={isOnline ? 'text-green-800' : 'text-orange-800'}>
          {isOnline ? 'Back online!' : 'You are offline. Some features may be limited.'}
        </AlertDescription>
      </Alert>
    </div>
  );
}