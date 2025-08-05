// /src/components/Header.tsx
import { Link } from "react-router-dom";
import "../css/Header.css";
import BarcodeInput from "./BarcodeInput";

export default function Header() {
  return (
    <div className="header-container">
      <div className="logo-section">
        <Link to="/" className="logo-link">
          냉장고를 부탁해
        </Link>
      </div>
      <BarcodeInput variant="header" />
      <div className="icon-section">
        <div>알림</div>
        <div>설정</div>
      </div>
    </div>
  );
}
