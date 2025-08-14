// /src/pages/ProductDetailPage/ProductDetailPage.tsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFoodStore } from "../../stores/foodStore";
import Header from "../../components/Header/Header"
import "./ProductDetailPage.css";
import "../RegisterFood/RegisterFood.css";
import FoodDetail from "../../components/FoodDetail/FoodDetail";

export default function ProductDetailPage() {
  const [searchParams] = useSearchParams();
  const barcode = searchParams.get("barcode") || "";
  const id = searchParams.get("id") || "";
  const navigate = useNavigate();

  const { foods, removeFood } = useFoodStore();

  useEffect(() => {
  }, [barcode, id]);

  const foodInfo = foods.find((food) => {
    if (barcode) {
      return String(food.barCode) === String(barcode);
    }
    if (id) {
      return String(food.id) === String(id);
    }
    return false;
  });

  const handleDelete = () => {
    if (!foodInfo) return;
    removeFood(foodInfo.id);
    navigate("/storage");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="product-detail-page">
      <Header />
      <div className="register-container">
        {!foodInfo ? (
          <div className="error">해당 상품을 찾을 수 없습니다.</div>
        ) : (
          <div className="food-info">
            <FoodDetail 
              key={`${foodInfo.id}-${barcode || id}`}
              food={foodInfo} 
            />
            <div className="buttons">
              <button onClick={handleBack}>뒤로가기</button>
              <button onClick={handleDelete}>삭제하기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
