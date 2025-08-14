// src/pages/NotificationsPage/NotificationsPage.tsx

import { useFoodStore } from "../../stores/foodStore";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ItemCard from "../StoragePage/components/ItemCard";
import type { Food } from "../../types/food";
import { useNotificationsPage, FILTER_TABS } from "./hooks/useNotificationsPage";
import { useSettings } from "../../hooks/useSettings";
import { getExpiryTone } from "../../utils/expiryUtils/expiryUtils";
import { getQuantityTone } from "../../utils/quantityUtils/quantityUtils";
import "./NotificationsPage.css";

export default function NotificationsPage() {
  const { foods, updateFood } = useFoodStore();
  const navigate = useNavigate();
  const settings = useSettings();

  const { filter, setFilter, search, setSearch, filtered } = useNotificationsPage({
    foods,
    isExpiryWarning: (food) => {
      const tone = getExpiryTone(food, settings.expirySettings);
      return tone === "danger" || tone === "warning" || tone === "dark";
    },
    isQuantityWarning: (food) => {
      const tone = getQuantityTone(food, settings.quantitySettings);
      return tone === "danger" || tone === "warning";
    },
  });

  const goDetail = (barCode: string) => navigate(`/detail?barcode=${barCode}`);

  const onChangeQuantity = (id: string, newQty: number) => {
    updateFood(id, { quantity: newQty });
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

      <div className="filter-board">
        {filtered.length > 0 ? (
          filtered.map((f: Food) => (
            <ItemCard
              key={f.id ?? f.barCode}
              food={f}
              onClick={() => goDetail(f.barCode)}
              onChangeQuantity={onChangeQuantity}
            />
          ))
        ) : (
          <p className="empty">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
