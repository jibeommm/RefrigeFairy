// /src/components/RegisterButton.tsx
import "../css/RegisterButton.css";

interface RegisterButtonProps {
  onClick: () => void;
  label?: string;
}

export default function RegisterButton({ onClick, label = "등록" }: RegisterButtonProps) {
  return (
    <button className="register-btn" onClick={onClick}>
      {label}
    </button>
  );
}
