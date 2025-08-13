// src/pages/NotificationsPage/NotificationsPage.tsx

import Header from "../../components/Header";
import NotificationsPopover from "../../components/NotificationsPopover";
import "./NotificationsPage.css";

export default function NotificationsPage() {
  return (
    <div className="notifications-page">
      <Header />
      <div className="notifications-page-content">
        <h1>알림 목록</h1>
        {/* 팝오버 컴포넌트 내용을 페이지에서도 전체 표시 */}
        <NotificationsPopover />
      </div>
    </div>
  );
}
