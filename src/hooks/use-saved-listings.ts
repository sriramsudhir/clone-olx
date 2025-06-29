"use client";

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';

const SAVED_LISTINGS_KEY = 'savedListings';

export function useSavedListings() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const item = window.localStorage.getItem(SAVED_LISTINGS_KEY);
      if (item) {
        setSavedIds(new Set(JSON.parse(item)));
      }
    } catch (error) {
      console.error("Failed to read saved listings from localStorage", error);
      setSavedIds(new Set());
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isInitialized) {
        try {
            window.localStorage.setItem(SAVED_LISTINGS_KEY, JSON.stringify(Array.from(savedIds)));
        } catch (error) {
            console.error("Failed to save listings to localStorage", error);
        }
    }
  }, [savedIds, isInitialized]);

  const toggleSave = useCallback((listingId: string, listingTitle: string) => {
    setSavedIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(listingId)) {
        newIds.delete(listingId);
        toast({ title: "Removed from Saved", description: `"${listingTitle}" has been removed.` });
      } else {
        newIds.add(listingId);
        toast({ title: "Item Saved!", description: `"${listingTitle}" has been saved.` });
      }
      return newIds;
    });
  }, [toast]);

  const isSaved = useCallback((listingId: string) => {
    return savedIds.has(listingId);
  }, [savedIds]);
  
  const savedIdsArray = Array.from(savedIds);

  return { savedIds: savedIdsArray, toggleSave, isSaved, isLoading: !isInitialized };
}