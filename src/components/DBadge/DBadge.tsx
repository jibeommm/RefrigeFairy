// src/components/DBadge/DBadge.tsx

import "./DBadge.css";

type BadgeTone = 'ok' | 'warning' | 'danger' | 'dark';

interface DBadgeProps {
  text: string;
  tone: BadgeTone;
}

export default function DBadge({ text, tone}: DBadgeProps) {
  return (
    <div className={`d-badge ${tone}`}>
      {text}
    </div>
  );
}

export type { BadgeTone };
