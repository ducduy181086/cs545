import { Slider } from "@mui/material";
import React, { useState } from "react";

function RangeSlider() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1500);
  const minLimit = 0;
  const maxLimit = 2000;

  return (
    <div className="flex flex-col items-center pt-6 ">
      {/* Slider Container */}
      <div className="relative w-full max-w-lg">
        <Slider value={[minValue, maxValue]} onChange={(e, newValue) => [setMinValue(newValue[0]), setMaxValue(newValue[1])]} min={minLimit} max={maxLimit} />
      </div>

      {/* Display Min/Max Values */}
      <div className="flex justify-between items-center mt-6 mb-6 w-full max-w-lg">
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
