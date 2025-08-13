import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useFoodStore } from "../../stores/foodStore";
import ItemCard from "../StoragePage/components/ItemCard";

import { useSettings } from "../../hooks/useSettings";
import { dBadge } from "../StoragePage/helpers";
import { getQtyTone, adjustQuantity } from "../../utils/quantityUtils";
import "./NotificationsPage.css";

export default function NotificationsPage() {
  const { foods, updateFood } = useFoodStore();
  const navigate = useNavigate();
  const settings = useSettings();

  const [filter, setFilter] = useState<"모두" | "유통기한 경고" | "수량 경고">("모두");
  const [search, setSearch] = useState("");

  const filteredFoods = foods.filter((f) => {
    const matchesSearch = search === "" || 
      f.name?.toLowerCase().includes(search.toLowerCase()) ||
      f.productName?.toLowerCase().includes(search.toLowerCase()) ||
      f.manufacturer?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === "모두") return true;

    if (filter === "유통기한 경고") {
      const { tone } = dBadge(f.endDate, settings);
      return tone === "danger" || tone === "warning" || tone === "dark";
    }

    if (filter === "수량 경고") {
      const tone = getQtyTone(f, settings);
      return tone === "danger" || tone === "warning";
    }

    return true;
  });

  const onMinus = (id: string, current?: number) =>
    updateFood(id, { quantity: adjustQuantity(current ?? 0, -1) });

  const onPlus = (id: string, current?: number) =>
    updateFood(id, { quantity: adjustQuantity(current ?? 0, 1) });

  const goDetail = (barCode: string) => navigate(`/detail?barcode=${barCode}`);

  return (
    <div className="storage-page">
      <Header />

      <div className="storage-top">
        <div className="filter-pills">
          {(["모두", "유통기한 경고", "수량 경고"] as const).map((tab) => (
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
        {filteredFoods.map((f) => (
          <ItemCard
            key={f.id}
            food={f}
            onClick={() => goDetail(f.barCode)}
            onMinus={onMinus}
            onPlus={onPlus}
            left={dBadge(f.endDate, settings)}
          />
        ))}
        {filteredFoods.length === 0 && (
          <p className="empty">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
