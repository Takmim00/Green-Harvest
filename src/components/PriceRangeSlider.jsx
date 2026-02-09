"use client";

import React, { useState, useEffect, useRef } from "react";

export default function PriceRangeSlider({
  minValue,
  maxValue,
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);
  const range = useRef(null);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), localMax);
    setLocalMin(value);
    onMinChange(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), localMin);
    setLocalMax(value);
    onMaxChange(value);
  };

  const handleMinInput = (e) => {
    const value = Math.min(Number(e.target.value), localMax);
    setLocalMin(value);
    onMinChange(value);
  };

  const handleMaxInput = (e) => {
    const value = Math.max(Number(e.target.value), localMin);
    setLocalMax(value);
    onMaxChange(value);
  };

  const updateRange = () => {
    if (minInputRef.current && maxInputRef.current && range.current) {
      const min = Math.max(0, (localMin / maxValue) * 100);
      const max = Math.min(100, (localMax / maxValue) * 100);

      range.current.style.left = `${min}%`;
      range.current.style.right = `${100 - max}%`;
    }
  };

  useEffect(() => {
    updateRange();
  }, [localMin, localMax, maxValue]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>

      <div className="relative pt-8 pb-4">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-200 rounded-full" />

        <div
          ref={range}
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-green-600 rounded-full transition-all"
        />

        <input
          ref={minInputRef}
          type="range"
          min={minValue}
          max={maxValue}
          value={localMin}
          onChange={handleMinChange}
          className="absolute w-full h-1.5 top-1/2 -translate-y-1/2 pointer-events-none appearance-none bg-transparent accent-green-600 z-10"
        />

        <input
          ref={maxInputRef}
          type="range"
          min={minValue}
          max={maxValue}
          value={localMax}
          onChange={handleMaxChange}
          className="absolute w-full h-1.5 top-1/2 -translate-y-1/2 pointer-events-none appearance-none bg-transparent accent-green-600 z-20"
        />

        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 3px solid #16a34a;
            cursor: pointer;
            pointer-events: auto;
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 3px solid #16a34a;
            cursor: pointer;
            pointer-events: auto;
          }
        `}</style>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          value={localMin}
          onChange={handleMinInput}
          min={minValue}
          max={localMax}
          className="border rounded-lg py-2 text-center"
        />
        <input
          type="number"
          value={localMax}
          onChange={handleMaxInput}
          min={localMin}
          max={maxValue}
          className="border rounded-lg py-2 text-center"
        />
      </div>

      <div className="text-center text-sm text-gray-600">
        ${localMin} - ${localMax}
      </div>
    </div>
  );
}
