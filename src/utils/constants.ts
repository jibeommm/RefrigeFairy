// src/utils/constants.ts

import type { StorageType } from "../types/food";

export const UNIT_OPTIONS = ["개", "개입", "g", "kg", "ml", "L", "봉지", "병", "캔"] as const;

export const DEFAULT_STORAGE: StorageType = "정보 없음";

export const toStorageType = (v?: string): StorageType | undefined =>
  v === "냉장" || v === "냉동" || v === "실온" || v === "정보 없음" ? v : undefined;

export const daysLeftText = {
  ok: "안전",
  warning: "주의",
  danger: "위험",
  neutral: "정보 없음",
  dark: "지난 날짜"
};
