// /src/components/FoodDetail/FoodDetail.tsx

import CategorySection from './components/CategorySection';
import DateSection from './components/DateSection';
import QuantitySection from './components/QuantitySection';
import Input from './components/Input';
import StorageSelect from './components/StorageSelect';
import { useFoodForm } from "./hooks/useFoodForm";
import { DEFAULT_STORAGE } from "../../utils/constants";
import type { Food } from "../../types/food";

import "./components/Input.css"
import "./FoodDetail.css";
import "../../css/qty.css";
import "react-datepicker/dist/react-datepicker.css";
import "./selectStyles.css";

export default function FoodDetail({ food }: { food: Food }) {
  const {
    formData,
    left,
    setAndSave
  } = useFoodForm(food);


  const handleSetAndSave = (key: string, value: any) => {
    setAndSave(key as keyof Food, value);
  };

  return (
    <div className="fd-card">
      <Input
        value={formData.name ?? ""}
        onSave={(v) => handleSetAndSave("name", v)}
        className="title-input"
      />

      <div className="fd-row">
        <span className="fd-label">상품명</span>
        <Input
          value={formData.productName ?? "정보 없음"}
          onSave={(v) => handleSetAndSave("productName", v)}
        />
      </div>

      <div className="fd-row">
        <span className="fd-label">판매처</span>
        <Input
          value={formData.manufacturer ?? formData.cmpnyName ?? "정보 없음"}
          onSave={(v) => handleSetAndSave("manufacturer", v)}
        />
      </div>

      <CategorySection formData={formData} setAndSave={handleSetAndSave} />

      <div className="fd-row">
        <span className="fd-label">보관방법</span>
        <StorageSelect
          value={formData.storageType ?? DEFAULT_STORAGE}
          onChange={(value) => handleSetAndSave("storageType", value)}
        />
      </div>

      <DateSection formData={formData} setAndSave={handleSetAndSave} left={left} />

      <div className="fd-row">
        <span className="fd-label">현재 수량 / 남은 수량 (단위)</span>    
          <QuantitySection formData={formData} setAndSave={handleSetAndSave} />
      </div>
    </div>
  );
}
