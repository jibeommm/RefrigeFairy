// src/pages/StoragePage/hooks/useStoragePage.ts

import { useState, useMemo } from "react";
import type { Food } from "../../../types/food";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { groupByStorage } from "../../../utils/storageUtils/storageUtils";

export const FILTER_TABS = ["모두", "냉동실", "냉장실", "실온"];

export const STORAGE_TYPES = ["냉동", "냉장", "실온"];

export function mapStorageLabel(storageType?: string) {
  switch (storageType) {
    case "냉동":
      return "냉동실";
    case "냉장":
      return "냉장실";
    default:
      return "실온";
  }
}

export function useStoragePage(foods: Food[]) {
  const [filter, setFilter] = useState<string>("모두");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search.toLowerCase(), 300);

  const filtered = useMemo(() => {
    return foods.filter((food) => {
      const okFilter = filter === "모두" || mapStorageLabel(food.storageType) === filter;
      const okSearch =
        food.name.toLowerCase().includes(debouncedSearch) ||
        food.productName.toLowerCase().includes(debouncedSearch);
      return okFilter && okSearch;
    });
  }, [foods, filter, debouncedSearch]);

  const grouped = useMemo(() => groupByStorage(filtered), [filtered]);

  return {
    filter,
    setFilter,
    search,
    setSearch,
    filtered,
    grouped,
    FILTER_TABS,
    STORAGE_TYPES,
    mapStorageLabel,
  };
}
