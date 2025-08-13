//  src/components/NotificationsPopover.tsx

import { useSettings } from "../hooks/useSettings";
import { useFoodStore } from "../stores/foodStore";
import { dBadge } from "../pages/StoragePage/helpers";
import { Popover } from "react-tiny-popover";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Food } from "../types/food";
import "../css/NotificationsPopover.css";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../css/circularProgressStyles.css";
import DBadge from "./DBadge/DBadge";

export default function NotificationsPopover() {
  const settings = useSettings();
  const { foods } = useFoodStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function getQtyTone(f: Food) {
    if (!f.originalQuantity) return "ok";
    const percent = ((f.quantity ?? 0) / f.originalQuantity) * 100;
    if (percent <= settings.quantityDangerPercent) return "danger";
    if (percent <= settings.quantityWarningPercent) return "warning";
    return "ok";
  }

  const { expiryWarnings, qtyWarnings } = useMemo(() => {
    const expiryWarnings: Food[] = [];
    const qtyWarnings: Food[] = [];

    foods.forEach((f) => {
      const { tone } = dBadge(f.endDate, settings);
      const qtyTone = getQtyTone(f);

      if (tone === "danger" || tone === "warning") {
        expiryWarnings.push(f);
      }
      if (qtyTone === "danger" || qtyTone === "warning") {
        qtyWarnings.push(f);
      }
    });

    return { expiryWarnings, qtyWarnings };
  }, [foods, settings]);

  const handleItemClick = (food: Food) => {
    if (!food.barCode) return;
    setIsOpen(false);
    navigate(`/detail?barcode=${food.barCode}`);
  };

  const totalAlerts = new Set([...expiryWarnings, ...qtyWarnings].map(f => f.id)).size;

  const getQtyPercent = (f: Food) => {
    if (!f.originalQuantity) return 0;
    return Math.round(((f.quantity ?? 0) / f.originalQuantity) * 100);
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
                const dateInfo = dBadge(f.endDate, settings);
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
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="notification-icon"
      >
        🔔
        {totalAlerts > 0 && (
          <span className="notification-badge">{totalAlerts}</span>
        )}
      </div>
    </Popover>
  );
}
