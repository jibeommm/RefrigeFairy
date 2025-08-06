// /src/components/FoodDetail.tsx
import type { Food } from "../types/food";
import { useState, useEffect } from "react";
import { useFoodStore } from "../stores/foodStore";
import { parseExpire } from "../utils/parseExpire";
import { calculateEndDate } from "../utils/calculateEndDate";
import { parseQuantity } from "../utils/parseQuantity";
import "../css/FoodDetail.css";

interface FoodDetailProps {
  food: Food;
}

export default function FoodDetail({ food }: FoodDetailProps) {
  const { updateFood } = useFoodStore();
  const { storage, period } = parseExpire(food.expireDays);

  const today = new Date().toISOString().split("T")[0];
  const { quantity: parsedQty, unit: parsedUnit } = parseQuantity(food.productName);

  const [formData, setFormData] = useState<Partial<Food>>({
    name: food.name,
    productName: food.productName,
    manufacturer: food.manufacturer,
    cmpnyName: food.cmpnyName,
    industry: food.industry,
    bigCategory: food.bigCategory,
    midCategory: food.midCategory,
    smallCategory: food.smallCategory,
    expireDays: food.expireDays,
    storageType: food.storageType || storage,
    expirePeriod: food.expirePeriod || period,
    buyDate: food.buyDate || today,
    endDate: food.endDate || calculateEndDate(food.buyDate || today, food.expirePeriod || period),
    quantity: food.quantity ?? parsedQty,
    originalQuantity: food.originalQuantity ?? parsedQty,
    unit: food.unit ?? parsedUnit,
  });

  useEffect(() => {
    if (!food.endDate) {
      const newEndDate = calculateEndDate(formData.buyDate!, formData.expirePeriod!);
      setFormData((prev) => ({ ...prev, endDate: newEndDate }));
      updateFood(food.id, { ...formData, endDate: newEndDate } as Food);
    }
  }, [formData.buyDate, formData.expirePeriod]);

  const handleBlur = (field: keyof Food, value: string | number) => {
    if (typeof value === "string" && !value.trim()) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
    updateFood(food.id, { [field]: value } as Partial<Food>);
  };

  const fields: { label: string; key: keyof Food; type?: string }[] = [
    { label: "제품명", key: "name" },
    { label: "제품명(세부)", key: "productName" },
    { label: "제조사", key: "manufacturer" },
    { label: "업체명", key: "cmpnyName" },
    { label: "산업분류", key: "industry" },
    { label: "대분류", key: "bigCategory" },
    { label: "중분류", key: "midCategory" },
    { label: "소분류", key: "smallCategory" },
    { label: "유통기한 원문", key: "expireDays" },
    { label: "보관 방법", key: "storageType" },
    { label: "유통기한 (기간)", key: "expirePeriod" },
    { label: "구매 날짜", key: "buyDate", type: "date" },
    { label: "유통기한 날짜", key: "endDate", type: "date" },
  ];

  return (
    <div className="food-detail">
      <div className="food-info-grid">
        {fields.map(({ label, key, type }) => (
          <div className="food-list" key={key}>
            <div className="label">{label}</div>
            <input
              type={type || "text"}
              value={formData[key] ?? ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
              onBlur={(e) => handleBlur(key, e.target.value)}
              className="edit-input"
            />
          </div>
        ))}

        <div className="quantity-group">
          <div className="label">현재 수량 / 처음 수량 (단위)</div>
          <input
            type="number"
            min={0}
            value={formData.quantity ?? 0}
            onChange={(e) => setFormData((prev) => ({ ...prev, quantity: Number(e.target.value) }))}
            onBlur={(e) => handleBlur("quantity", Number(e.target.value))}
            className="edit-input quantity-input"
            placeholder="현재 수량"
          />
          <span>/</span>
          <input
            type="number"
            min={0}
            value={formData.originalQuantity ?? 0}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, originalQuantity: Number(e.target.value) }))
            }
            onBlur={(e) => handleBlur("originalQuantity", Number(e.target.value))}
            className="edit-input quantity-input"
            placeholder="처음 수량"
          />
          <span>(단위:</span>
          <input
            type="text"
            value={formData.unit ?? ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
            onBlur={(e) => handleBlur("unit", e.target.value)}
            className="edit-input unit-input"
            placeholder="예: 개, g, L"
          />
          <span>)</span>
        </div>
      </div>
    </div>
  );
}
