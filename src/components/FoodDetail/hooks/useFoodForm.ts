// src/components/FoodDetail/hooks/useFoodForm.ts
import { useState, useEffect, useMemo } from "react";
import { useFoodStore } from "../../../stores/foodStore";
import { parseExpire } from "../../../utils/parseExpire";
import { calculateEndDate } from "../../../utils/calculateEndDate";
import { parseQuantity } from "../../../utils/parseQuantity";
import { UNIT_OPTIONS, toStorageType, DEFAULT_STORAGE } from "../../../utils/constants";
import type { Food } from "../../../types/food";

import { useSettings } from "../../../hooks/useSettings";
import { dBadge } from "../../../pages/StoragePage/helpers";

export function useFoodForm(food: Food) {
  const { updateFood } = useFoodStore();
  const { storage, period } = parseExpire(food.expireDays);
  const today = new Date().toISOString().split("T")[0];
  const { quantity: parsedQty, unit: parsedUnit } = parseQuantity(food.productName);

  const initialUnit = food.unit ?? parsedUnit;
  const initialIsCustom = initialUnit ? !UNIT_OPTIONS.includes(initialUnit as any) : false;

  const [formData, setFormData] = useState<Partial<Food>>({
    name: food.name,
    productName: food.productName,
    manufacturer: food.manufacturer,
    cmpnyName: food.cmpnyName,
    bigCategory: food.bigCategory,
    midCategory: food.midCategory,
    smallCategory: food.smallCategory,
    expireDays: food.expireDays,
    storageType: toStorageType(food.storageType) ?? toStorageType(storage) ?? DEFAULT_STORAGE,
    expirePeriod: food.expirePeriod || period,
    buyDate: food.buyDate || today,
    endDate: food.endDate || calculateEndDate(food.buyDate || today, food.expirePeriod || period),
    quantity: food.quantity ?? parsedQty,
    originalQuantity: food.originalQuantity ?? parsedQty,
    unit: initialIsCustom ? "" : initialUnit,
  });

  const [customUnit, setCustomUnit] = useState(initialIsCustom ? initialUnit ?? "" : "");

  const settings = useSettings();

  useEffect(() => {
    if (formData.buyDate && formData.expirePeriod) {
      const newEnd = calculateEndDate(formData.buyDate, formData.expirePeriod);
      setFormData((p) => ({ ...p, endDate: newEnd }));
      if (food.endDate !== newEnd) {
        updateFood(food.id, { endDate: newEnd });
      }
    }
  }, [formData.buyDate, formData.expirePeriod, food.endDate, food.id, updateFood]);

  const left = useMemo(() => {
    return dBadge(formData.endDate ?? "", settings);
  }, [formData.endDate, settings]);

  const setAndSave = <K extends keyof Food>(key: K, value: Food[K]) => {
    setFormData((p) => ({ ...p, [key]: value }));
    updateFood(food.id, { [key]: value } as Partial<Food>);
  };

  return {
    formData,
    setFormData,
    customUnit,
    setCustomUnit,
    left,   
    setAndSave
  };
}
