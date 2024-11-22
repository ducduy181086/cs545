import React, { useState } from "react";

const MultiSelectCheckboxWithHierarchy = ({ categories, onSelectionChange }) => {
  // Convert flat data into hierarchical structure
  const buildHierarchy = (categories) => {
    const hierarchy = {};

    categories.forEach((category) => {
      if (category.parentCategory === null) {
        hierarchy[category.id] = { ...category, children: [] };
      } else {
        const parentId = category.parentCategory.id;
        if (!hierarchy[parentId]) {
          hierarchy[parentId] = { ...category.parentCategory, children: [] };
        }
        hierarchy[parentId].children.push(category);
      }
    });

    return Object.values(hierarchy);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const categoryHierarchy = buildHierarchy(categories);

  const handleParentToggle = (parent) => {
    const isParentSelected = selectedOptions.includes(parent.id);

    let updatedSelection;
    if (isParentSelected) {
      // Remove parent and all its children
      updatedSelection = selectedOptions.filter(
        (id) => id !== parent.id && !parent.children.some((child) => child.id === id)
      );
    } else {
      // Add parent and all its children
      updatedSelection = [
        ...selectedOptions,
        parent.id,
        ...parent.children.map((child) => child.id),
      ];
    }

    setSelectedOptions(updatedSelection);
    onSelectionChange && onSelectionChange(updatedSelection);
  };

  const handleChildToggle = (parent, child) => {
    const isChildSelected = selectedOptions.includes(child.id);

    let updatedSelection;
    if (isChildSelected) {
      // Remove the child
      updatedSelection = selectedOptions.filter((id) => id !== child.id);

      // If no children are selected, remove the parent
      if (parent.children.every((child) => !updatedSelection.includes(child.id))) {
        updatedSelection = updatedSelection.filter((id) => id !== parent.id);
      }
    } else {
      // Add the child
      updatedSelection = [...selectedOptions, child.id];

      // If all children are selected, add the parent
      if (parent.children.every((child) => updatedSelection.includes(child.id))) {
        updatedSelection = [...updatedSelection, parent.id];
      }
    }

    setSelectedOptions(updatedSelection);
    onSelectionChange && onSelectionChange(updatedSelection);
  };

  return (
    <div className="space-y-4">
      {categoryHierarchy.map((parent) => (
        <div key={parent.id} className="space-y-2">
          {/* Parent Checkbox */}
          <label className="flex items-center space-x-2 font-semibold">
            <input
              type="checkbox"
              checked={selectedOptions.includes(parent.id)}
              onChange={() => handleParentToggle(parent)}
              className="rounded text-blue-500 focus:ring-blue-300"
            />
            <span>{parent.name}</span>
          </label>

          {/* Child Checkboxes */}
          <div className="pl-6 space-y-1">
            {parent.children.map((child) => (
              <label key={child.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(child.id)}
                  onChange={() => handleChildToggle(parent, child)}
                  className="rounded text-blue-500 focus:ring-blue-300"
                />
                <span>{child.name}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiSelectCheckboxWithHierarchy;
