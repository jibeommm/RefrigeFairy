// src/pages/StoragePage/hooks/useFilteredFoods.ts
import { useMemo } from "react";
import type { Food } from "../../../types/food";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { groupByStorage } from "../helpers";
import type { FilterTab } from "../helpers";

export function useFilteredFoods(foods: Food[], filter: FilterTab, search: string) {
  const debouncedSearch = useDebouncedValue(search, 300);

  const filtered = useMemo(() => {
    const mapLabel = (s?: string) =>
      s === "냉동" ? "냉동실" : s === "냉장" ? "냉장실" : s === "실온" ? "실온" : "실온";
    const q = debouncedSearch.toLowerCase();

    const list = foods.filter((food) => {
      const okFilter = filter === "모두" || mapLabel(food.storageType) === filter;
      const okSearch =
        food.name.toLowerCase().includes(q) || food.productName.toLowerCase().includes(q);
      return okFilter && okSearch;
    });

    return [...list].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
  }, [foods, filter, debouncedSearch]);

  const grouped = useMemo(() => groupByStorage(filtered), [filtered]);

  return { filtered, grouped };
}
