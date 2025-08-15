// src/pages/StoragePage/StoragePage.tsx

import { useFoodStore } from "../../stores/foodStore";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ItemCard from "./components/ItemCard";
import type { Food } from "../../types/food";
import { useStoragePage, FILTER_TABS, STORAGE_TYPES } from "./hooks/useStoragePage";
import "./StoragePage.css";
import { useState } from "react";

export default function StoragePage() {
  const { foods, updateFood } = useFoodStore();
  const navigate = useNavigate();

  const { filter, setFilter, search, setSearch, filtered, grouped } = useStoragePage(foods);

  const [activeTab, setActiveTab] = useState<string>("냉동실");

  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };

  const highlightGroup = activeTab === "냉동실" ? ["냉동실", "냉장실"] : ["냉장실", "실온"];

  const justify = activeTab === "냉동실" ? "start" : "end";

  const getHighlightLeft = () => {
    if (activeTab === "냉동실") return 0;
    return 110;
  };

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
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "24px",
              justifyContent: justify,
            }}
          >
            {(STORAGE_TYPES as ("냉동" | "냉장" | "실온")[]).map((key) => (
              <section className="column-panel" key={key}>
                <div className="column-list">
                  {grouped[key]?.length ? (
                    grouped[key].map((f: Food) => (
                      <ItemCard
                        key={f.id ?? f.barCode}
                        food={f}
                        onClick={() => navigate(`/detail?barcode=${f.barCode}`)}
                        onChangeQuantity={(id, newQty) =>
                          updateFood(id, { quantity: newQty })
                        }
                      />
                    ))
                  ) : (
                    <p className="empty">텅! 해당 보관에 상품이 없어요,,,</p>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div 
            className="segmented-tab" 
            style={{
              position: "fixed",
              bottom: "32px",
              left: "50%"
            }}
          >
            <div className="segmented-btn-bg-container">
              <div
                className="segmented-btn-bg"
                style={{ left: getHighlightLeft() }}
              />
            </div>

            <div className="segmented-control">
              {["냉동실", "냉장실", "실온"].map((tab) => {
                const isHighlighted = highlightGroup.includes(tab);
                return (
                  <div
                    key={tab}
                    className="tab-wrapper"
                    onClick={() => toggleTab(tab)}
                  >
                    <button
                      className={`tab-button ${isHighlighted ? "white-text" : ""}`}
                      type="button"
                    >
                      {tab}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
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
