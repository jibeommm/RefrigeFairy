// src/components/QPercent/QPercent.tsx
import "./QPercent.css";
import type { Food } from "../../types/food";
import { getQuantityTone, getQuantityPercent } from "../../utils/quantityUtils/quantityUtils";
import type { BadgeTone, QuantitySettings } from "../../utils/quantityUtils/quantityUtils";
import { CircularProgressbar } from "react-circular-progressbar";

export type { BadgeTone, QuantitySettings };

interface QPercentProps {
  food: Food;
  settings: QuantitySettings;
}

export default function QPercent({ food, settings }: QPercentProps) {
  const { percent } = getQuantityPercent(food, settings);
  const quantityTone: BadgeTone = getQuantityTone(food, settings);

  return (
    <div className={`q-percent-badge ${quantityTone}`}>
      <CircularProgressbar value={percent} />
    </div>
  );
}
