// src/pages/StoragePage/helpers.ts
import { calculateDDay } from '../../utils/calculateDDay';
import type { BadgeTone } from '../../components/DBadge/DBadge';
import type { Food } from '../../types/food';
import type { AppSettings } from '../../hooks/useSettings';

export type FilterTab = "모두" | "냉동실" | "냉장실" | "실온";

export function dBadge(endDate: string, settings: AppSettings) {
  const { label, color } = calculateDDay(endDate, settings);

  let text = label;
  if (label.startsWith('D-') && label !== 'D-Day') {
    text = `${label.replace('D-', '')}일 남음`;
  } else if (label === 'D-Day') {
    text = '오늘';
  }

  const colorToTone: Record<"red" | "orange" | "white" | "black", BadgeTone> = {
    red: "danger",
    orange: "warning",
    white: "ok",
    black: "dark"
  };

  return { text, tone: colorToTone[color] };
}

export function groupByStorage(list: Food[]) {
  const grouped: Record<"냉동" | "냉장" | "실온", Food[]> = { 냉동: [], 냉장: [], 실온: [] };

  list.forEach((item) => {
    if (item.storageType === '냉동') {
      grouped["냉동"].push(item);
    } else if (item.storageType === '냉장') {
      grouped["냉장"].push(item);
    } else {
      grouped["실온"].push(item);
    }
  });

  return grouped;
}
