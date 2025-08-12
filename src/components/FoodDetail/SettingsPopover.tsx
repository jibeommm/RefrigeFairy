// src/components/FoodDetail/SettingsPopover.tsx

import { useState, useEffect } from 'react';
import { Popover } from 'react-tiny-popover';
import "../../css/SettingsPopover.css";

interface SettingsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; 
}

export default function SettingsPopover({ isOpen, onClose, children }: SettingsPopoverProps) {

  const [warningDays, setWarningDays] = useState(() => {
    const saved = localStorage.getItem('expiry-warning-days');
    return saved ? Number(saved) : 7;
  });

  const [dangerDays, setDangerDays] = useState(() => {
    const saved = localStorage.getItem('expiry-danger-days');
    return saved ? Number(saved) : 3;
  });


  const [warningQty, setWarningQty] = useState(() => {
    const saved = localStorage.getItem('quantity-warning-percent');
    return saved ? Number(saved) : 20;
  });

  const [dangerQty, setDangerQty] = useState(() => {
    const saved = localStorage.getItem('quantity-danger-percent');
    return saved ? Number(saved) : 10; 
  });

  const [enableNotifications, setEnableNotifications] = useState(() => {
    const saved = localStorage.getItem('expiry-notifications');
    return saved !== 'false';
  });

  useEffect(() => {
    if (isOpen) {
      const savedWarning = localStorage.getItem('expiry-warning-days');
      const savedDanger = localStorage.getItem('expiry-danger-days');
      const savedWarningQty = localStorage.getItem('quantity-warning-percent');
      const savedDangerQty = localStorage.getItem('quantity-danger-percent');
      const savedNotifications = localStorage.getItem('expiry-notifications');

      if (savedWarning) setWarningDays(Number(savedWarning));
      if (savedDanger) setDangerDays(Number(savedDanger));
      if (savedWarningQty) setWarningQty(Number(savedWarningQty));
      if (savedDangerQty) setDangerQty(Number(savedDangerQty));
      if (savedNotifications !== null) setEnableNotifications(savedNotifications !== 'false');
    }
  }, [isOpen]);

  const handleSave = () => {
    try {
      const validWarningDays = Math.max(1, warningDays);
      const validDangerDays = Math.max(1, dangerDays);
      const validWarningQty = Math.max(1, warningQty);
      const validDangerQty = Math.max(1, dangerQty);

      localStorage.setItem('expiry-warning-days', validWarningDays.toString());
      localStorage.setItem('expiry-danger-days', validDangerDays.toString());
      localStorage.setItem('quantity-warning-percent', validWarningQty.toString());
      localStorage.setItem('quantity-danger-percent', validDangerQty.toString());
      localStorage.setItem('expiry-notifications', enableNotifications.toString());

      window.dispatchEvent(new Event('expiry-settings-changed'));

      setWarningDays(validWarningDays);
      setDangerDays(validDangerDays);
      setWarningQty(validWarningQty);
      setDangerQty(validDangerQty);

      onClose();
    } catch (error) {
      console.error('설정 저장 실패:', error);
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      positions={['bottom', 'left']}
      padding={10}
      onClickOutside={onClose}
      content={(
        <div className="settings-popover-content">
          <div className="settings-popover-header">
            <h3>설정</h3>
            <button onClick={onClose} className="close-button">✕</button>
          </div>

          <div className="settings-popover-body">
            <div className="settings-section">
              <h4>유통기한 경고</h4>
              <div className="badge-setting">
                <div className="badge-demo warning">주의</div>
                <div className="badge-controls">
                  <label>
                    <input
                      type="number"
                      min="1"
                      value={warningDays}
                      onChange={(e) => setWarningDays(Number(e.target.value))}
                      className="day-input"
                    />
                    <span>일 이하 (노란색)</span>
                  </label>
                </div>
              </div>

              <div className="badge-setting">
                <div className="badge-demo danger">위험</div>
                <div className="badge-controls">
                  <label>
                    <input
                      type="number"
                      min="1"
                      value={dangerDays}
                      onChange={(e) => setDangerDays(Number(e.target.value))}
                      className="day-input"
                    />
                    <span>일 이하 (빨간색)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-popover-body">
            <div className="settings-section">
              <h4>수량 경고</h4>
              <div className="quantity-setting">
                <div className="quantity-demo warning">주의</div>
                <div className="quantity-controls">
                  <label>
                    <input
                      type="number"
                      min="1"
                      value={warningQty}
                      onChange={(e) => setWarningQty(Number(e.target.value))}
                    />
                    <span>% 이하 (노란색)</span>
                  </label>
                </div>
              </div>

              <div className="quantity-setting">
                <div className="quantity-demo danger">위험</div>
                <div className="quantity-controls">
                  <label>
                    <input
                      type="number"
                      min="1"
                      value={dangerQty}
                      onChange={(e) => setDangerQty(Number(e.target.value))}
                    />
                    <span>% 이하 (빨간색)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-popover-footer">
            <button onClick={handleSave} className="save-button">저장</button>
          </div>
        </div>
      )}
    >
      {children}
    </Popover>
  );
}
