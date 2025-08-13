// /src/components/FoodDetail/components/CategorySection.tsx
import React from 'react';
import type { Food } from "../../../types/food";
import Select from 'react-select';
import "../selectStyles.css";
import { BIG_CATEGORIES, MID_CATEGORIES, SMALL_CATEGORIES, type CategoryOption } from "../data/categories";

interface CategorySectionProps {
  formData: Partial<Food>;
  setAndSave: (key: string, value: any) => void;
  apiData?: any;
}

export default function CategorySection({ formData, setAndSave, apiData }: CategorySectionProps) {
  
  React.useEffect(() => {
    if (!apiData || formData.bigCategory) return;
    
    const apiBigCategory = apiData?.HTRK_PRDLST_NM;
    const apiMidCategory = apiData?.HRNK_PRDLST_NM;
    const apiSmallCategory = apiData?.PRDLST_NM;

    if (apiBigCategory) {
      setAndSave('bigCategory', apiBigCategory);
      if (apiMidCategory) setAndSave('midCategory', apiMidCategory);
      if (apiSmallCategory) setAndSave('smallCategory', apiSmallCategory);
    }
  }, [apiData]);

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
    const predefinedOptions = MID_CATEGORIES[bigCat] || [];
    
    if (formData.midCategory && !predefinedOptions.find(opt => opt.value === formData.midCategory)) {
      return [
        ...predefinedOptions,
        { value: formData.midCategory, label: formData.midCategory }
      ];
    }
    
    return predefinedOptions;
  };

  const getBigCategoryValue = (): CategoryOption | null => {
    if (!formData.bigCategory) return null;
    
    const found = BIG_CATEGORIES.find(cat => cat.value === formData.bigCategory);
    
    if (!found && formData.bigCategory) {
      return { value: formData.bigCategory, label: formData.bigCategory };
    }
    
    return found || null;
  };

  const getMidCategoryValue = (): CategoryOption | null => {
    if (!formData.midCategory) return null;
    
    const midOptions = getMidOptions();
    const found = midOptions.find(cat => cat.value === formData.midCategory);
    
    if (!found && formData.midCategory) {
      return { value: formData.midCategory, label: formData.midCategory };
    }
    
    return found || null;
  };

  const getSmallCategoryValue = (): CategoryOption | null => {
    if (!formData.smallCategory) return null;
    
    const found = SMALL_CATEGORIES.find(cat => cat.value === formData.smallCategory);
    
    if (!found && formData.smallCategory) {
      return { value: formData.smallCategory, label: formData.smallCategory };
    }
    
    return found || null;
  };

  const getBigOptions = () => {
    const predefinedOptions = [...BIG_CATEGORIES];
    
    if (formData.bigCategory && !predefinedOptions.find(opt => opt.value === formData.bigCategory)) {
      predefinedOptions.push({ value: formData.bigCategory, label: formData.bigCategory });
    }
    
    return predefinedOptions;
  };

  const getSmallOptions = () => {
    const predefinedOptions = [...SMALL_CATEGORIES];
    
    if (formData.smallCategory && !predefinedOptions.find(opt => opt.value === formData.smallCategory)) {
      predefinedOptions.push({ value: formData.smallCategory, label: formData.smallCategory });
    }
    
    return predefinedOptions;
  };

  return (
    <div className="fd-row">
      <span className="fd-label">분류</span>
      <div className="fd-category-group">
        <Select
          value={getBigCategoryValue()}
          onChange={(selectedOption) => handleCategoryChange('big', selectedOption)}
          options={getBigOptions()}
          placeholder="대분류 선택"
          className="react-select-container"      
          classNamePrefix="react-select"          
          isClearable
          isSearchable
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
          isSearchable
        />

        <Select
          value={getSmallCategoryValue()}
          onChange={(selectedOption) => handleCategoryChange('small', selectedOption)}
          options={getSmallOptions()}
          placeholder="소분류 선택"
          className="react-select-container"      
          classNamePrefix="react-select"          
          isDisabled={!formData.midCategory}
          isClearable
          isSearchable
        />
      </div>
    </div>
  );
}
