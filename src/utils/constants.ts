// /src/utils/constants.ts
import type { StorageType } from "../types/food";

export const UNIT_VALUES = ["개", "개입", "g", "kg", "ml", "L", "봉지", "병", "캔"] as const;

export const UNIT_OPTIONS = UNIT_VALUES.map(unit => ({
  value: unit,
  label: unit
}));

export const STORAGE_VALUES: StorageType[] = ["냉동", "냉장", "실온", "정보 없음"];

export const STORAGE_OPTIONS = STORAGE_VALUES.map(storage => ({
  value: storage,
  label: storage
}));

export const DEFAULT_STORAGE: StorageType = "정보 없음";

export const toStorageType = (v?: string): StorageType | undefined =>
  STORAGE_VALUES.includes(v as StorageType) ? v as StorageType : undefined;
