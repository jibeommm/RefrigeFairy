// /src/components/FoodDetail/components/CategorySection.tsx

import type { Food } from "../../../types/food";
import Select from 'react-select';
import "../selectStyles.css";
import { BIG_CATEGORIES, MID_CATEGORIES, SMALL_CATEGORIES, type CategoryOption } from "../data/categories";

interface CategorySectionProps {
  formData: Partial<Food>;
  setAndSave: (key: string, value: any) => void;
}

export default function CategorySection({ formData, setAndSave }: CategorySectionProps) {
  const handleCategoryChange = (level: 'big' | 'mid' | 'small', selectedOption: CategoryOption | null) => {
    if (level === 'big') {
      setAndSave('bigCategory', selectedOption?.value || '');
      setAndSave('midCategory', '');
      setAndSave('smallCategory', '');
    } else if (level === 'mid') {
      setAndSave('midCategory', selectedOption?.value || '');
      setAndSave('smallCategory', '');
    } else {
      setAndSave('smallCategory', selectedOption?.value || '');
    }
  };

  const getMidOptions = () => {
    const bigCat = formData.bigCategory || "";
    return MID_CATEGORIES[bigCat] || [];
  };

  const getBigCategoryValue = (): CategoryOption | null => {
    if (!formData.bigCategory) return null;
    return BIG_CATEGORIES.find(cat => cat.value === formData.bigCategory) || null;
  };

  const getMidCategoryValue = (): CategoryOption | null => {
    if (!formData.midCategory) return null;
    const midOptions = getMidOptions();
    return midOptions.find(cat => cat.value === formData.midCategory) || null;
  };

  const getSmallCategoryValue = (): CategoryOption | null => {
    if (!formData.smallCategory) return null;
    return SMALL_CATEGORIES.find(cat => cat.value === formData.smallCategory) || null;
  };

  return (
    <div className="fd-row">
      <span className="fd-label">분류</span>
      <div className="fd-category-group">
        <Select
          value={getBigCategoryValue()}
          onChange={(selectedOption) => handleCategoryChange('big', selectedOption)}
          options={BIG_CATEGORIES}
          placeholder="대분류 선택"
          className="react-select-container"      
          classNamePrefix="react-select"          
          isClearable
          isSearchable={true}
        />

        <Select
          value={getMidCategoryValue()}
          onChange={(selectedOption) => handleCategoryChange('mid', selectedOption)}
          options={getMidOptions()}
          placeholder="중분류 선택"
          className="react-select-container"      
          classNamePrefix="react-select"          
          isDisabled={!formData.bigCategory}
          isClearable
          isSearchable={true}
        />

        <Select
          value={getSmallCategoryValue()}
          onChange={(selectedOption) => handleCategoryChange('small', selectedOption)}
          options={SMALL_CATEGORIES}
          placeholder="소분류 선택"
          className="react-select-container"      
          classNamePrefix="react-select"          
          isDisabled={!formData.midCategory}
          isClearable
          isSearchable={true}
        />
      </div>
    </div>
  );
}