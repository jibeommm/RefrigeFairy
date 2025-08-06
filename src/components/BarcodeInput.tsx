// /src/components/BarcodeInput.tsx
import { useState } from "react";
import "../css/BarcodeInput.css";
import { useNavigate } from "react-router-dom";

interface BarcodeInputProps {
  variant?: "app" | "header";
}

export default function BarcodeInput({ variant = "app" }: BarcodeInputProps) {
  const [barcode, setBarcode] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/register?barcode=${barcode}`);
  };

  return (
    <div className={`barcode-input-container ${variant}`}>
      <input
        type="text"
        placeholder="바코드를 입력해줘!"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
}
