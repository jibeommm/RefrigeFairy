// /src/components/BackButton.tsx
import "../css/RegisterButton.css";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = "뒤로가기" }: BackButtonProps) {
  return (
    <button className="register-btn" onClick={onClick}>
      {label}
    </button>
  );
}
