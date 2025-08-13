// src/hooks/useNotifications.ts

import { useSettings } from "../hooks/useSettings";
import { useFoodStore } from "../stores/foodStore";
import { dBadge } from "../pages/StoragePage/helpers";
import type { Food } from "../types/food";

export function useNotifications() {
  const settings = useSettings();
  const { foods } = useFoodStore();

  const getQtyTone = (f: Food) => {
    if (!f.originalQuantity) return "ok";
    const percent = ((f.quantity ?? 0) / f.originalQuantity) * 100;
    if (percent <= settings.quantityDangerPercent) return "danger";
    if (percent <= settings.quantityWarningPercent) return "warning";
    return "ok";
  };

  const expiryWarnings: Food[] = [];
  const qtyWarnings: Food[] = [];

  foods.forEach((f) => {
    const { tone } = dBadge(f.endDate, settings);
    const qtyTone = getQtyTone(f);

    if (tone === "danger" || tone === "warning" || tone === "dark") {
      expiryWarnings.push(f);
    }
    if (qtyTone === "danger" || qtyTone === "warning") {
      qtyWarnings.push(f);
    }
  });

  const totalAlerts = expiryWarnings.length + qtyWarnings.length;

  const getQtyPercent = (f: Food) => {
    if (!f.originalQuantity) return 0;
    return Math.round(((f.quantity ?? 0) / f.originalQuantity) * 100);
  };


  return { expiryWarnings, qtyWarnings, totalAlerts, getQtyTone, getQtyPercent};
}
