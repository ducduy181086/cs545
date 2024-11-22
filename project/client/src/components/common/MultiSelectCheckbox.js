import React, { useState } from "react";

const MultiSelectCheckbox = ({ options, onSelectionChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    let updatedSelection;

    if (selectedOptions.includes(option)) {
      // Remove option if it's already selected
      updatedSelection = selectedOptions.filter((item) => item !== option);
    } else {
      // Add option to the selected list
      updatedSelection = [...selectedOptions, option];
    }

    setSelectedOptions(updatedSelection);

    // Notify parent component of the selection change
    if (onSelectionChange) {
      onSelectionChange(updatedSelection);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
            className="rounded text-blue-500 focus:ring-blue-300"
          />
          <span className="text-gray-800">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default MultiSelectCheckbox;
