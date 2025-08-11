// /src/stores/foodStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Food } from "../types/food";
import { parseQuantity } from "../utils/parseQuantity";
import { sampleFoods } from "../data/sampleFoods"; 

interface FoodStore {
  foods: Food[];
  addFood: (food: Food) => void;
  removeFood: (id: string) => void;
  updateFood: (id: string, updates: Partial<Food>) => void;
}

export const useFoodStore = create<FoodStore>()(
  persist(
    (set) => ({
      foods: sampleFoods,

      addFood: (food) =>
        set((state) => {
          const { quantity, unit } = parseQuantity(food.productName);
          const base: Food = {
            ...food,
            id: food.barCode,
            quantity: food.quantity ?? quantity,
            originalQuantity: food.originalQuantity ?? quantity,
            unit: food.unit ?? unit,
            updatedAt: Date.now(),
          };

          const exists = state.foods.some((f) => f.id === base.id);
          const foods = exists
            ? [base, ...state.foods.filter((f) => f.id !== base.id)]
            : [base, ...state.foods];

          return { foods };
        }),

      removeFood: (id) =>
        set((state) => ({ foods: state.foods.filter((f) => f.id !== id) })),

      updateFood: (id, updates) =>
        set((state) => {
          const updatedAt = Date.now();
          const next = state.foods.map((f) =>
            f.id === id
              ? {
                  ...f,
                  ...updates,
                  originalQuantity:
                    updates.originalQuantity !== undefined
                      ? updates.originalQuantity
                      : f.originalQuantity,
                  updatedAt,
                }
              : f
          );
          const target = next.find((f) => f.id === id);
          const others = next.filter((f) => f.id !== id);
          return target ? { foods: [target, ...others] } : { foods: next };
        }),
    }),
    { name: "food-storage" }
  )
);
