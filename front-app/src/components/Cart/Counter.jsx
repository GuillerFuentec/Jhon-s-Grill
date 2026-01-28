"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export function Counter({ value, min = 1, max = 99, onChange }) {
  const clamp = (next) => Math.min(max, Math.max(min, next));

  const handleDecrease = () => {
    const next = clamp(value - 1);
    if (next !== value) onChange(next);
  };

  const handleIncrease = () => {
    const next = clamp(value + 1);
    if (next !== value) onChange(next);
  };

  const handleInputChange = (event) => {
    const raw = event.target.value;
    if (raw === "") return;
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    onChange(clamp(parsed));
  };

  const handleInputBlur = (event) => {
    const raw = event.target.value;
    if (raw === "") {
      onChange(min);
    }
  };

  return (
    <div className="inline-flex items-center rounded-md border border-gray-200 bg-white">
      <button
        type="button"
        onClick={handleDecrease}
        className="p-2 text-gray-400 hover:text-gray-600"
        aria-label="Decrease quantity"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        aria-label="Quantity"
        className="w-14 bg-white text-center text-sm font-medium text-gray-900 focus:outline-none"
      />
      <button
        type="button"
        onClick={handleIncrease}
        className="p-2 text-gray-400 hover:text-gray-600"
        aria-label="Increase quantity"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
