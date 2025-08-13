// /src/pages/ProductDetailPage.tsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFoodStore } from "../../stores/foodStore";
import Header from "../../components/Header";
import "./ProductDetailPage.css";
import "../RegisterFood/RegisterFood.css";
import FoodDetail from "../../components/FoodDetail/FoodDetail";

export default function ProductDetailPage() {
  const [searchParams] = useSearchParams();
  const barcode = searchParams.get("barcode") || "";
  const navigate = useNavigate();

  const { foods, removeFood } = useFoodStore();


  const foodInfo = foods.find(
    (food) => String(food.barCode) === String(barcode)
  );

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
            <FoodDetail food={foodInfo} />
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
