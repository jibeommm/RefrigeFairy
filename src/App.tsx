// /src/App.tsx
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BarcodeInput from "./components/BarcodeInput";
import "./css/App.css";
import RegisterFood from "./pages/RegisterFood";
import StoragePage from "./pages/StoragePage";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div>
        <div className="app-title">냉장고 요정</div>
        <div><BarcodeInput variant="app" /></div>
      </div>
      <div className="content-section">
        <div onClick={() => navigate("/storage")} style={{ cursor: "pointer" }}>
          나의 냉장고로 이동
        </div>
        <div>알림 페이지로 이동</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>``
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterFood />} />
      <Route path="/storage" element={<StoragePage />} />
    </Routes>
  );
}
