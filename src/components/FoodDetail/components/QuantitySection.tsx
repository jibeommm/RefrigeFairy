// src/components/QuantitySection.tsx

import type { Food } from "../../../types/food";
import Select from "react-select";
import QtyControl from "../../QuantityControl/QuantityControl";
import Input from "./Input";
import { UNIT_OPTIONS } from "../../../utils/constants";
import { validateQuantity } from "../../../utils/quantityUtils/quantityUtils";
import "../css/select.css";

interface QuantitySectionProps {
  formData: Partial<Food>;
  setAndSave: (key: string, value: any) => void;
}

export default function QuantitySection({ formData, setAndSave }: QuantitySectionProps) {
  const onChangeQuantity = (newValue: number) => {
    const next = Math.max(0, newValue);
    setAndSave("quantity", next);
  };

  const getCurrentUnitOption = () => {
    if (!formData.unit) return null;
    return UNIT_OPTIONS.find(option => option.value === formData.unit) || null;
  };

  const handleUnitChange = (selectedOption: any) => {
    setAndSave("unit", selectedOption?.value || "");
  };

  return (
    <div className="foodDetailrow foodDetailrow--quantity">
      <QtyControl
        value={formData.quantity ?? 0}
        onChange={onChangeQuantity}
        className="dark"
      />

      <span> / </span>

      <Input
        type="number"
        value={formData.originalQuantity ?? 10}
        onSave={(v) => setAndSave("originalQuantity", validateQuantity(v))}
        className="quantity-input"
      />

      <span>(</span>

      <Select
        value={getCurrentUnitOption()}
        onChange={handleUnitChange}
        options={UNIT_OPTIONS}
        placeholder="단위 선택"
        className="react-select-container unit-select"
        classNamePrefix="react-select"
        isClearable
        isSearchable={true}
      />

      <span>)</span>
    </div>
  );
}
