// /src/components/Header.tsx
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import BarcodeInput from "./BarcodeInput";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="logo-section" onClick={() => navigate("/")}>
        냉장고를 부탁해
      </div>
      <BarcodeInput variant="header" />
      <div className="icon-section">
        <div>알림</div>
        <div>설정</div>
      </div>
    </div>
  );
}
