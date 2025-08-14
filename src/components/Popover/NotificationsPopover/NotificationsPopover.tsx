// src/components/FoodDetail/NotificationsPopover/NotificationsPopover.tsx

import { Popover } from "react-tiny-popover";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationsPopover.css";
import DBadge from "../../DBadge/DBadge";
import { useNotifications } from "../../../hooks/useNotifications";
import { getDDay } from "../../../utils/expiryUtils/expiryUtils";
import { getQuantityPercent, getQuantityTone } from "../../../utils/quantityUtils/quantityUtils";
import type { Food } from "../../../types/food";
import { useSettings } from "../../../hooks/useSettings";
import QPercent from "../../QPercent/QPercent";

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function NotificationsPopover({ isOpen, onClose, children }: NotificationsPopoverProps) {
  const { expiryWarnings, quantityWarnings } = useNotifications();
  const navigate = useNavigate();
  const settings = useSettings();

  const hasAlerts = expiryWarnings.length > 0 || quantityWarnings.length > 0;

  const notificationData = useMemo(() => {
    return {
      expiryItems: expiryWarnings.map((foodItem) => {
        const { label } = getDDay(foodItem.endDate, settings.expirySettings);
        return {
          ...foodItem,
          dateInfo: { text: label },
        };
      }),
      quantityItems: quantityWarnings.map((foodItem) => {
        const quantitySettings = {
          dangerPercent: settings.quantitySettings.dangerPercent,
          warningPercent: settings.quantitySettings.warningPercent,
        };
        const quantityPercent = getQuantityPercent(foodItem, quantitySettings);
        const quantityTone = getQuantityTone(foodItem, quantitySettings);
        return {
          ...foodItem,
          quantityPercent,
          quantityTone,
        };
      }),
    };
  }, [expiryWarnings, quantityWarnings, settings.expirySettings, settings.quantitySettings]);

  const handleItemClick = (food: Food) => {
    onClose(); 
    navigate(food.barCode ? `/detail?barcode=${food.barCode}` : `/detail?id=${food.id}`);
  };

  return (
    <Popover
      isOpen={isOpen}
      onClickOutside={onClose}
      positions={["bottom", "left"]}
      padding={10}
      content={
        <div className="notifications-popover">
          <div className="notifications-popover-header">
            <h3>알림</h3>
            <button onClick={onClose} className="close-button">✕</button>
          </div>
          {hasAlerts ? (
            <>
              {notificationData.expiryItems.length > 0 && (
                <div className="notification-section">
                  <h4>유통기한 경고가 있어요</h4>
                  {notificationData.expiryItems.map(({ dateInfo, ...foodItem }) => (
                    <div
                      key={foodItem.id}
                      className="notification-item"
                      onClick={() => handleItemClick(foodItem)}
                    >
                      <strong>{foodItem.name}</strong>
                      <div className="notification-detail">
                        <DBadge food={foodItem} settings={settings.expirySettings} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {notificationData.quantityItems.length > 0 && (
                <div className="notification-section">
                  <h4>수량 경고가 있어요</h4>
                  {notificationData.quantityItems.map(({ quantityPercent, quantityTone, ...foodItem }) => (
                    <div
                      key={foodItem.id}
                      className={`notification-item quantity-warning ${quantityTone}`}
                      onClick={() => handleItemClick(foodItem)}
                    >
                      <strong>{foodItem.name}</strong>
                      <div className={`QPercent-ring ${quantityTone}`}>
                        <QPercent food={foodItem} settings={settings.quantitySettings} />
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
      {children}
    </Popover>
  );
}
