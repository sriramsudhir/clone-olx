"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { usePWA } from '@/hooks/use-pwa';

export default function PWAInstallPrompt() {
  const { isInstallable, installApp } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isDismissed) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm shadow-lg border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Smartphone className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-sm">Install TradeZone</CardTitle>
              <CardDescription className="text-xs">
                Get the app for a better experience
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsDismissed(true)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex space-x-2">
          <Button onClick={installApp} size="sm" className="flex-1">
            <Download className="mr-2 h-3 w-3" />
            Install
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDismissed(true)}
          >
            Later
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}