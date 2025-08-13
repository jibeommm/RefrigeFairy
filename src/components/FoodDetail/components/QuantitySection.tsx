import type { Food } from "../../../types/food";
import Select from 'react-select';
import QtyControl from '../../QtyControl';
import Input from './Input';
import { UNIT_OPTIONS } from '../../../utils/constants';
import { adjustQuantity, validateQuantity } from '../../../utils/quantityUtils';
import "../selectStyles.css";

interface QuantitySectionProps {
  formData: Partial<Food>;
  setAndSave: (key: string, value: any) => void;
}

export default function QuantitySection({ formData, setAndSave }: QuantitySectionProps) {
  const onQty = (delta: number) => {
    const next = adjustQuantity(formData.quantity ?? 0, delta);
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
    <div className="fd-row fd-row--qty">
      <QtyControl
        value={formData.quantity ?? 0}
        onIncrease={() => onQty(1)}
        onDecrease={() => onQty(-1)}
        className="dark"
      />
      
      <span> / </span>
      
      <Input
        type="number"
        value={formData.originalQuantity ?? 10}
        onSave={(v) => setAndSave("originalQuantity", validateQuantity(v))} 
        className="qty-input"
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
