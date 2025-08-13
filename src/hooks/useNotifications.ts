// src/hooks/useNotifications.ts
import { useSettings } from "../hooks/useSettings";
import { useFoodStore } from "../stores/foodStore";
import { dBadge } from "../pages/StoragePage/helpers";
import { getQtyTone, getQtyPercent } from "../utils/quantityUtils";
import type { Food } from "../types/food";

export function useNotifications() {
  const settings = useSettings();
  const { foods } = useFoodStore();

  const expiryWarnings: Food[] = [];
  const qtyWarnings: Food[] = [];

  foods.forEach((f) => {
    const { tone } = dBadge(f.endDate, settings);
    const qtyTone = getQtyTone(f, settings);

    if (tone === "danger" || tone === "warning" || tone === "dark") {
      expiryWarnings.push(f);
    }
    if (qtyTone === "danger" || qtyTone === "warning") {
      qtyWarnings.push(f);
    }
  });

  const totalAlerts = expiryWarnings.length + qtyWarnings.length;

  return { expiryWarnings, qtyWarnings, totalAlerts, getQtyTone, getQtyPercent };
}
