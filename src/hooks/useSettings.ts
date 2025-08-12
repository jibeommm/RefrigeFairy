// src/hooks/useSettings.ts
import { useState, useEffect } from 'react';

export interface AppSettings {
  warningDays: number;      
  dangerDays: number;         
  quantityWarningPercent: number; 
  quantityDangerPercent: number;  
  enableNotifications: boolean;    
}

export function useSettings(): AppSettings {
  const [settings, setSettings] = useState<AppSettings>(() => ({
    warningDays: Number(localStorage.getItem('expiry-warning-days')) || 7,
    dangerDays: Number(localStorage.getItem('expiry-danger-days')) || 3,
    quantityWarningPercent: Number(localStorage.getItem('quantity-warning-percent')) || 20,
    quantityDangerPercent: Number(localStorage.getItem('quantity-danger-percent')) || 10,
    enableNotifications: localStorage.getItem('expiry-notifications') !== 'false'
  }));

  useEffect(() => {
    const loadSettings = () => {
      setSettings({
        warningDays: Number(localStorage.getItem('expiry-warning-days')) || 7,
        dangerDays: Number(localStorage.getItem('expiry-danger-days')) || 3,
        quantityWarningPercent: Number(localStorage.getItem('quantity-warning-percent')) || 20,
        quantityDangerPercent: Number(localStorage.getItem('quantity-danger-percent')) || 10,
        enableNotifications: localStorage.getItem('expiry-notifications') !== 'false'
      });
    };

    window.addEventListener('expiry-settings-changed', loadSettings);
    return () => {
      window.removeEventListener('expiry-settings-changed', loadSettings);
    };
  }, []);

  return settings;
}
