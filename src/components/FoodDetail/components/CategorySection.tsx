// src/components/FoodDetail/components/CategorySection.tsx

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

  const handleCategoryChange = (level: string, selectedOption: CategoryOption | null) => {
    const value = selectedOption?.value || '';
    setAndSave(`${level}Category`, value);
    
    if (level === 'big') {
      setAndSave('midCategory', '');
      setAndSave('smallCategory', '');
    } else if (level === 'mid') {
      setAndSave('smallCategory', '');
    }
  };

  const createValue = (value: string | undefined): CategoryOption | null => {
    if (!value) return null;
    return { value, label: value };
  };

  const midOptions = React.useMemo(() => {
    const bigCat = formData.bigCategory || "";
    const predefinedOptions = MID_CATEGORIES[bigCat] || [];
    
    if (formData.midCategory && !predefinedOptions.find(opt => opt.value === formData.midCategory)) {
      predefinedOptions.push({ value: formData.midCategory, label: formData.midCategory });
    }
    
    return predefinedOptions;
  }, [formData.bigCategory, formData.midCategory]);

  return (
    <div className="fd-row">
      <span className="fd-label">분류</span>
      <div className="fd-category-group">
        <Select
          value={createValue(formData.bigCategory)}
          onChange={(option) => handleCategoryChange('big', option)}
          options={BIG_CATEGORIES}
          placeholder="대분류 선택"
          className="react-select-container"      
          classNamePrefix="react-select"          
          isClearable
          isSearchable
        />

        <Select
          value={createValue(formData.midCategory)}
          onChange={(option) => handleCategoryChange('mid', option)}
          options={midOptions}
          placeholder="중분류 선택"
          className="react-select-container"      
          classNamePrefix="react-select"          
          isDisabled={!formData.bigCategory}
          isClearable
          isSearchable
        />

        <Select
          value={createValue(formData.smallCategory)}
          onChange={(option) => handleCategoryChange('small', option)}
          options={SMALL_CATEGORIES}
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
