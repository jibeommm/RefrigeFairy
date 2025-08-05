// /src/components/Header.tsx
import "../css/Header.css";
import BarcodeInput from "./BarcodeInput";

export default function Header() {
  return (
    <div className="header-container">
      <div className="logo-section">
        <h1>냉장고를 부탁해</h1>
      </div>
      <BarcodeInput variant="header" />
      <div className="icon-section">
        <div>알림</div>
        <div>설정</div>
      </div>
    </div>
  );
}
