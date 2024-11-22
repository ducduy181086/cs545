import React, { useState, useEffect } from "react";

const AddCategoryDialog = ({
    isOpen,
    onClose,
    onSubmit,
    mode = "add",
    initialData = null
}) => {
    const [name, setName] = useState("");

    const isUpdateMode = mode === "update";

    useEffect(() => {
        if (isUpdateMode && initialData) {
            setName(initialData.name);
        } else {
            setName("");
        }
    }, [isUpdateMode, initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            alert("Please provide a category name.");
            return;
        }

        const categoryData = {
            id: initialData?.id ?? null, // Add ID in update mode
            name,
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
