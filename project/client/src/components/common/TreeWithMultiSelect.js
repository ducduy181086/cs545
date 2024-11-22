import React, { useState } from "react";

const TreeWithMultiSelect = ({ data, onSelectionChange }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  // Helper function to get all child IDs of a category recursively
  const getAllChildIds = (category) => {
    let childIds = [category.id];
    if (category.subCategories.length > 0) {
      category.subCategories.forEach((subCategory) => {
        childIds = [...childIds, ...getAllChildIds(subCategory)];
      });
    }
    return childIds;
  };

  const handleToggle = (category) => {
    const allChildIds = getAllChildIds(category);

    setSelectedIds((prevSelected) => {
      const isSelected = allChildIds.every((id) => prevSelected.includes(id));

      // If all are selected, deselect them; otherwise, select them
      const newSelected = isSelected
        ? prevSelected.filter((id) => !allChildIds.includes(id)) // Deselect all
        : [...prevSelected, ...allChildIds.filter((id) => !prevSelected.includes(id))]; // Select all

      onSelectionChange && onSelectionChange(newSelected); // Notify parent component
      return newSelected;
    });
  };

  const renderTree = (categories, isParent) => {
    return (
      <ul className={ `${isParent?"": "ml-4 mt-1 mb-2"}`}>
        {categories.map((category) => (
          <li key={category.id} className="flex flex-col">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedIds.includes(category.id)}
                onChange={() => handleToggle(category)}
                className="text-blue-500 focus:ring-blue-300"
              />
              <span>{category.name}</span>
            </label>
            {category.subCategories.length > 0 &&
              renderTree(category.subCategories, false)}
          </li>
        ))}
      </ul>
    );
  };

  return <div>{renderTree(data, true)}</div>;
};

export default TreeWithMultiSelect;
