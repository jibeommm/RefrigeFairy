// /src/pages/StoragePage.tsx
import { useFoodStore } from "../stores/foodStore";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../css/StoragePage.css";

export default function StoragePage() {
  const { foods } = useFoodStore();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="storage-container">
        <div className="food-list">
          {foods.map((food) => (
            <div
            key={food.id}
            className="food-card"
            onClick={() => navigate(`/view?barcode=${food.barCode}`)}
            >
              <div>
                <div className="name">{food.name}</div>
                <div className="manufacturer">{food.manufacturer}</div>
              </div>
              <div className="food-actions">
                <div className="quantity-control">수량조절</div>
                <div className="expire-date">유통기한</div>
                <div className="details-link">
                  더보기
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
