// src/components/FoodDetail/hooks/useFoodForm.ts

import { useState, useEffect } from "react";
import { useFoodStore } from "../../../stores/foodStore";
import { calculateEndDate } from "../../../utils/calculateEndDate";
import { DEFAULT_STORAGE, toStorageType } from "../../../utils/constants";
import { parseQuantity } from "../../../utils/parseQuantity";
import type { Food } from "../../../types/food";

interface UseFoodFormArgs {
  food: Food;
  parsedExpire?: { storage: string; period: string; days?: number };
}

export function useFoodForm({ food, parsedExpire }: UseFoodFormArgs) {
  const { updateFood } = useFoodStore();
  const today = new Date().toISOString().split("T")[0];

  const expireDays = parsedExpire?.days ?? 7;
  const storageFromExpire = parsedExpire?.storage ?? "정보 없음";

  const smartDefaults = parseQuantity(food.productName || "");

  const [formData, setFormData] = useState<Partial<Food>>({
    name: food.name,
    productName: food.productName,
    manufacturer: food.manufacturer,
    cmpnyName: food.cmpnyName,
    bigCategory: food.bigCategory,
    midCategory: food.midCategory,
    smallCategory: food.smallCategory,
    expireDays: food.expireDays,
    storageType: food.storageType || toStorageType(storageFromExpire) || DEFAULT_STORAGE,
    expirePeriod: food.expirePeriod ?? String(expireDays),
    buyDate: food.buyDate || today,
    endDate: food.endDate || calculateEndDate(food.buyDate || today, food.expirePeriod ?? expireDays),
    quantity: food.quantity ?? smartDefaults.quantity,
    originalQuantity: food.originalQuantity ?? smartDefaults.quantity,
    unit: food.unit ?? smartDefaults.unit,
  });

  useEffect(() => {
    if (formData.buyDate && formData.expirePeriod) {
      const newEnd = calculateEndDate(formData.buyDate, formData.expirePeriod);
      setFormData((p) => ({ ...p, endDate: newEnd }));
      if (food.endDate !== newEnd) {
        updateFood(food.id, { endDate: newEnd });
      }
    }
  }, [formData.buyDate, formData.expirePeriod, food.endDate, food.id, updateFood]);

  const setAndSave = (key: string, value: any) => {
    setFormData((p) => ({ ...p, [key]: value }));
    updateFood(food.id, { [key]: value } as Partial<Food>);
  };

  return {
    formData,
    setAndSave
  };
}
