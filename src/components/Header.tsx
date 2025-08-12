// /src/components/Header.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import BarcodeInput from "./BarcodeInput";
import SettingsPopover from "./FoodDetail/SettingsPopover";

export default function Header() {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className="header-container">
      <div className="logo-section" onClick={() => navigate("/")}>
        냉장고를 부탁해
      </div>
      <BarcodeInput variant="header" />
      <div className="icon-section">
        <div>알림</div>
        <SettingsPopover 
          isOpen={isSettingsOpen}
          onClose={closeSettings}
        >
          <div onClick={openSettings} style={{ cursor: 'pointer' }}>
            설정
          </div>
        </SettingsPopover>
      </div>
    </div>
  );
}
