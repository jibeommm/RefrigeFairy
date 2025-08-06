// /src/pages/ProductDetailPage.tsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFoodStore } from "../stores/foodStore";
import Header from "../components/Header";
import RegisterButton from "../components/RegisterButton";
import BackButton from "../components/BackButton";
import "../css/RegisterFood.css";
import FoodDetail from "../components/FoodDetail";

export default function ProductDetailPage() {
  const [searchParams] = useSearchParams();
  const barcode = searchParams.get("barcode") || "";
  const navigate = useNavigate();

  const { foods, removeFood } = useFoodStore();
  const foodInfo = foods.find((food) => food.barCode === barcode);

  const handleDelete = () => {
    if (!foodInfo) return;
    removeFood(foodInfo.id);
    navigate("/storage");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="register-container">
        {!foodInfo ? (
          <p className="error">해당 상품을 찾을 수 없습니다.</p>
        ) : (
          <div className="food-info">
            <FoodDetail food={foodInfo} />
            <BackButton onClick={handleBack} label="뒤로가기" />
            <RegisterButton onClick={handleDelete} label="삭제" />
          </div>
        )}
      </div>
    </>
  );
}
