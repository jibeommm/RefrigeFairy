// src/utils/quantityUtils/quantityUtils.ts
import type { Food } from "../../types/food";

export type BadgeTone = "ok" | "warning" | "danger";

type ColorType = "red" | "orange" | "white";

const COLOR_TO_TONE: Record<ColorType, BadgeTone> = {
  red: "danger",
  orange: "warning",
  white: "ok",
};

export type QuantitySettings = {
  dangerPercent: number;
  warningPercent: number;
};

export const getQuantityPercent = (
  food: Food,
  settings: QuantitySettings
): { percent: number; color: ColorType } => {
  if (!food.originalQuantity) {
    return { percent: 0, color: "white" };
  }

  const percent = Math.round(((food.quantity ?? 0) / food.originalQuantity) * 100);

  if (percent <= settings.dangerPercent) return { percent, color: "red" };
  if (percent <= settings.warningPercent) return { percent, color: "orange" };
  return { percent, color: "white" };
};

export const getQuantityTone = (food: Food, settings: QuantitySettings): BadgeTone => {
  const { color } = getQuantityPercent(food, settings);
  return COLOR_TO_TONE[color];
};

export const adjustQuantity = (current: number, delta: number): number =>
  Math.max(0, current + delta);

export const validateQuantity = (value: string | number): number =>
  Math.max(0, Number(value || 0));
