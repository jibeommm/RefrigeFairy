// src/pages/RegisterFood/RegisterFood.tsx

import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFoodStore } from "../../stores/foodStore";
import type { Food } from "../../types/food";
import "./RegisterFood.css";
import Header from "../../components/Header/Header";
import FoodDetail from "../../components/FoodDetail/FoodDetail";
import { useBarcodeQuery } from "../../hooks/useBarcodeQuery";

export default function RegisterFood() {
  const [searchParams] = useSearchParams();
  const barcode = (searchParams.get("barcode") || "").trim();
  const navigate = useNavigate();

  const { addFood } = useFoodStore();
  const { data: foodInfo, isLoading: loading, error } = useBarcodeQuery(barcode);

  const [localFood, setLocalFood] = useState<Food | null>(null);

  const handleRegister = () => {
    if (!localFood && !foodInfo) return;
    const foodToAdd: Food = localFood || foodInfo!;
    addFood(foodToAdd);
    navigate("/storage");
  };

  return (
    <>
      <Header />
      <div className="register-container">
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        )}
        {error && <div className="error">{(error as any)?.message ?? "조회 실패"}</div>}

        {foodInfo && (
          <div className="food-info">
            <FoodDetail food={foodInfo} onChange={setLocalFood} />
            <div className="register-btn">
              <button onClick={handleRegister}>등록</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
