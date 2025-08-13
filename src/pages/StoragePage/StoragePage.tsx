// src/pages/StoragePage/StoragePage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useFoodStore } from "../../stores/foodStore";
import "./StoragePage.css";
import ItemCard from "./components/ItemCard";
import type { FilterTab } from "./helpers";
import { useFilteredFoods } from "./hooks/useFilteredFoods";

import type { Food } from "../../types/food";
import { useSettings } from "../../hooks/useSettings";
import { dBadge } from "./helpers";

export default function StoragePage() {
  const { foods, updateFood } = useFoodStore();
  const navigate = useNavigate();

  const settings = useSettings();

  const [filter, setFilter] = useState<FilterTab>("모두");
  const [search, setSearch] = useState("");

  const { filtered, grouped } = useFilteredFoods(foods, filter, search);

  const onMinus = (id: string, current?: number) =>
    updateFood(id, { quantity: Math.max(0, (current ?? 0) - 1) });

  const onPlus = (id: string, current?: number) =>
    updateFood(id, { quantity: (current ?? 0) + 1 });

  const goDetail = (barCode: string) => navigate(`/detail?barcode=${barCode}`);

  return (
    <div className="storage-page">
      <Header />

      <div className="storage-top">
        <div className="filter-pills">
          {(["모두", "냉동실", "냉장실", "실온"] as FilterTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`pill ${filter === tab ? "active" : ""}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="search-wrap">
          <input
            type="text"
            placeholder="나의 냉장고 속 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filter === "모두" ? (
        <div className="board board--grouped">
          {(["냉동", "냉장", "실온"] as const).map((key) => (
            <section className="column-panel" key={key}>
              <div className="column-list">
                {grouped[key].map((f: Food) => (
                  <ItemCard
                    key={f.id}
                    food={f}
                    onClick={() => goDetail(f.barCode)}
                    onMinus={onMinus}
                    onPlus={onPlus}
                    left={dBadge(f.endDate, settings)}
                  />
                ))}
                {grouped[key].length === 0 && (
                  <p className="empty">텅! 해당 보관에 상품이 없어요,,,</p>
                )}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="filter-board">
          {filtered.map((f: Food) => ( 
            <ItemCard
              key={f.id}
              food={f}
              onClick={() => goDetail(f.barCode)}
              onMinus={onMinus}
              onPlus={onPlus}
              left={dBadge(f.endDate, settings)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="empty">검색 결과가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}
