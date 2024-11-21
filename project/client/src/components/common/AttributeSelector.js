import React from "react";

const AttributeSelector = ({title, data, selectedValue, onSelectedChange, isReadOnly = false}) => {
  return (
    <div className="pb-2">
      <span className="font-semibold text-gray-600">{title}</span>

      <div className="flex gap-4 mt-2">
        {data&& data.map((item) => (
          <button
            key={item}
            onClick={() => onSelectedChange(item)}
            className={`px-2 py-1 border rounded ${
              selectedValue == item ? "bg-blue-200 border-blue-500" : "bg-white border-black"
            } hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
            disabled={isReadOnly}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AttributeSelector;
