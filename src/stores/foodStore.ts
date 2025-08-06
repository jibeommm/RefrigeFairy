// /src/stores/foodStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Food } from "../types/food";

interface FoodStore {
  foods: Food[];
  addFood: (food: Food) => void;
  removeFood: (id: string) => void;
  updateFood: (id: string, updates: Partial<Food>) => void;
}

export const useFoodStore = create<FoodStore>()(
  persist(
    (set) => ({
      foods: [],
      addFood: (food) =>
        set((state) => ({ foods: [...state.foods, food] })),
      removeFood: (id) =>
        set((state) => ({ foods: state.foods.filter((f) => f.id !== id) })),
      updateFood: (id, updates) =>
        set((state) => ({
          foods: state.foods.map((f) =>
            f.id === id ? { ...f, ...updates } : f
          ),
        })),
    }),
    { name: "food-storage" }
  )
);
