import CategoryListbox from "components/common/CategoryListBox";
import React, { useEffect, useState } from "react";
import { sellerFetchCategoriesItems } from "services/sellerService";

const ProductForm = (props) => {

  const { mode = "add", initialData = {}, onSubmit } = props;

  const [categories, setCategories] = useState()

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: null,
    price: "",
    brand: "",
    sizes: "",
    colors: "",
    material: "",
    discount: "",
    quantity: "",
    imageUrl: "",
    ...initialData,
    sizes: initialData.sizes?.join(", ") || "",
    colors: initialData.colors?.join(", ") || "",
  });

  const isViewMode = mode === "view";
  const isUpdateMode = mode === "update";

  useEffect(() => {
    sellerFetchCategoriesItems()
      .then((res) => {
        setCategories(res); // Dynamically load categories
        if (isUpdateMode && initialData?.category) {
          // Ensure pre-selection of category in update mode
          const selectedCategory = res.find(
            (category) => category.id === initialData.category.id
          );
          if (selectedCategory) {
            setProduct((prevProduct) => ({
              ...prevProduct,
              category: selectedCategory,
            }));
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

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
      !product.sizes ||
      !product.colors ||
      !product.material ||
      !product.discount ||
      !product.quantity ||
      !product.imageUrl
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const sizesArray = product.sizes.split(",").map((size) => size.trim());
    const colorsArray = product.colors.split(",").map((size) => size.trim());

    onSubmit({
      id: product.id ?? 0,
      name: product.name,
      description: product.description,
      ccategoryId: product.category.id,
      price: parseFloat(product.price),
      brand: product.brand,
      sizes: sizesArray,
      colors: colorsArray,
      material: product.material,
      discount: parseFloat(product.discount),
      quantity: parseInt(product.quantity),
      imageUrl: product.imageUrl
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
        </div><div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
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
            categoryData={categories || []} // Use fetched categories or an empty array as fallback
            selectedCategory={product.category} // Pre-select the current category in update mode
            onSelectCategory={handleChangeCategory} // Handle category changes
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
          <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            id="sizes"
            name="sizes"
            value={product.sizes}
            onChange={handleChange}
            disabled={isViewMode}
            className={`mt-1 block w-full px-3 py-2 border ${isViewMode ? "bg-gray-100" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
        </div>
        <div>
          <label htmlFor="colors" className="block text-sm font-medium text-gray-700">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            id="colors"
            name="colors"
            value={product.colors}
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
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            disabled={isViewMode}
            className={`mt-1 block w-full px-3 py-2 border ${isViewMode ? "bg-gray-100" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          <img
            src={product.imageUrl ?? 'https://via.placeholder.com/180x160'}
            alt={product.name}
            className="mt-4 max-w-[180px] max-h-[160px] min-w-[120px] min-h-[100px] object-cover rounded-md"
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
