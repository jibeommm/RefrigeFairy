// /src/components/FoodDetail.tsx
import type { Food } from "../types/food";
import { useFoodStore } from "../stores/foodStore";
import "../css/FoodDetail.css";

interface FoodDetailProps {
  food: Food;
}

export default function FoodDetail({ food }: FoodDetailProps) {
  const { updateFood } = useFoodStore();

  // 공통 블러 핸들러
  const handleBlur = (field: keyof Food, value: string) => {
    if (!value.trim()) return;
    updateFood(food.id, { [field]: value });
  };

  return (
    <div className="food-detail">
      <div className="food-info-grid">
        <div className="label">제품명</div>
        <input
          type="text"
          defaultValue={food.name}
          onBlur={(e) => handleBlur("name", e.target.value)}
          className="edit-input"
        />

        <div className="label">제품명(세부)</div>
        <input
          type="text"
          defaultValue={food.productName}
          onBlur={(e) => handleBlur("productName", e.target.value)}
          className="edit-input"
        />

        <div className="label">제조사</div>
        <input
          type="text"
          defaultValue={food.manufacturer}
          onBlur={(e) => handleBlur("manufacturer", e.target.value)}
          className="edit-input"
        />

        <div className="label">업체명</div>
        <input
          type="text"
          defaultValue={food.cmpnyName}
          onBlur={(e) => handleBlur("cmpnyName", e.target.value)}
          className="edit-input"
        />

        <div className="label">산업분류</div>
        <input
          type="text"
          defaultValue={food.industry}
          onBlur={(e) => handleBlur("industry", e.target.value)}
          className="edit-input"
        />

        <div className="label">대분류</div>
        <input
          type="text"
          defaultValue={food.bigCategory}
          onBlur={(e) => handleBlur("bigCategory", e.target.value)}
          className="edit-input"
        />

        <div className="label">중분류</div>
        <input
          type="text"
          defaultValue={food.midCategory}
          onBlur={(e) => handleBlur("midCategory", e.target.value)}
          className="edit-input"
        />

        <div className="label">소분류</div>
        <input
          type="text"
          defaultValue={food.smallCategory}
          onBlur={(e) => handleBlur("smallCategory", e.target.value)}
          className="edit-input"
        />

        <div className="label">유통기한 일수</div>
        <input
          type="text"
          defaultValue={food.expireDays}
          onBlur={(e) => handleBlur("expireDays", e.target.value)}
          className="edit-input"
        />
      </div>
    </div>
  );
}
