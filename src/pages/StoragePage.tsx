// /src/pages/StoragePage.tsx
import { useFoodStore } from "../stores/foodStore";
import Header from "../components/Header";
import "../css/StoragePage.css";

export default function StoragePage() {
  const { foods } = useFoodStore();

  return (
    <>
      <Header />
      <div className="storage-container">
        <div className="food-list">
            {foods.map((food) => (
              <div key={food.id} className="food-card">
                <div>
                    <div className="name">{food.name}</div>
                    <div>{food.manufacturer}</div>
                </div>
                <div className="a">
                    <div>수량조절</div>
                    <div>유통기한</div>
                    <div>더보기</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
