// src/hooks/useExpirySettings.ts

import { useState, useEffect } from 'react';

export interface ExpirySettings {
  warningDays: number;
  dangerDays: number;
  enableNotifications: boolean;
}

export function useExpirySettings(): ExpirySettings {
  const [settings, setSettings] = useState<ExpirySettings>(() => {
    const warningDays = localStorage.getItem('expiry-warning-days');
    const dangerDays = localStorage.getItem('expiry-danger-days');
    const notifications = localStorage.getItem('expiry-notifications');

    return {
      warningDays: warningDays ? Number(warningDays) : 7,
      dangerDays: dangerDays ? Number(dangerDays) : 3,
      enableNotifications: notifications ? notifications === 'true' : true
    };
  });

  useEffect(() => {
    const loadSettings = () => {
      const warningDays = localStorage.getItem('expiry-warning-days');
      const dangerDays = localStorage.getItem('expiry-danger-days');
      const notifications = localStorage.getItem('expiry-notifications');

      setSettings({
        warningDays: warningDays ? Number(warningDays) : 7,
        dangerDays: dangerDays ? Number(dangerDays) : 3,
        enableNotifications: notifications ? notifications === 'true' : true
      });
    };

    const handleChange = () => loadSettings();
    window.addEventListener('expiry-settings-changed', handleChange);

    return () => {
      window.removeEventListener('expiry-settings-changed', handleChange);
    };
  }, []);

  return settings;
}
