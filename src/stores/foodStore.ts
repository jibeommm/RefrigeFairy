// /src/stores/foodStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Food } from "../types/food";

interface FoodStore {
  foods: Food[];
  addFood: (food: Food) => void;
  removeFood: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearAll: () => void;
}

export const useFoodStore = create<FoodStore>()(
  persist(
    (set) => ({
      foods: [],

      addFood: (food) =>
        set((state) => {
          const exists = state.foods.find((f) => f.id === food.id);
          if (exists) {
            return {
              foods: state.foods.map((f) =>
                f.id === food.id
                  ? { ...f, quantity: f.quantity + food.quantity }
                  : f
              ),
            };
          }
          return { foods: [...state.foods, food] };
        }),

      removeFood: (id) =>
        set((state) => ({
          foods: state.foods.filter((food) => food.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          foods: state.foods.map((food) =>
            food.id === id ? { ...food, quantity } : food
          ),
        })),

      clearAll: () => set({ foods: [] }),
    }),
    {
      name: "refrige-fairy-foods",
    }
  )
);
