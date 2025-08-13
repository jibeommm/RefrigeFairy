import { useSearchParams, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFoodStore } from "../../stores/foodStore";
import type { Food } from "../../types/food";
import "./RegisterFood.css";
import Header from "../../components/Header";
import FoodDetail from "../../components/FoodDetail/FoodDetail";
import { useBarcodeQuery } from "../../hooks/useBarcodeQuery";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});

function RegisterFoodContent() {
  const [searchParams] = useSearchParams();
  const barcode = (searchParams.get("barcode") || "").trim();
  const navigate = useNavigate();

  const { addFood, foods } = useFoodStore();
  const { data: foodInfo, isLoading: loading, error } = useBarcodeQuery(barcode);

  const handleRegister = () => {
    if (!foodInfo) return;
    const latestFood: Food = foods.find((f) => f.id === foodInfo.id) || foodInfo;
    addFood(latestFood);
    navigate("/storage");
  };

  return (
    <>
      <Header />
      <div className="register-container">
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text"></div>
            <div className="skeleton skeleton-card"></div>
          </div>
        )}
        {error && <div className="error">{(error as any)?.message ?? "조회 실패"}</div>}

        {foodInfo && (
          <div className="food-info">
            <FoodDetail food={foodInfo} />
            <div className="refister-btn">
              <button onClick={handleRegister}>등록</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function RegisterFood() {
  return (
    <QueryClientProvider client={queryClient}>
      <RegisterFoodContent />
    </QueryClientProvider>
  );
}
