import { CardGiftcardTwoTone } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { sellerFetchCategories } from "services/sellerService";

const AddCategoryDialog = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  initialData = null
}) => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState(null);
  const [parentCategoryList, setParentCategoryList] = useState([]);

  const isUpdateMode = mode === "update";

  useEffect(() => {
    if (isUpdateMode && initialData) {
      setName(initialData.name);
      // setParentCategory(initialData.parentCategory || null);
      if (isUpdateMode && initialData) {
        setName(initialData.name);
        setParentCategory(initialData.parentCategory?.id || ""); // Match `id` type with select options
      } else {
        setName("");
        setParentCategory("");
      }
    } else {
      setName("");
      setParentCategory(null);
    }

    sellerFetchCategories().then(res => {
      setParentCategoryList(res.content)
    })
  }, [isUpdateMode, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please provide a category name.");
      return;
    }

    const categoryData = {
      id: initialData?.id ?? 0, // Add ID in update mode
      name,
      parentId: parentCategory ?? null,
    };

    onSubmit(categoryData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isUpdateMode ? "Update Category" : "Add New Category"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700">
              Parent Category
            </label>
            <select
              id="parentCategory"
              value={parentCategory || ""}
              onChange={(e) => setParentCategory(e.target.value || null)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">None</option>
              {parentCategoryList?.map(cate =>
                <option key={cate.id} value={cate.id}>{cate.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
            >
              {isUpdateMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryDialog;
