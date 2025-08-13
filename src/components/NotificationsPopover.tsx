// src/components/NotificationsPopover.tsx

import { Popover } from "react-tiny-popover";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NotificationsPopover.css";
import "../css/circularProgressStyles.css";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DBadge from "./DBadge/DBadge";
import { dBadge } from "../pages/StoragePage/helpers";
import { useNotifications } from "../hooks/useNotifications";
import type { Food } from "../types/food";
import { useSettings } from "../hooks/useSettings";

export default function NotificationsPopover() {
  const { expiryWarnings, qtyWarnings, totalAlerts, getQtyTone, getQtyPercent } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (food: Food) => {
    if (!food.barCode) return;
    setIsOpen(false);
    navigate(`/detail?barcode=${food.barCode}`);
  };

  return (
    <Popover
      isOpen={isOpen}
      onClickOutside={() => setIsOpen(false)}
      positions={["bottom", "left"]}
      padding={10}
      content={
        <div className="notifications-popover">
          <h4>알림</h4>

          {expiryWarnings.length > 0 && (
            <div className="notification-section">
              <h2>유통기한 경고가 있어요</h2>
              {expiryWarnings.map((f) => {
                const dateInfo = dBadge(f.endDate, useSettings());
                return (
                  <div
                    key={f.id}
                    className={`notification-item ${dateInfo.tone}`}
                    onClick={() => handleItemClick(f)}
                  >
                    <strong>{f.name}</strong>
                    <div className="notification-detail">
                      <DBadge text={dateInfo.text} tone={dateInfo.tone} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {qtyWarnings.length > 0 && (
            <div className="notification-section">
              <h2>수량 경고가 있어요</h2>
              {qtyWarnings.map((f) => {
                const qtyPercent = getQtyPercent(f);
                const qtyTone = getQtyTone(f);
                return (
                  <div
                    key={f.id}
                    className={`notification-item qty-warning ${qtyTone}`}
                    onClick={() => handleItemClick(f)}
                  >
                    <strong>{f.name}</strong>
                    <div className={`quantity-ring ${qtyTone}`}>
                      <CircularProgressbar
                        value={qtyPercent}
                        text={`${qtyPercent}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {expiryWarnings.length === 0 && qtyWarnings.length === 0 && (
            <div className="notifications-empty">새 알림이 없습니다.</div>
          )}
        </div>
      }
    >
      <div onClick={() => setIsOpen(!isOpen)} className="notification-icon">
        🔔
        {totalAlerts > 0 && (
          <span className="notification-badge">{totalAlerts}</span>
        )}
      </div>
    </Popover>
  );
}
