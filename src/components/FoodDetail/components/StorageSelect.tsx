// /src/components/FoodDetail/components/StorageSelect.tsx
import Select from 'react-select';
import type { StorageType } from '../../../types/food';
import { STORAGE_OPTIONS } from '../../../utils/constants';

interface StorageSelectProps {
  value?: StorageType;
  onChange: (value: StorageType) => void;
}

export default function StorageSelect({ 
  value, 
  onChange, 
}: StorageSelectProps) {
  const currentOption = STORAGE_OPTIONS.find(opt => opt.value === value);

  const handleChange = (option: { value: StorageType; label: string } | null) => {
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
