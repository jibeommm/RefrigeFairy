// /src/components/BarcodeInput.tsx
import { useState } from "react";
import "../css/BarcodeInput.css";
import { useNavigate } from "react-router-dom";
import input_green from "../assets/input-green.png"

interface BarcodeInputProps {
  variant?: "app" | "header";
}

export default function BarcodeInput({ variant = "app" }: BarcodeInputProps) {
  const [barcode, setBarcode] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = barcode.trim();
    if (!trimmed) return; 
    navigate(`/register?barcode=${trimmed}`);
  };

  return (
    <div className={`barcode-input-container ${variant}`}>
      <input
        type="text"
        placeholder="바코드를 입력해줘!"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <div className="actions">
        <button type="button" className="icon-btn search" onClick={handleSearch} title="검색">
          <img src={input_green} alt="검색" className="search-icon" />
        </button>
      </div>
    </div>
  );
}
