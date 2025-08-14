// src/pages/StoragePage/components/ItemCard.tsx

import QtyControl from "../../../components/QuantityControl/QuantityControl";
import QPercent from "../../../components/QPercent/QPercent";
import DBadge from "../../../components/DBadge/DBadge";
import type { Food } from "../../../types/food";
import { useSettings } from "../../../hooks/useSettings";

type Props = {
  food: Food;
  onClick: () => void;
  onChangeQuantity: (id: string, newQuantity: number) => void;
};

export default function ItemCard({ food, onClick, onChangeQuantity }: Props) {
  const settings = useSettings();

  const handleQuantityChange = (newValue: number) => {
    onChangeQuantity(food.id, newValue);
  };

  return (
    <div className="item-card" onClick={onClick}>
      <div className="item-left">
        <div className="item-name">{food.name}</div>
        <div className="item-manufacturer">{food.manufacturer || food.cmpnyName}</div>
      </div>
      <div className="item-right">
        <div className="item-quantity">
          <QPercent food={food} settings={settings.quantitySettings} />
          <div onClick={(e) => e.stopPropagation()}>
            <QtyControl value={food.quantity ?? 0} onChange={handleQuantityChange} />
          </div>
        </div>
        <DBadge food={food} settings={settings.expirySettings} />
      </div>
    </div>
  );
}
