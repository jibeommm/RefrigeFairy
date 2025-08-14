/* src/hooks/useNotifications.ts */
import { useMemo } from "react";
import { useSettings } from "../hooks/useSettings";
import { useFoodStore } from "../stores/foodStore";
import { getExpiryTone } from "../utils/expiryUtils/expiryUtils";
import { getQuantityTone } from "../utils/quantityUtils/quantityUtils";
import type { Food } from "../types/food";
import type { ExpirySettings } from "../utils/expiryUtils/expiryUtils";
import type { QuantitySettings } from "../utils/quantityUtils/quantityUtils";

export function useNotifications() {
  const settings = useSettings();
  const { foods } = useFoodStore();

  const { expiryWarnings, quantityWarnings, totalAlerts } = useMemo(() => {
    const expiryWarnings: Food[] = [];
    const quantityWarnings: Food[] = [];

    const expirySettings: ExpirySettings = settings.expirySettings;
    const quantitySettings: QuantitySettings = settings.quantitySettings;

    foods.forEach((f) => {
      const expiryTone = getExpiryTone(f, expirySettings);
      const quantityTone = getQuantityTone(f, quantitySettings);

      if (expiryTone === "danger" || expiryTone === "warning" || expiryTone === "dark") {
        expiryWarnings.push(f);
      }
      if (quantityTone === "danger" || quantityTone === "warning") {
        quantityWarnings.push(f);
      }
    });

    return {
      expiryWarnings,
      quantityWarnings,
      totalAlerts: expiryWarnings.length + quantityWarnings.length,
    };
  }, [foods, settings.expirySettings, settings.quantitySettings]);

  return { expiryWarnings, quantityWarnings, totalAlerts };
}
