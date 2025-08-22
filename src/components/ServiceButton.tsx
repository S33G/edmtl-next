'use client';

import { useState } from 'react';

// Service Button Component for Mobile
interface ServiceButtonProps {
  id: string;
  name: string;
  value: string;
  label: string;
  className?: string;
}

export default function ServiceButton({ id, name, value, label, className = '' }: ServiceButtonProps) {
  const [selected, setSelected] = useState(false);

  return (
    <div className={className}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        className="hidden"
        checked={selected}
        onChange={() => setSelected(!selected)}
      />
      <label
        htmlFor={id}
        className={`block w-full p-3 text-center rounded-lg border border-[var(--border)] cursor-pointer transition-all duration-200 ${
          selected
            ? 'bg-[var(--primary)] text-black font-medium'
            : 'bg-[var(--background-secondary)] text-[var(--foreground)]'
        }`}
        onClick={() => setSelected(!selected)}
      >
        {label}
      </label>
    </div>
  );
}
