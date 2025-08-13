// src/components/QtyControl.tsx

type Props = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
};

export default function QtyControl({
  value,
  onIncrease,
  onDecrease,
  className = "",
}: Props) {
  return (
    <div className={`qty-pill ${className}`} role="group">
      <button
        type="button"
        className="qty-ghost"
        onClick={onDecrease}
      >
        −
      </button>

      <div className="qty-value" aria-live="polite">{value}</div>

      <button
        type="button"
        className="qty-ghost"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
}
