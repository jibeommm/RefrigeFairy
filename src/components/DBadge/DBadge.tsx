// src/components/DBadge/DBadge.tsx
import "./DBadge.css";
import type { Food } from "../../types/food";
import { getDDay, getExpiryTone } from "../../utils/expiryUtils/expiryUtils";
import type { BadgeTone, ExpirySettings } from "../../utils/expiryUtils/expiryUtils";

export type { BadgeTone, ExpirySettings };

interface DBadgeProps {
  food: Food;
  settings: ExpirySettings;
}

export default function DBadge({ food, settings }: DBadgeProps) {
  const dDayInfo = food.endDate ? getDDay(food.endDate, settings) : { label: "정보 없음", color: "white", days: 0 };
  const expiryTone: BadgeTone = getExpiryTone(food, settings);

  return <div className={`d-badge ${expiryTone}`}>{dDayInfo.label}</div>;
}
