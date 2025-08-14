import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import BarcodeInput from "../BarcodeInput/BarcodeInput";
import SettingsPopover from "../Popover/SettingsPopover/SettingsPopover";
import NotificationsPopover from "../Popover/NotificationsPopover/NotificationsPopover";
import { useNotifications } from "../../hooks/useNotifications";
import logo from "../../assets/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const { totalAlerts } = useNotifications();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);
  const openNotifications = () => setIsNotificationsOpen(true);
  const closeNotifications = () => setIsNotificationsOpen(false);

  return (
    <div className="header-container">
      <div className="logo-section" onClick={() => navigate("/")}>
        <img src={logo} alt="RefrigeFairy Logo" className="brand-logo" />
        <div>냉장고를 부탁해</div>
      </div>
      <BarcodeInput variant="header" />
      <div className="icon-section">
        <NotificationsPopover isOpen={isNotificationsOpen} onClose={closeNotifications}>
          <div onClick={openNotifications} style={{ cursor: "pointer" }}>
            {totalAlerts > 0 && <span className="notification-badge">{totalAlerts}</span>}
            🔔
          </div>
        </NotificationsPopover>

        <SettingsPopover isOpen={isSettingsOpen} onClose={closeSettings}>
          <div onClick={openSettings} style={{ cursor: "pointer" }}>
            ⚙️
          </div>
        </SettingsPopover>
      </div>
    </div>
  );
}
