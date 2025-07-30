// /src/App.tsx
import Header from "./components/Header";
import BarcodeInput from "./components/BarcodeInput";
import "./css/App.css";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="alert-section">
        Alert 컴포넌트 자리
      </div>
      <div className="body">
        <div className="sidebar-section">
          <div><BarcodeInput /></div>
          <div>Search 컴포넌트</div>
          <div>Category 컴포넌트</div>
        </div>
        <div className="content-section">
          <div>FoodList 컴포넌트</div>
        </div>
      </div>
    </div>
  );
}
