// /src/pages/HomePage.tsx
import { useNavigate } from "react-router-dom";
import BarcodeInput from "../components/BarcodeInput";
import "../css/App.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div>
        <div className="app-title">냉장고 요정</div>
        <div>
          <BarcodeInput variant="app" />
        </div>
      </div>
      <div className="content-section">
        <div onClick={() => navigate("/storage")}>
          나의 냉장고로 이동
        </div>
        <div>알림 페이지로 이동 (아직 X)</div>
      </div>
    </div>
  );
}
