// /src/stores/foodStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Food } from "../types/food";
import { parseQuantity } from "../utils/parseQuantity";

interface FoodStore {
  foods: Food[];
  addFood: (food: Food) => void;
  removeFood: (id: string) => void;
  updateFood: (id: string, updates: Partial<Food>) => void;
}

const sampleFoods: Food[] = [
  {
    id: "8801056000011",
    name: "서울우유",
    productName: "서울우유 멸균우유 1L",
    manufacturer: "서울우유",
    cmpnyName: "서울우유협동조합",
    industry: "유제품",
    bigCategory: "음료",
    midCategory: "우유",
    smallCategory: "멸균우유",
    expireDays: "10일",
    storageType: "냉장",
    expirePeriod: "10일",
    buyDate: "2025-08-01",
    endDate: "2025-08-11",
    quantity: 1,
    originalQuantity: 1,
    unit: "L",
    reportNo: "",
    reportDate: "",
    category: "",
    address: "",
    closeDate: "",
    barCode: "8801056000011",
    brcdNo: "",
    lastUpdate: "",
  },
  {
    id: "8801234000022",
    name: "신라면",
    productName: "신라면 120g x 5개입",
    manufacturer: "농심",
    cmpnyName: "농심",
    industry: "즉석식품",
    bigCategory: "가공식품",
    midCategory: "라면",
    smallCategory: "봉지라면",
    expireDays: "180일",
    storageType: "실온",
    expirePeriod: "180일",
    buyDate: "2025-07-01",
    endDate: "2025-08-04",
    quantity: 5,
    originalQuantity: 5,
    unit: "개입",
    reportNo: "",
    reportDate: "",
    category: "",
    address: "",
    closeDate: "",
    barCode: "8801234000022",
    brcdNo: "",
    lastUpdate: "",
  },
   {
    id: "8801234000024",
    name: "열라면",
    productName: "신라면 120g x 5개입",
    manufacturer: "농심",
    cmpnyName: "농심",
    industry: "즉석식품",
    bigCategory: "가공식품",
    midCategory: "라면",
    smallCategory: "봉지라면",
    expireDays: "180일",
    storageType: "실온",
    expirePeriod: "180일",
    buyDate: "2025-07-01",
    endDate: "2025-08-08",
    quantity: 5,
    originalQuantity: 5,
    unit: "개입",
    reportNo: "",
    reportDate: "",
    category: "",
    address: "",
    closeDate: "",
    barCode: "8801234000022",
    brcdNo: "",
    lastUpdate: "",
  },
  {
    id: "8809876000033",
    name: "비비고 왕교자",
    productName: "비비고 왕교자 1.05kg",
    manufacturer: "CJ제일제당",
    cmpnyName: "CJ제일제당",
    industry: "냉동식품",
    bigCategory: "냉동식품",
    midCategory: "만두",
    smallCategory: "왕교자",
    expireDays: "365일",
    storageType: "냉동",
    expirePeriod: "12개월",
    buyDate: "2025-06-15",
    endDate: "2026-06-15",
    quantity: 2,
    originalQuantity: 2,
    unit: "봉지",
    reportNo: "",
    reportDate: "",
    category: "",
    address: "",
    closeDate: "",
    barCode: "8809876000033",
    brcdNo: "",
    lastUpdate: "",
  },
];

export const useFoodStore = create<FoodStore>()(
  persist(
    (set) => ({
      foods: sampleFoods,

      addFood: (food) =>
        set((state) => {
          const { quantity, unit } = parseQuantity(food.productName);
          return {
            foods: [
              ...state.foods,
              {
                ...food,
                quantity: food.quantity ?? quantity,
                originalQuantity: food.originalQuantity ?? quantity,
                unit: food.unit ?? unit,
              },
            ],
          };
        }),

      removeFood: (id) =>
        set((state) => ({
          foods: state.foods.filter((f) => f.id !== id),
        })),

      updateFood: (id, updates) =>
        set((state) => ({
          foods: state.foods.map((f) =>
            f.id === id
              ? {
                  ...f,
                  ...updates,
                  originalQuantity:
                    updates.originalQuantity !== undefined
                      ? updates.originalQuantity
                      : f.originalQuantity,
                }
              : f
          ),
        })),
    }),
    { name: "food-storage" }
  )
);
