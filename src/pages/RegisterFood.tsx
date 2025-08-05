// /src/pages/RegisterFood.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBarcode } from "../api/fetchBarcode";
import type { Food } from "../types/food";
import "../css/RegisterFood.css";
import Header from "../components/Header";

export default function RegisterFood() {
  const [searchParams] = useSearchParams();
  const barcode = searchParams.get("barcode") || ""; // 그대로 사용

  const [foodInfo, setFoodInfo] = useState<Food | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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


  return (
    <>
      <Header />
      <div className="register-container">
        <h2>상품 조회</h2>

        {loading && <p>조회 중...</p>}
        {error && <p className="error">{error}</p>}

        {foodInfo && (
          <div className="food-info">
            <h3>{foodInfo.name}</h3>
            <p><strong>제품명(세부):</strong> {foodInfo.productName}</p>
            <p><strong>제조사:</strong> {foodInfo.manufacturer}</p>
            <p><strong>업체명:</strong> {foodInfo.cmpnyName}</p>
            <p><strong>산업분류:</strong> {foodInfo.industry}</p>
            <p><strong>카테고리:</strong> {foodInfo.bigCategory} / {foodInfo.midCategory} / {foodInfo.smallCategory}</p>
            <p><strong>보관 방법:</strong> {foodInfo.bigCategory} / {foodInfo.midCategory}</p>
            <p><strong>유통기한 일수:</strong> {foodInfo.expireDays}</p>
          </div>
        )}
      </div>
    </>
  );
}
