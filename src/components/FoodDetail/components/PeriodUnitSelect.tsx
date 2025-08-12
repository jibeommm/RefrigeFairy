// src/components/FoodDetail/components/PeriodUnitSelect.tsx

import Select from 'react-select';

export type PeriodUnit = 'day' | 'month' | 'year';

interface UnitOption {
  value: PeriodUnit;
  label: string;
}

const UNIT_OPTIONS: UnitOption[] = [
  { value: 'day', label: '일' },
  { value: 'month', label: '개월' },
  { value: 'year', label: '년' }
];

interface PeriodUnitSelectProps {
  value: PeriodUnit;
  onChange: (unit: PeriodUnit) => void;
  className?: string;
}

export default function PeriodUnitSelect({ 
  value, 
  onChange, 
  className = "" 
}: PeriodUnitSelectProps) {
  const currentOption = UNIT_OPTIONS.find((opt: UnitOption) => opt.value === value);

  const handleChange = (option: UnitOption | null) => {
    if (option) {
      onChange(option.value);
    }
  };

  return (
    <Select
      options={UNIT_OPTIONS}
      value={currentOption}
      onChange={handleChange}
      className={`period-unit-select ${className}`}
      classNamePrefix="react-select"
      isSearchable={false}
      isClearable={false}
    />
  );
}
