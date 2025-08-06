import { useFoodStore } from "../../stores/foodStore";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./StoragePage.css";
import { calculateDDay } from "../../utils/calculateDDay";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";

export default function StoragePage() {
  const { foods } = useFoodStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"모두" | "냉장" | "냉동" | "실온">("모두");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncedValue(search, 400);

  const filteredFoods = foods.filter((food) => {
    const matchesFilter = filter === "모두" || food.storageType === filter;
    const matchesSearch =
      food.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      food.productName.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Header />
      <div className="storage-header">
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
        <div className="search-bar">
          <input
            type="text"
            placeholder=" 내 냉장고 속 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
                <div className="quantity-control">
                  남은수량: {food.quantity}
                  {food.unit}
                </div>
                <div
                  className="D-day"
                  style={{ color: calculateDDay(food.endDate).color }}
                >
                  {calculateDDay(food.endDate).label}
                </div>
              </div>
            </div>
          ))}
          {filteredFoods.length === 0 && <p>검색 결과가 없습니다.</p>}
        </div>
      </div>
    </>
  );
}
