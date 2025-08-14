// src/pages/HomePage/HomePage.tsx

import { useNavigate } from "react-router-dom";
import BarcodeInput from "../../components/BarcodeInput/BarcodeInput";
import { useNotifications } from "../../hooks/useNotifications";
import logo from "../../assets/logo.png";
import refrige from "../../assets/refrige.png";
import bell from "../../assets/bell.png"
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const { totalAlerts } = useNotifications(); 

  return (
    <div className="homepage-container">
      <header className="brand-section">
        <img src={logo} alt="RefrigeFairy Logo" className="hompage-brand-logo" />
        <h1 className="brand-title">냉장고를 부탁해~</h1>
      </header>

      <div className="search-row">
        <BarcodeInput variant="app" />
      </div>

      <section className="card-grid">
        <button
          type="button"
          className="feature-card"
          onClick={() => navigate("/storage")}
        >
          <div className="card-text">
            <div>나의 냉장고로</div>
            <div>이동</div>
            <img src={refrige} alt="Refrigerator" className="refrige-icon" />
          </div>
        </button>

        <button
          type="button"
          className="feature-card"
          onClick={() => navigate("/notifications")}
        >
          <div className="card-text">
            <div>알림창으로</div>
            <div>이동</div>
          </div>

          <div className="notification-container">
            <div className="notification-text">
              <span>{totalAlerts}개의 알림이 있어요!</span>
            </div>
          </div>
          <img src={bell} alt="bell" className="bell-icon" />
        </button>
      </section>
    </div>
  );
}
