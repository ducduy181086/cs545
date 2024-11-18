import React, { useState } from "react";

function RangeSlider() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1500);
  const minLimit = 0;
  const maxLimit = 2000;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 10); // Prevent overlap
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 10); // Prevent overlap
    setMaxValue(value);
  };

  return (
    <div className="flex flex-col items-center pt-6 ">
      {/* Slider Container */}
      <div className="relative w-full max-w-lg">
        {/* Full Track */}
        <div className=" inset-0 bg-gray-300 rounded-full"></div>

        {/* Active Range Track */}
        <div
          className=" bg-blue-500 rounded-full"
          style={{
            left: `${((minValue - minLimit) / (maxLimit - minLimit)) * 100}%`,
            right: `${100 - ((maxValue - minLimit) / (maxLimit - minLimit)) * 100}%`,
          }}
        ></div>

        {/* Min Handle */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minValue}
          onChange={handleMinChange}
          className=" w-full  accent-blue-500  pointer-events-auto"
          style={{ zIndex: minValue === maxValue - 10 ? 1 : 0 }}
        />

        {/* Max Handle */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxValue}
          onChange={handleMaxChange}
          className=" w-full  accent-blue-500  pointer-events-auto"
        />
      </div>

      {/* Display Min/Max Values */}
      <div className="flex justify-between items-center mt-6 w-full max-w-lg">
        {/* Min Value Input */}
        <div className="flex flex-col items-center">
          <label className="text-sm text-gray-600">Min (USD)</label>
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(Math.min(Number(e.target.value), maxValue - 10))}
            className="w-20 p-1 border rounded"
          />
        </div>

        {/* Max Value Input */}
        <div className="flex flex-col items-center">
          <label className="text-sm text-gray-600">Max (USD)</label>
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(Math.max(Number(e.target.value), minValue + 10))}
            className="w-20 p-1 border rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default RangeSlider;
