import React, { useEffect, useState } from "react";
import { sellerFetchCategories } from "services/sellerService";
import AddCategoryDialog from "./AddCategoryDialog";
import { adminAddCategory, adminDeleteCategory, adminUpdateCategory } from "services/adminService";
import AdminHeader from "./AdminHeader";

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [error, setError] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("add");

    const fetchCategory = () => {
        sellerFetchCategories()
            .then((res) => {
                setCategories(res.content);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories.");
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchCategory()
    }, []);

    const handleSaveCategory = async (newCategory) => {
        if (dialogMode === "add") {
            await adminAddCategory(newCategory)
            fetchCategory();
        } else if (dialogMode === "update") {
            await adminUpdateCategory(newCategory)
            fetchCategory();
        }
    };

    const handleEditCategory = (category) => () => {
        setSelectedCategory(category);
        setDialogMode("update");
        setIsDialogOpen(true);
    };

    const handleDeleteCategory = (id) => async () => {
        await adminDeleteCategory(id)
        fetchCategory()
    }
    return (
        <div className="min-h-full">
            <AdminHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                        onClick={() => setIsDialogOpen(true)}>
                        Add Category
                    </button>
                    {loading ? (
                        <div className="text-center py-10">
                            <p className="text-gray-600">Loading categories...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10">
                            <p className="text-red-600">{error}</p>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-600">No categories available.</p>
                        </div>
                    ) : (
                        <div className="mt-3 overflow-hidden border rounded-lg shadow-sm bg-white">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Parent
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {categories.map((category) => (
                                        <tr key={category.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900">{category.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{category.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{category.parentCategory?.name ?? 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <button
                                                    onClick={handleEditCategory(category)}
                                                    className="text-blue-600 hover:text-blue-800" >
                                                    Edit
                                                </button>
                                            </td><td className="px-6 py-4 text-sm text-gray-500">
                                                <button
                                                    onClick={handleDeleteCategory(category.id)}
                                                    className="text-red-600 hover:text-red-800" >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <AddCategoryDialog
                    isOpen={isDialogOpen}
                    onClose={() => {
                        setIsDialogOpen(false)
                        setSelectedCategory(null)
                    }}
                    onSubmit={handleSaveCategory}
                    mode={dialogMode}
                    initialData={selectedCategory}
                />
            </main>
        </div>

    );
};

export default ManageCategories;