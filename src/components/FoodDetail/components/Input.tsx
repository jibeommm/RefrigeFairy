// src/components/FoodDetail/components/Input.tsx

import { useState, useEffect } from "react";
import "../css/Input.css";
import edit from "../../../assets/edit.png";

interface InputProps {
  value?: string | number;
  onSave: (value: string) => void;
  type?: 'text' | 'number';
  className?: string;
  showEditIcon?: boolean;
}

export default function Input({
  value,
  onSave,
  type = 'text',
  className = '',
  showEditIcon = true
}: InputProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  const stringValue = String(value ?? '');

  useEffect(() => {
    setDraft(stringValue);
  }, [stringValue]);

  const handleEdit = () => {
    setDraft(stringValue);
    setEditing(true);
  };

  const handleSave = () => {
    onSave(draft);
    setEditing(false);
  };


  if (editing) { 
    return (
      <div className="input-container">
        <input
          className={`foodDetailinput ${className}`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className="input-container">
      {showEditIcon ? (
        <>
          <span className={`foodDetailtext ${className}`}>{stringValue}</span>
          <button
            className="edit-btn"
            onClick={handleEdit}
            type="button"
          >
            <img src={edit} alt="edit" className="edit-icon" />
          </button>
        </>
      ) : (
        <input
          type={type}
          className={`foodDetailinput ${className}`}
          value={stringValue}
          onChange={(e) => onSave(e.target.value)} 
        />
      )}
    </div>
  );
}
