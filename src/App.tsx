// /src/App.tsx
import { Routes, Route } from "react-router-dom";
import BarcodeInput from "./components/BarcodeInput";
import "./css/App.css";
import Header from "./components/Header";
import RegisterFood from "./pages/RegisterFood";

function HomePage() {
  return (
    <div className="app-container">
      <Header />
      <div>
        <div className="app-title">냉장고 요정</div>
        <div><BarcodeInput variant="app" /></div>
      </div>
      <div className="content-section">
        <div>나의 냉장고로 이동</div>
        <div>알림 페이지로 이동</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterFood />} />
    </Routes>
  );
}
