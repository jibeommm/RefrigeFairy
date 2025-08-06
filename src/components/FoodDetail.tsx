// /src/components/FoodDetail.tsx
import type { Food } from "../types/food";
import { useState, useEffect } from "react";
import { useFoodStore } from "../stores/foodStore";
import { parseExpire } from "../utils/parseExpire";
import { calculateEndDate } from "../utils/calculateEndDate";
import "../css/FoodDetail.css";

interface FoodDetailProps {
  food: Food;
}

export default function FoodDetail({ food }: FoodDetailProps) {
  const { updateFood } = useFoodStore();
  const { storage, period } = parseExpire(food.expireDays);

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
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
    quantity: food.quantity,
  });

  useEffect(() => {
    const newEndDate = calculateEndDate(formData.buyDate, formData.expirePeriod);
    setFormData((prev) => ({ ...prev, endDate: newEndDate }));
    updateFood(food.id, { ...formData, endDate: newEndDate });
  }, [formData.buyDate, formData.expirePeriod]);

  const handleBlur = (field: keyof Food, value: string | number) => {
    if (typeof value === "string" && !value.trim()) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
    updateFood(food.id, { [field]: value });
  };

  return (
    <div className="food-detail">
      <div className="food-info-grid">
        <div className="label">제품명</div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onBlur={(e) => handleBlur("name", e.target.value)}
          className="edit-input"
        />

        <div className="label">제품명(세부)</div>
        <input
          type="text"
          value={formData.productName}
          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          onBlur={(e) => handleBlur("productName", e.target.value)}
          className="edit-input"
        />

        <div className="label">제조사</div>
        <input
          type="text"
          value={formData.manufacturer}
          onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
          onBlur={(e) => handleBlur("manufacturer", e.target.value)}
          className="edit-input"
        />

        <div className="label">업체명</div>
        <input
          type="text"
          value={formData.cmpnyName}
          onChange={(e) => setFormData({ ...formData, cmpnyName: e.target.value })}
          onBlur={(e) => handleBlur("cmpnyName", e.target.value)}
          className="edit-input"
        />

        <div className="label">산업분류</div>
        <input
          type="text"
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          onBlur={(e) => handleBlur("industry", e.target.value)}
          className="edit-input"
        />

        <div className="label">대분류</div>
        <input
          type="text"
          value={formData.bigCategory}
          onChange={(e) => setFormData({ ...formData, bigCategory: e.target.value })}
          onBlur={(e) => handleBlur("bigCategory", e.target.value)}
          className="edit-input"
        />

        <div className="label">중분류</div>
        <input
          type="text"
          value={formData.midCategory}
          onChange={(e) => setFormData({ ...formData, midCategory: e.target.value })}
          onBlur={(e) => handleBlur("midCategory", e.target.value)}
          className="edit-input"
        />

        <div className="label">소분류</div>
        <input
          type="text"
          value={formData.smallCategory}
          onChange={(e) => setFormData({ ...formData, smallCategory: e.target.value })}
          onBlur={(e) => handleBlur("smallCategory", e.target.value)}
          className="edit-input"
        />

        <div className="label">유통기한 원문</div>
        <input
          type="text"
          value={formData.expireDays}
          onChange={(e) => setFormData({ ...formData, expireDays: e.target.value })}
          onBlur={(e) => handleBlur("expireDays", e.target.value)}
          className="edit-input"
        />

        <div className="label">보관 방법</div>
        <input
          type="text"
          value={formData.storageType}
          onChange={(e) => setFormData({ ...formData, storageType: e.target.value })}
          onBlur={(e) => handleBlur("storageType", e.target.value)}
          className="edit-input"
        />

        <div className="label">유통기한 (기간)</div>
        <input
          type="text"
          value={formData.expirePeriod}
          onChange={(e) => setFormData({ ...formData, expirePeriod: e.target.value })}
          onBlur={(e) => handleBlur("expirePeriod", e.target.value)}
          className="edit-input"
        />

        <div className="label">구매 날짜</div>
        <input
          type="date"
          value={formData.buyDate}
          onChange={(e) => setFormData({ ...formData, buyDate: e.target.value })}
          onBlur={(e) => handleBlur("buyDate", e.target.value)}
          className="edit-input"
        />

        <div className="label">유통기한 날짜</div>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          onBlur={(e) => handleBlur("endDate", e.target.value)}
          className="edit-input"
        />

        <div className="label">수량</div>
        <input
          type="number"
          min={0}
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
          onBlur={(e) => handleBlur("quantity", Number(e.target.value))}
          className="edit-input"
        />
      </div>
    </div>
  );
}
