import React, { useState } from "react";

const SingleChoiceSelect = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange && onChange(option); // Notify parent component of selection
  };

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <label
          key={index}
          className={`flex items-center space-x-2 cursor-pointer`}
        >
          <input
            type="radio"
            name="single-choice"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleSelect(option)}
            className="text-blue-500 focus:ring-blue-300"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};

export default SingleChoiceSelect;
