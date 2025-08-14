// src/pages/NotificationsPage/hooks/useNotificationsPage.ts

import { useState, useMemo } from "react";
import type { Food } from "../../../types/food";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";

export const FILTER_TABS = ["모두", "유통기한 경고", "수량 경고"];

interface UseNotificationsPageParams {
  foods: Food[];
  isExpiryWarning: (food: Food) => boolean;
  isQuantityWarning: (food: Food) => boolean;
}

export function useNotificationsPage({
  foods,
  isExpiryWarning,
  isQuantityWarning,
}: UseNotificationsPageParams) {
  const [filter, setFilter] = useState<string>("모두");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search.toLowerCase(), 300);

  const filtered = useMemo(() => {
    return foods.filter((food) => {
      const okSearch =
        search === "" ||
        food.name.toLowerCase().includes(debouncedSearch) ||
        food.productName.toLowerCase().includes(debouncedSearch) ||
        (food.manufacturer?.toLowerCase().includes(debouncedSearch) ?? false);

      if (!okSearch) return false;

      if (filter === "모두") return true;
      if (filter === "유통기한 경고") return isExpiryWarning(food);
      if (filter === "수량 경고") return isQuantityWarning(food);

      return false;
    });
  }, [foods, filter, debouncedSearch, isExpiryWarning, isQuantityWarning]);

  return {
    filter,
    setFilter,
    search,
    setSearch,
    filtered,
    FILTER_TABS,
  };
}
