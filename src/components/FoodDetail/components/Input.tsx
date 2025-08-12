import { useState, useEffect } from "react";
import "./Input.css";

interface InputProps {
  label: string;
  value?: string | number;
  onSave: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  className?: string;
  showEditIcon?: boolean;
}

export default function Input({
  label,
  value,
  onSave,
  type = 'text',
  placeholder,
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
          type={type}
          className={`fd-input ${className}`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
          placeholder={placeholder}
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
            className="fd-edit-btn"
            onClick={handleEdit}
            aria-label={`${label || "제목"} 수정`}
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
