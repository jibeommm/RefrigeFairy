// /src/components/FoodDetail/FoodDetail.tsx
import CategorySection from './components/CategorySection';
import DateSection from './components/DateSection';
import QuantitySection from './components/QuantitySection';
import Input from './components/Input';
import StorageSelect from './components/StorageSelect';
import { useFoodForm } from "./hooks/useFoodForm";
import { useBarcodeQuery } from "../../hooks/useBarcodeQuery";
import { DEFAULT_STORAGE } from "../../utils/constants";
import type { Food } from "../../types/food";

import "./components/Input.css"
import "./FoodDetail.css";
import "../../css/qty.css";
import "react-datepicker/dist/react-datepicker.css";
import "./selectStyles.css";

export default function FoodDetail({ food }: { food: Food }) {
  const { formData, setAndSave } = useFoodForm(food);
  const { data: barcodeData } = useBarcodeQuery(food.barCode || '');

  return (
    <div className="fd-card">
      <Input
        value={formData.name ?? ""}
        onSave={(newValue) => setAndSave("name" as keyof Food, newValue)}
        className="title-input"
      />

      <div className="fd-row">
        <span className="fd-label">상품명</span>
        <Input
          value={formData.productName ?? "정보 없음"}
          onSave={(newValue) => setAndSave("productName" as keyof Food, newValue)}
        />
      </div>

      <div className="fd-row">
        <span className="fd-label">판매처</span>
        <Input
          value={formData.manufacturer ?? formData.cmpnyName ?? "정보 없음"}
          onSave={(newValue) => setAndSave("manufacturer" as keyof Food, newValue)}
        />
      </div>

      <CategorySection formData={formData} setAndSave={setAndSave} />

      <div className="fd-row">
        <span className="fd-label">보관방법</span>
        <StorageSelect
          value={formData.storageType ?? DEFAULT_STORAGE}
          onChange={(value) => setAndSave("storageType" as keyof Food, value)}
        />
      </div>

      <DateSection 
        formData={formData} 
        setAndSave={setAndSave} 
        apiData={barcodeData as any}
      />

      <div className="fd-row">
        <span className="fd-label">현재 수량 / 남은 수량 (단위)</span>    
        <QuantitySection formData={formData} setAndSave={setAndSave} />
      </div>
    </div>
  );
}
