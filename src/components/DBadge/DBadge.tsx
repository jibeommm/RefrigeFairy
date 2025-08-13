// src/components/DBadge/DBadge.tsx

import "./DBadge.css";

type BadgeTone = 'ok' | 'warning' | 'danger' | 'dark' | 'neutral';

interface DBadgeProps {
  text: string;
  tone: BadgeTone;
  className?: string;
}

export default function DBadge({ text, tone, className = "" }: DBadgeProps) {
  return (
    <div className={`d-badge ${tone} ${className}`}>
      {text}
    </div>
  );
}

export type { BadgeTone };
