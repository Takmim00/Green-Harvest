import { useEffect, useRef, useState } from "react";

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
  const isDragging = useRef(false);

  const handleMinChange = (e) => {
    isDragging.current = true;
    const value = Math.min(+e.target.value, localMax);
    setLocalMin(value);
    onMinChange(value);
  };

  const handleMaxChange = (e) => {
    isDragging.current = true;
    const value = Math.max(+e.target.value, localMin);
    setLocalMax(value);
    onMaxChange(value);
  };

  // const handleMinChange = (e) => {
  //   const value = Math.min(Number(e.target.value), localMax);
  //   setLocalMin(value);
  //   onMinChange(value);
  // };

  // const handleMaxChange = (e) => {
  //   const value = Math.max(Number(e.target.value), localMin);
  //   setLocalMax(value);
  //   onMaxChange(value);
  // };

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
    requestAnimationFrame(() => {
      if (range.current) {
        const min = (localMin / maxValue) * 100;
        const max = (localMax / maxValue) * 100;

        range.current.style.left = `${min}%`;
        range.current.style.right = `${100 - max}%`;
      }
    });
  };

  useEffect(() => {
    updateRange();
  }, [localMin, localMax, maxValue]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>

      <div className="relative pb-4">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-200 rounded-full" />

        <div
          ref={range}
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-green-600 rounded-full transition-[left,right] duration-300 ease-out"
        />

        <input
          ref={minInputRef}
          type="range"
          min={minValue}
          max={maxValue}
          value={localMin}
          onChange={handleMinChange}
          onMouseUp={() => {
            isDragging.current = false;
            onMinChange(localMin);
          }}
          onTouchEnd={() => {
            isDragging.current = false;
            onMinChange(localMin);
          }}
          className="absolute w-full h-1.5 top-1/2 -translate-y-1/2 pointer-events-none appearance-none bg-transparent accent-green-600 z-10"
        />

        <input
          ref={maxInputRef}
          type="range"
          min={minValue}
          max={maxValue}
          value={localMax}
          onChange={handleMaxChange}
          onMouseUp={() => {
            isDragging.current = false;
            onMaxChange(localMax);
          }}
          onTouchEnd={() => {
            isDragging.current = false;
            onMaxChange(localMax);
          }}
          className="absolute w-full h-1.5 top-1/2 -translate-y-1/2 pointer-events-none appearance-none bg-transparent accent-green-600 z-20"
        />

        <style>{`
            input[type="range"] {
              transition: all 0.25s ease-out;
            }

            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              border: 3px solid #16a34a;
              cursor: pointer;
              pointer-events: auto;
              transition: transform 0.15s ease, box-shadow 0.15s ease;
            }

            input[type="range"]::-webkit-slider-thumb:hover {
              transform: scale(1.1);
            }

            input[type="range"]::-webkit-slider-thumb:active {
              transform: scale(1.15);
              box-shadow: 0 0 0 8px rgba(22, 163, 74, 0.2);
            }

            /* Firefox */
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              border: 3px solid #16a34a;
              cursor: pointer;
              pointer-events: auto;
              transition: transform 0.15s ease, box-shadow 0.15s ease;
            }
        `}</style>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          value={localMin}
          min={minValue}
          max={localMax}
          onChange={handleMinInput}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", "."].includes(e.key)) {
              e.preventDefault();
            }
          }}
          className="border rounded-lg py-2 text-center border-gray-300
               focus:border-green-600 focus:ring-2 focus:ring-green-500
               focus:outline-none "
          placeholder="Min"
        />

        <input
          type="number"
          value={localMax}
          min={localMin}
          max={maxValue}
          onChange={handleMaxInput}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", "."].includes(e.key)) {
              e.preventDefault();
            }
          }}
          className="border rounded-lg py-2 text-center border-gray-300
               focus:border-green-600 focus:ring-2 focus:ring-green-500
               focus:outline-none"
          placeholder="Max"
        />
      </div>
    </div>
  );
}
