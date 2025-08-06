// /src/pages/RegisterFood.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchBarcode } from "../api/fetchBarcode";
import { useFoodStore } from "../stores/foodStore";
import type { Food } from "../types/food";
import "../css/RegisterFood.css";
import Header from "../components/Header";
import RegisterButton from "../components/RegisterButton";
import FoodDetail from "../components/FoodDetail";

export default function RegisterFood() {
  const [searchParams] = useSearchParams();
  const barcode = searchParams.get("barcode") || "";
  const navigate = useNavigate();

  const [foodInfo, setFoodInfo] = useState<Food | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addFood} = useFoodStore();

  useEffect(() => {
    if (barcode) {
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
    addFood(foodInfo);
    navigate("/storage");
  };

  return (
    <>
      <Header />
      <div className="register-container">
        {loading && <p>조회 중...</p>}
        {error && <p className="error">{error}</p>}

        {foodInfo && (
          <div className="food-info">
            <FoodDetail food={foodInfo} />
            <RegisterButton onClick={handleRegister} label="등록" />
          </div>
        )}
      </div>
    </>
  );
}
