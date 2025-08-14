// src/components/QuantityControl.tsx
import "./QuantityControl.css";

type Props = {
  value: number;
  onChange: (newValue: number) => void;
  className?: string;
};

export default function QuantityControl({ value, onChange, className = "" }: Props) {
  const onIncrease = () => onChange(value + 1);
  const onDecrease = () => onChange(Math.max(0, value - 1));

  return (
    <div className={`quantityControl ${className}`} role="group">
      <button type="button" className="quantityControl-ghost" onClick={onDecrease}>
        −
      </button>

      <div className="quantity-value" aria-live="polite">{value}</div>

      <button type="button" className="quantityControl-ghost" onClick={onIncrease}>
        +
      </button>
    </div>
  );
}
