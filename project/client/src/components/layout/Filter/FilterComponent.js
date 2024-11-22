import React, { useEffect, useState } from "react";
import RangeSlider from "../../common/RangeSlider";
import { fetchFilterConfig } from "services/productService";
import MultiSelectCheckbox from "components/common/MultiSelectCheckbox";
import MultiSelectCheckboxWithChildren from "components/common/MultiSelectCheckboxWithChildren";
import SingleChoiceSelect from "components/common/SingleChoiceSelect";

const FilterComponent = ({ onFilterChanged }) => {
    const [minOrder, setMinOrder] = useState(500); // State for Min Order slider
    const [priceRange, setPriceRange] = useState({ min: 100, max: 6000 }); // State for Price range
    const [filterConfig, setFilterConfig] = useState(null);

    useEffect(() => {
        onFilterChanged({ minOrder, priceRange });
    }, [minOrder, priceRange]);

    useEffect(() => {
        fetchFilterConfig().then((response) => {
            setFilterConfig(response);
        });
    }, [minOrder, priceRange]);

    const handleCategoryChanged = (selectedCategories) => {
        console.log(selectedCategories);
    }

    const handleBrandChanged = (selectedBrands) => {
        console.log(selectedBrands);
    }

    const handleColorChanged = (selectedColors) => {
        console.log(selectedColors);
    }

    const handleSizeChanged = (selectedSizes) => {
        console.log(selectedSizes);
    }

    const handleMaterialChanged = (selectedMaterials) => {
        console.log(selectedMaterials);
    }

    const handleNewArrivalChanged = (selectedOption) => {
        console.log(selectedOption);
    };

    if (!filterConfig) {
        return <></>;
    }

    return (
        <div className="w-72 p-6 bg-white shadow rounded-lg">
            {/* Price range */}
            <div>
                <h3 className="text-left font-semibold mb-2">Price</h3>
                <RangeSlider />

            </div>

            {/* Category/Subcategory */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">Category</h3>
                {/* <MultiSelectCheckboxWithChildren
                    options={filterConfig.categories}
                    onSelectionChange={handleCategoryChanged}
                /> */}
            </div>

            {/* New Arrival */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">New Arrival</h3>
                <SingleChoiceSelect
                    options={['Yes', 'No']}
                    onChange={handleNewArrivalChanged} />
            </div>

            {/* Brand */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">Brand</h3>
                <MultiSelectCheckbox
                    options={filterConfig.brands}
                    onSelectionChange={handleBrandChanged}
                />
            </div>

            {/* Color */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">Color</h3>
                <MultiSelectCheckbox
                    options={filterConfig.colors}
                    onSelectionChange={handleColorChanged}
                />
            </div>

            {/* Size */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">Size</h3>
                <MultiSelectCheckbox
                    options={filterConfig.sizes}
                    onSelectionChange={handleSizeChanged}
                />
            </div>

            {/* Material */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">Material</h3>
                <MultiSelectCheckbox
                    options={filterConfig.materials}
                    onSelectionChange={handleMaterialChanged}
                />
            </div>

            {/* Ratings and Reviews */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">Ratings and Reviews</h3>
                <div className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" id="ready-to-ship" className="w-4 h-4" checked />
                    <label htmlFor="ready-to-ship" className="text-sm">Ready to Ship</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="paid-samples" className="w-4 h-4" checked />
                    <label htmlFor="paid-samples" className="text-sm">Paid Samples</label>
                </div>
            </div>

            {/* Discount and Offers */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">Discount and Offers </h3>
                <div className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" id="ready-to-ship" className="w-4 h-4" checked />
                    <label htmlFor="ready-to-ship" className="text-sm">Ready to Ship</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="paid-samples" className="w-4 h-4" checked />
                    <label htmlFor="paid-samples" className="text-sm">Paid Samples</label>
                </div>
            </div>

            {/* New Arrivals */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">New Arrivals</h3>
                <div className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" id="ready-to-ship" className="w-4 h-4" checked />
                    <label htmlFor="ready-to-ship" className="text-sm">Ready to Ship</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="paid-samples" className="w-4 h-4" checked />
                    <label htmlFor="paid-samples" className="text-sm">Paid Samples</label>
                </div>
            </div>

            {/* Best Sellers */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">Best Sellers</h3>
                <div className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" id="ready-to-ship" className="w-4 h-4" checked />
                    <label htmlFor="ready-to-ship" className="text-sm">Ready to Ship</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="paid-samples" className="w-4 h-4" checked />
                    <label htmlFor="paid-samples" className="text-sm">Paid Samples</label>
                </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">Availability</h3>
                <div className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" id="ready-to-ship" className="w-4 h-4" checked />
                    <label htmlFor="ready-to-ship" className="text-sm">Ready to Ship</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="paid-samples" className="w-4 h-4" checked />
                    <label htmlFor="paid-samples" className="text-sm">Paid Samples</label>
                </div>
            </div>

            {/* Product Type */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">Product Type</h3>
                <div className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" id="new-stuff" className="w-4 h-4" />
                    <label htmlFor="new-stuff" className="text-sm">New Stuff</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="second-hand" className="w-4 h-4" />
                    <label htmlFor="second-hand" className="text-sm">Second hand</label>
                </div>
            </div>
        </div>
    );
};

export default FilterComponent;
