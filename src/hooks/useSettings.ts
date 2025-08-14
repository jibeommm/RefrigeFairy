// src/hooks/useSettings.ts
import { useState, useEffect } from "react";

export interface AppSettings {
  expirySettings: {
    warningDays: number;
    dangerDays: number;
  };
  quantitySettings: {
    warningPercent: number;
    dangerPercent: number;
  };
}

export function useSettings(): AppSettings {
  const [settings, setSettings] = useState<AppSettings>(() => ({
    expirySettings: {
      warningDays: Number(localStorage.getItem("expiry-warning-days")) || 7,
      dangerDays: Number(localStorage.getItem("expiry-danger-days")) || 3,
    },
    quantitySettings: {
      warningPercent: Number(localStorage.getItem("quantity-warning-percent")) || 20,
      dangerPercent: Number(localStorage.getItem("quantity-danger-percent")) || 10,
    },
  }));

  useEffect(() => {
    const loadSettings = () => {
      setSettings({
        expirySettings: {
          warningDays: Number(localStorage.getItem("expiry-warning-days")) || 7,
          dangerDays: Number(localStorage.getItem("expiry-danger-days")) || 3,
        },
        quantitySettings: {
          warningPercent: Number(localStorage.getItem("quantity-warning-percent")) || 20,
          dangerPercent: Number(localStorage.getItem("quantity-danger-percent")) || 10,
        },
      });
    };

    window.addEventListener("expiry-settings-changed", loadSettings);
    return () => {
      window.removeEventListener("expiry-settings-changed", loadSettings);
    };
  }, []);

  return settings;
}
