// /src/App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterFood from "./pages/RegisterFood/RegisterFood";
import StoragePage from "./pages/StoragePage/StoragePage";
import ProductDetailPage from "./pages/ProductDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterFood />} />
      <Route path="/storage" element={<StoragePage />} />
      <Route path="/detail" element={<ProductDetailPage />} />
    </Routes>
  );
}
