
'use client';

import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export function useOnlineStatus() {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Set the initial status
    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
      setIsOnline(window.navigator.onLine);
    }

    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: 'You are back online!',
        description: 'Your connection has been restored.',
        variant: 'success',
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: 'You are offline',
        description: 'Please check your internet connection. Some features may be unavailable.',
        variant: 'destructive',
        duration: Infinity, // Keep the toast until the user is back online
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  return isOnline;
}
