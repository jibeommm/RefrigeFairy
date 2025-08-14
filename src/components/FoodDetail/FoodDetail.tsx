// src/components/FoodDetail/FoodDetail.tsx

import { useEffect } from "react";
import CategorySection from './components/CategorySection';
import DateSection from './components/DateSection';
import QuantitySection from './components/QuantitySection';
import Input from './components/Input';
import StorageSelect from './components/StorageSelect';
import { useFoodForm } from "./hooks/useFoodForm";
import { DEFAULT_STORAGE } from "../../utils/constants";
import type { Food } from "../../types/food";

import "./css/Input.css";
import "./css/FoodDetail.css";
import "./css/datepicker.css";

interface FoodDetailProps {
  food: Food;
  barcodeData?: any;
  onChange?: (food: Food) => void;
}

export default function FoodDetail({ food, barcodeData, onChange }: FoodDetailProps) {
  const { formData, setAndSave } = useFoodForm({ food });

  useEffect(() => {
    if (onChange) {
      onChange(formData as Food);
    }
  }, [formData, onChange]);

  return (
    <div className="foodDetailcard">
      <Input
        value={formData.name ?? ""}
        onSave={(newValue) => setAndSave("name" as keyof Food, newValue)}
        className="title-input"
      />

      <div className="foodDetailrow">
        <span className="foodDetaillabel">상품명</span>
        <Input
          value={formData.productName ?? "정보 없음"}
          onSave={(newValue) => setAndSave("productName" as keyof Food, newValue)}
        />
      </div>

      <div className="foodDetailrow">
        <span className="foodDetaillabel">판매처</span>
        <Input
          value={formData.manufacturer ?? formData.cmpnyName ?? "정보 없음"}
          onSave={(newValue) => setAndSave("manufacturer" as keyof Food, newValue)}
        />
      </div>

      <CategorySection formData={formData} setAndSave={setAndSave} />

      <div className="foodDetailrow">
        <span className="foodDetaillabel">보관방법</span>
        <StorageSelect
          value={formData.storageType ?? DEFAULT_STORAGE}
          onChange={(value) => setAndSave("storageType" as keyof Food, value)}
        />
      </div>

      <DateSection
        food={food}
        formData={formData}
        setAndSave={setAndSave}
        apiData={barcodeData as any}
      />

      <div className="foodDetailrow">
        <span className="foodDetaillabel">현재 수량 / 남은 수량 (단위)</span>
        <QuantitySection formData={formData} setAndSave={setAndSave} />
      </div>
    </div>
  );
}
