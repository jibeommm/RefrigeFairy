// src/pages/StoragePage/StoragePage.tsx

import { useFoodStore } from "../../stores/foodStore";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ItemCard from "./components/ItemCard";
import type { Food } from "../../types/food";
import { useStoragePage, FILTER_TABS, STORAGE_TYPES } from "./hooks/useStoragePage";
import "./StoragePage.css";

export default function StoragePage() {
  const { foods, updateFood } = useFoodStore();
  const navigate = useNavigate();

  const { filter, setFilter, search, setSearch, filtered, grouped } = useStoragePage(foods);

  return (
    <div className="storage-page">
      <Header />
      <div className="storage-top">
        <div className="filter-pills">
          {FILTER_TABS.map((tab) => (
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
        <div className="board">
          {(STORAGE_TYPES as ("냉동" | "냉장" | "실온")[]).map((key) => (
            <section className="column-panel" key={key}>
              <div className="column-list">
                {grouped[key]?.length ? (
                  grouped[key].map((f: Food) => (
                    <ItemCard
                      key={f.id ?? f.barCode}
                      food={f}
                      onClick={() => navigate(`/detail?barcode=${f.barCode}`)}
                      onChangeQuantity={(id, newQty) => updateFood(id, { quantity: newQty })}
                    />
                  ))
                ) : (
                  <p className="empty">텅! 해당 보관에 상품이 없어요,,,</p>
                )}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="filter-board">
          {filtered.length ? (
            filtered.map((f: Food) => (
              <ItemCard
                key={f.id ?? f.barCode}
                food={f}
                onClick={() => navigate(`/detail?barcode=${f.barCode}`)}
                onChangeQuantity={(id, newQty) => updateFood(id, { quantity: newQty })}
              />
            ))
          ) : (
            <p className="empty">텅! 해당 보관에 상품이 없어요,,,</p>
          )}
        </div>
      )}
    </div>
  );
}
