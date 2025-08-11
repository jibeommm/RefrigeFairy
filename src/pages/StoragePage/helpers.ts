// src/pages/StoragePage/helpers.ts
import type { Food } from "../../types/food";

export type FilterTab = "모두" | "냉동실" | "냉장실" | "실온";

export function daysLeft(endDate: string) {
  const end = new Date(endDate);
  const today = new Date();
  return Math.ceil((end.getTime() - +today) / (1000 * 60 * 60 * 24));
}

export function dBadge(endDate: string) {
  if (!endDate) return { text: "정보 없음", tone: "neutral" as const };
  const d = daysLeft(endDate);
  if (d > 0) {
    if (d <= 3) return { text: `${d}일 남음`, tone: "danger" as const };
    if (d <= 7) return { text: `${d}일 남음`, tone: "warning" as const };
    return { text: `D-${d}`, tone: "ok" as const };
  }
  if (d === 0) return { text: "오늘", tone: "danger" as const };
  return { text: `D+${Math.abs(d)}`, tone: "dark" as const };
}

export function groupByStorage(list: Food[]) {
  const g: Record<"냉동" | "냉장" | "실온", Food[]> = { 냉동: [], 냉장: [], 실온: [] };
  list.forEach((f) => {
    const key = f.storageType === "냉동" ? "냉동" : f.storageType === "냉장" ? "냉장" : "실온";
    g[key].push(f);
  });
  return g;
}
