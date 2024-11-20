import CategoryListbox from "components/common/CategoryListBox";
import React, { useState } from "react";
import categoryData from '../../mock_categories.json'

const ProductForm = (props) => {

  const { mode = "add", initialData = {}, onSubmit } = props;
  const [product, setProduct] = useState({
    name: "",
    category: null,
    price: "",
    brand: "",
    size: "",
    color: "",
    material: "",
    discount: "",
    quantity: "",
    ...initialData,
  });

  const isViewMode = mode === "view";
  const isUpdateMode = mode === "update";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleChangeCategory = (category) => {
    setProduct({
      ...product,
      category,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewMode) return;

    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.brand ||
      !product.size ||
      !product.color ||
      !product.material ||
      !product.discount ||
      !product.quantity
    ) {
      alert("Please fill in all fields.");
      return;
    }

    onSubmit({
      name: product.name,
      category: product.category,
      price: parseFloat(product.price),
      brand: product.brand,
      size: product.size,
      color: product.color,
      material: product.material,
      discount: parseFloat(product.discount),
      quantity: parseInt(product.quantity)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            disabled={isViewMode}
            className={`mt-1 block w-full px-3 py-2 border ${isViewMode ? "bg-gray-100" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          {/* Category dropdown */}
          <CategoryListbox
            categoryData={categoryData}
            selectedCategory={product.category}
            onSelectCategory={handleChangeCategory}
            disabled={isViewMode}
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            disabled={isViewMode}
            className={`mt-1 block w-full px-3 py-2 border ${isViewMode ? "bg-gray-100" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
        </div>
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            disabled={isViewMode}
            className={`mt-1 block w-full px-3 py-2 border ${isViewMode ? "bg-gray-100" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
        </div>
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">
            Size
          </label>
          <input
            type="text"
            id="size"
            name="size"
            value={product.size}
            onChange={handleChange}
            disabled={isViewMode}
            className={`mt-1 block w-full px-3 py-2 border ${isViewMode ? "bg-gray-100" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
        </div>
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={product.color}
            onChange={handleChange}
            disabled={isViewMode}
            className={`mt-1 block w-full px-3 py-2 border ${isViewMode ? "bg-gray-100" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
        </div>
        <div>
          <label htmlFor="material" className="block text-sm font-medium text-gray-700">
            Material
          </label>
          <input
            type="text"
            id="material"
            name="material"
            value={product.material}
            onChange={handleChange}
            disabled={isViewMode}
            className={`mt-1 block w-full px-3 py-2 border ${isViewMode ? "bg-gray-100" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
        </div>
        <div>
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            disabled={isViewMode}
            className={`mt-1 block w-full px-3 py-2 border ${isViewMode ? "bg-gray-100" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            disabled={isViewMode}
            className={`mt-1 block w-full px-3 py-2 border ${isViewMode ? "bg-gray-100" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
        </div>
      </div>
      {!isViewMode && (
        <button
          type="submit"
          className="mt-8 w-full px-4 py-2 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isUpdateMode ? "Save Product" : "Add Product"}
        </button>
      )}
    </form>
  );
};

export default ProductForm;
