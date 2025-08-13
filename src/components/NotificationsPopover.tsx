import { Popover } from "react-tiny-popover";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NotificationsPopover.css";
import "../css/circularProgressStyles.css";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DBadge from "./DBadge/DBadge";
import { dBadge } from "../pages/StoragePage/helpers";
import { useNotifications } from "../hooks/useNotifications";
import { getQtyPercent, getQtyTone } from "../utils/quantityUtils";
import type { Food } from "../types/food";
import { useSettings } from "../hooks/useSettings";

export default function NotificationsPopover() {
  const { expiryWarnings, qtyWarnings, totalAlerts } = useNotifications(); 
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const settings = useSettings();

  const hasAlerts = expiryWarnings.length > 0 || qtyWarnings.length > 0;

  const handleItemClick = (food: Food) => {
    setIsOpen(false);
    navigate(food.barCode ? `/detail?barcode=${food.barCode}` : `/detail?id=${food.id}`);
  };

  const notificationData = useMemo(() => ({
    expiryItems: expiryWarnings.map((f) => ({
      ...f,
      dateInfo: dBadge(f.endDate, settings)
    })),
    qtyItems: qtyWarnings.map((f) => ({
      ...f,
      qtyPercent: getQtyPercent(f),
      qtyTone: getQtyTone(f, settings) 
    }))
  }), [expiryWarnings, qtyWarnings, settings]);

  return (
    <Popover
      isOpen={isOpen}
      onClickOutside={() => setIsOpen(false)}
      positions={["bottom", "left"]}
      padding={10}
      content={
        <div className="notifications-popover">
          <h4>알림</h4>

          {hasAlerts ? (
            <>
              {notificationData.expiryItems.length > 0 && (
                <div className="notification-section">
                  <h2>유통기한 경고가 있어요</h2>
                  {notificationData.expiryItems.map(({ dateInfo, ...f }) => (
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
                  ))}
                </div>
              )}

              {notificationData.qtyItems.length > 0 && (
                <div className="notification-section">
                  <h2>수량 경고가 있어요</h2>
                  {notificationData.qtyItems.map(({ qtyPercent, qtyTone, ...f }) => (
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
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="notifications-empty">새 알림이 없습니다.</div>
          )}
        </div>
      }
    >
      <div onClick={() => setIsOpen(!isOpen)} className="notification-icon">
        {totalAlerts > 0 && (
          <span className="notification-badge">{totalAlerts}</span>
        )}
        🔔
      </div>
    </Popover>
  );
}
