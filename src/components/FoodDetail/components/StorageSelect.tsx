// src/components/FoodDetail/components/StorageSelect.tsx

import Select from 'react-select';
import type { StorageType } from '../../../types/food';

interface StorageOption {
  value: StorageType;
  label: string;
}

const STORAGE_OPTIONS: StorageOption[] = [
  { value: "냉동", label: "냉동"},
  { value: "냉장", label: "냉장"},
  { value: "실온", label: "실온" },
  { value: "정보 없음", label: "정보 없음" }
];


interface StorageSelectProps {
  value?: StorageType;
  onChange: (value: StorageType) => void;
  className?: string;
}

export default function StorageSelect({ 
  value, 
  onChange, 
}: StorageSelectProps) {
  const currentOption = STORAGE_OPTIONS.find(opt => opt.value === value);

  const handleChange = (option: StorageOption | null) => {
    if (option) {
      onChange(option.value);
    }
  };


  return (
    <Select
      options={STORAGE_OPTIONS}
      value={currentOption}
      onChange={handleChange}
      placeholder="보관방법 선택"
      classNamePrefix="react-select"
    />
  );
}
