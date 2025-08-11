// src/pages/StoragePage/components/ItemCard.tsx

import type { Food } from "../../../types/food";
import { dBadge } from "../helpers";

type Props = {
  food: Food;
  onClick: () => void;
  onMinus: (id: string, current?: number) => void;
  onPlus: (id: string, current?: number) => void;
};

export default function ItemCard({ food, onClick, onMinus, onPlus }: Props) {
  const badge = dBadge(food.endDate);

  const handleMinus: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onMinus(food.id, food.quantity);
  };
  const handlePlus: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onPlus(food.id, food.quantity);
  };

  return (
    <div className="item-card" onClick={onClick}>
      <div className="item-left">
        <div className="item-name">{food.name}</div>
        <div className="item-manufacturer">{food.manufacturer}</div>
      </div>
      <div className="item-right">
        <div className="qty-pill">
          <button className="qty-ghost" onClick={handleMinus} aria-label="수량 감소">-</button>
          <div className="qty-value" aria-live="polite">{food.quantity ?? 0}</div>
          <button className="qty-ghost" onClick={handlePlus} aria-label="수량 증가">+</button>
        </div>
        <div className={`d-badge ${badge.tone}`}>{badge.text}</div>
      </div>
    </div>
  );
}

