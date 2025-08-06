// /src/pages/StoragePage/StoragePage.tsx
import { useFoodStore } from "../../stores/foodStore";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./StoragePage.css";
import { calculateDDay } from "../../utils/calculateDDay";

export default function StoragePage() {
  const { foods } = useFoodStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"모두" | "냉장" | "냉동" | "상온">("모두");

  const filteredFoods = foods.filter((food) =>
    filter === "모두" ? true : food.storageType === filter
  );

  return (
    <>
      <Header />
      <div className="filter-buttons">
        {["모두", "냉장", "냉동", "실온"].map((type) => (
          <button
            key={type}
            className={filter === type ? "active" : ""}
            onClick={() => setFilter(type as typeof filter)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="storage-container">
        <div className="food-list">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="food-card"
              onClick={() => navigate(`/detail?barcode=${food.barCode}`)}
            >
              <div>
                <div className="name">{food.name}</div>
                <div className="manufacturer">{food.manufacturer}</div>
              </div>
              <div className="food-actions">
                <div className="quantity-control">남은수량: {food.quantity}{food.unit}</div>
                <div className="D-day" style={{ color: calculateDDay(food.endDate).color }}>
                  {calculateDDay(food.endDate).label}
                </div>
              </div>
            </div>
          ))}
          {filteredFoods.length === 0 && <p>해당 보관 방식의 식품이 없습니다.</p>}
        </div>
      </div>
    </>
  );
}
