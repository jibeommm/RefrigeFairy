// src/pages/StoragePage/components/ItemCard.tsx

import QtyControl from "../../../components/QtyControl";
import DBadge from "../../../components/DBadge/DBadge";
import type { Food } from "../../../types/food";
import { dBadge } from "../helpers";
import type { BadgeTone } from "../../../components/DBadge/DBadge";
import { useSettings } from "../../../hooks/useSettings";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "../../../css/circularProgressStyles.css";

type Props = {
  food: Food;
  onClick: () => void;
  onMinus: (id: string, current?: number) => void;
  onPlus: (id: string, current?: number) => void;
  left?: { text: string; tone: BadgeTone };
};

export default function ItemCard({ food, onClick, onMinus, onPlus }: Props) {
  const settings = useSettings();

  const dateBadge = dBadge(food.endDate, settings);

  const percent = food.originalQuantity
    ? Math.round(((food.quantity ?? 0) / food.originalQuantity) * 100)
    : 100;

  let qtyTone: BadgeTone = "ok";
  if (percent <= settings.quantityDangerPercent) qtyTone = "danger";
  else if (percent <= settings.quantityWarningPercent) qtyTone = "warning";

  return (
    <div className="item-card" onClick={onClick}>
      <div className="item-left">
        <div className="item-name">{food.name}</div>
        <div className="item-manufacturer">
          {food.manufacturer || food.cmpnyName}
        </div>
      </div>

      <div className="item-right">
        <div className="item-qty">
          <div
            className={`item-qty-progress quantity-ring ${qtyTone}`}
          >
            <CircularProgressbar value={percent} />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <QtyControl
              value={food.quantity ?? 0}
              onDecrease={() => onMinus(food.id, food.quantity)}
              onIncrease={() => onPlus(food.id, food.quantity)}
            />
          </div>
        </div>


        <DBadge text={dateBadge.text} tone={dateBadge.tone} />
      </div>
    </div>
  );
}
