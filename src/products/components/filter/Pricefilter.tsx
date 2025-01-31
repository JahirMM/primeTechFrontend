import React, { useEffect, useRef, SetStateAction } from "react";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  minValue: number;
  maxValue: number;
  setMinValue: React.Dispatch<SetStateAction<number>>;
  setMaxValue: React.Dispatch<SetStateAction<number>>;
}

function PriceFilter({
  minPrice,
  maxPrice,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}: PriceFilterProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  const priceGap = 1000;
  const stepSize = 100;

  useEffect(() => {
    if (progressRef.current) {
      const roundedMin = Math.round(minValue / stepSize) * stepSize;
      const roundedMax = Math.round(maxValue / stepSize) * stepSize;

      progressRef.current.style.left = `${
        ((roundedMin - minPrice) / (maxPrice - minPrice)) * 100
      }%`;
      progressRef.current.style.right = `${
        100 - ((roundedMax - minPrice) / (maxPrice - minPrice)) * 100
      }%`;
    }
  }, [minValue, maxValue, minPrice, maxPrice]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : 0;
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value ? parseFloat(e.target.value) : 0;

    value = Math.ceil(value / stepSize) * stepSize;

    if (value > maxPrice - stepSize) {
      value = maxPrice;
    }

    setMaxValue(value);
  };

  const handleInputBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    let value = e.target.value ? parseFloat(e.target.value) : null;

    if (type === "min") {
      if (value === null || value < minPrice) {
        setMinValue(minPrice);
      } else if (value >= maxValue - priceGap) {
        setMinValue(maxValue - priceGap);
      } else {
        setMinValue(Math.round(value / stepSize) * stepSize);
      }
    } else {
      if (value === null || value > maxPrice) {
        setMaxValue(maxPrice);
      } else if (value <= minValue + priceGap) {
        setMaxValue(minValue + priceGap);
      } else {
        value = Math.round(value / stepSize) * stepSize;

        if (value > maxPrice - stepSize) {
          value = maxPrice;
        }

        setMaxValue(value);
      }
    }
  };

  return (
    <div className="w-full p-3 mt-5 bg-white rounded-xl">
      <span className="block mb-2 text-xs">Precio</span>
      <div className="flex items-center w-full gap-1">
        <input
          type="number"
          className="w-[95%] inline p-1 text-center border border-gray-300 rounded text-sm"
          value={minValue === 0 ? "" : minValue}
          min={minPrice}
          max={maxValue - priceGap}
          step={stepSize}
          onChange={handleMinChange}
          onBlur={(e) => handleInputBlur(e, "min")}
        />
        <span className="text-lg w-[10%] block">-</span>
        <input
          type="number"
          className="w-[95%] p-1 text-center border border-gray-300 rounded text-sm"
          value={maxValue === 0 ? "" : maxValue}
          min={minValue + priceGap}
          max={maxPrice}
          step={stepSize}
          onChange={handleMaxChange}
          onBlur={(e) => handleInputBlur(e, "max")}
        />
      </div>

      <div className="relative h-1 my-4 bg-gray-300 rounded slider">
        <div
          ref={progressRef}
          className="absolute h-full bg-teal-500 rounded progress"
        ></div>
      </div>

      <div className="relative range-input">
        <input
          type="range"
          className="absolute w-full h-2 -translate-y-4 bg-transparent appearance-none cursor-pointer range-min"
          min={minPrice}
          max={maxPrice}
          value={minValue}
          step={stepSize}
          onChange={handleMinChange}
        />
        <input
          type="range"
          className="absolute w-full h-2 -translate-y-4 bg-transparent appearance-none cursor-pointer range-max"
          min={minPrice}
          max={maxPrice}
          value={maxValue}
          step={stepSize}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}

export default PriceFilter;
