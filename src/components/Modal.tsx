// /src/components/Modal.tsx
import { useEffect, useState } from "react";
import type { Food } from "../types/food";
import "../css/Modal.css";

interface ModalProps {
  food: Food | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ food, isOpen, onClose }: ModalProps) {
  const [editedFood, setEditedFood] = useState<Food | null>(null);

  useEffect(() => {
    if (isOpen && food) {
      setEditedFood({ ...food });
    }
  }, [isOpen, food]);

  if (!isOpen || !editedFood) return null;

  const handleChange = (key: keyof Food, value: string | number) => {
    setEditedFood((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>제품 상세 정보</h2>

        <label>
          제품명:
          <input
            type="text"
            value={editedFood.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </label>

        <label>
          제조사:
          <input
            type="text"
            value={editedFood.manufacturer}
            onChange={(e) => handleChange("manufacturer", e.target.value)}
          />
        </label>

        <label>
          대분류:
          <input
            type="text"
            value={editedFood.bigCategory}
            onChange={(e) => handleChange("bigCategory", e.target.value)}
          />
        </label>

        <label>
          중분류:
          <input
            type="text"
            value={editedFood.midCategory}
            onChange={(e) => handleChange("midCategory", e.target.value)}
          />
        </label>

        <label>
          소분류:
          <input
            type="text"
            value={editedFood.smallCategory}
            onChange={(e) => handleChange("smallCategory", e.target.value)}
          />
        </label>

        <label>
          수량:
          <input
            type="number"
            min={1}
            value={editedFood.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
          />
        </label>

        <label>
          유통기한:
          <input 
            type="text"
            value={editedFood.expireDays}
            onChange={(e) => handleChange("expireDays", e.target.value)}
          />
        </label>

        <div className="modal-buttons">
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
