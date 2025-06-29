"use client";

import { useState, useEffect } from 'react';

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSupported('Notification' in window);
      if ('Notification' in window) {
        setPermission(Notification.permission);
      }
    }
  }, []);

  const requestPermission = async () => {
    if (!isSupported || typeof window === 'undefined') return false;

    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (permission !== 'granted' || typeof window === 'undefined') return;

    const notification = new Notification(title, {
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      ...options,
    });

    return notification;
  };

  const subscribeToNotifications = async () => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to notifications:', error);
      return null;
    }
  };

  return {
    permission,
    isSupported,
    requestPermission,
    showNotification,
    subscribeToNotifications,
  };
}