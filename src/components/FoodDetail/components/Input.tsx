// src/components/FoodDetail/components/Input.tsx

import { useState, useEffect } from "react";
import "./Input.css";

interface InputProps {
  value?: string | number;
  onSave: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
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
  const [draft, setDraft] = useState(String(value ?? ''));

  useEffect(() => {
    setDraft(String(value ?? ''));
  }, [value]);

  const handleEdit = () => {
    setDraft(String(value ?? ''));
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
          className={`fd-input ${className}`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
        />
      </div>
    );
  }

  return (
    <div className="input-container">
      {showEditIcon ? (
        <>
          <span className={`fd-text ${className}`}>{value ?? ''}</span>
          <button
            className="edit-btn"
            onClick={handleEdit}
            type="button"
          >
            ✎
          </button>
        </>
      ) : (
        <input
          type={type}
          className={`fd-input ${className}`}
          value={value ?? ''}
          onChange={(e) => onSave(e.target.value)} 
        />
      )}
    </div>
  );
}
