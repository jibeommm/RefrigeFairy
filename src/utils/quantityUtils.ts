// /src/utils/quantityUtils.ts
import type { Food } from "../types/food";
import type { AppSettings } from "../hooks/useSettings";

export const getQtyPercent = (food: Food): number => {
  if (!food.originalQuantity) return 0;
  return Math.round(((food.quantity ?? 0) / food.originalQuantity) * 100);
};

export const getQtyTone = (food: Food, settings: AppSettings) => {
  if (!food.originalQuantity) return "ok";
  const percent = getQtyPercent(food);
  if (percent <= settings.quantityDangerPercent) return "danger";
  if (percent <= settings.quantityWarningPercent) return "warning";
  return "ok";
};

export const adjustQuantity = (current: number, delta: number): number => {
  return Math.max(0, current + delta);
};

export const validateQuantity = (value: string | number): number => {
  return Math.max(0, Number(value || 0));
};
