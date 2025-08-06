// /src/pages/RegisterFood.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchBarcode } from "../../api/fetchBarcode";
import { useFoodStore } from "../../stores/foodStore";
import type { Food } from "../../types/food";
import "./RegisterFood.css";
import Header from "../../components/Header";
import FoodDetail from "../../components/FoodDetail";

export default function RegisterFood() {
  const [searchParams] = useSearchParams();
  const barcode = searchParams.get("barcode") || "";
  const navigate = useNavigate();

  const { addFood, foods } = useFoodStore(); 
  const [foodInfo, setFoodInfo] = useState<Food | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (barcode) {
      setFoodInfo(null);
      (async () => {
        try {
          setLoading(true);
          setError("");
          const result = await fetchBarcode(barcode);
          setFoodInfo(result);
        } catch (err: any) {
          setError(err.message || "조회 실패");
          setFoodInfo(null);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [barcode]);

  const handleRegister = () => {
    if (!foodInfo) return;
    const latestFood = foods.find((f) => f.id === foodInfo.id) || foodInfo;
    addFood(latestFood);
    navigate("/storage");
  };

  return (
    <>
      <Header />
      <div className="register-container">
        {loading && <div>조회 중...</div>}
        {error && <div className="error">{error}</div>}

        {foodInfo && (
          <div className="food-info">
            <FoodDetail food={foodInfo} />
            <button onClick={handleRegister}>등록</button>
          </div>
        )}
      </div>
    </>
  );
}
