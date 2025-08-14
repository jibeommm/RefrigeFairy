// src/utils/expiryUtils/expiryUtils.ts
import type { Food } from "../../types/food";

export type BadgeTone = "ok" | "warning" | "danger" | "dark";

type ColorType = "red" | "orange" | "white" | "black";

const COLOR_TO_TONE: Record<ColorType, BadgeTone> = {
  red: "danger",
  orange: "warning",
  white: "ok",
  black: "dark",
};

export type ExpirySettings = {
  warningDays: number;
  dangerDays: number;
};

export function getDDay(
  endDate: string,
  settings: ExpirySettings
): { label: string; color: ColorType; days: number } {
  if (!endDate) return { label: "정보 없음", color: "white", days: 0 };

  const { warningDays, dangerDays } = settings;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expireDate = new Date(endDate);
  expireDate.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil(
    (expireDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays > 0) {
    if (diffDays <= dangerDays) return { label: `D-${diffDays}`, color: "red", days: diffDays };
    if (diffDays <= warningDays) return { label: `D-${diffDays}`, color: "orange", days: diffDays };
    return { label: `D-${diffDays}`, color: "white", days: diffDays };
  } else if (diffDays === 0) {
    return { label: "D-Day", color: "red", days: 0 };
  } else {
    return { label: `D+${Math.abs(diffDays)}`, color: "black", days: diffDays };
  }
}

export const getExpiryTone = (food: Food, settings: ExpirySettings): BadgeTone => {
  const { color } = getDDay(food.endDate, settings);
  return COLOR_TO_TONE[color];
};
