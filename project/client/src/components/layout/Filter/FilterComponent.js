import React, { useEffect, useState } from "react";
import RangeSlider from "../../common/RangeSlider";
import { fetchFilterConfig } from "services/productService";
import MultiSelectCheckbox from "components/common/MultiSelectCheckbox";
import SingleChoiceSelect from "components/common/SingleChoiceSelect";
import TreeWithMultiSelect from "components/common/TreeWithMultiSelect";

const FilterComponent = ({ onFilterChanged }) => {
    const [priceRange, setPriceRange] = useState({ minPrice: 100, maxPrice: 6000 }); // State for Price range
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [newArrival, setNewArrival] = useState(null);

    const [filterConfig, setFilterConfig] = useState(null);

    {/* Update filter when any of the filter options change */}
    useEffect(() => {
        onFilterChanged({ priceRange: priceRange, categoryids: categories, brand: brands, color: colors, size: sizes, material: materials, isnewarrival:newArrival });
    }, [priceRange, categories, brands, colors, sizes, materials, newArrival]);

    {/* Fetch filter configuration */}
    useEffect(() => {
        fetchFilterConfig().then((response) => {
            setFilterConfig(response);
        });
    }, [priceRange]);

    {/* Handle Price range change */}
    const handlePriceRangeChanged = (min, max) => {
        // console.log(min, max);
        setPriceRange({ minPrice: min, maxPrice: max });
    };

    {/* Handle Category change */}
    const handleCategoryChanged = (selectedCategories) => {
        // console.log(selectedCategories);
        setCategories(selectedCategories);
    }

    {/* Handle Brand change */}
    const handleBrandChanged = (selectedBrands) => {
        // console.log(selectedBrands);
        setBrands(selectedBrands);
    }

    {/* Handle Color change */}
    const handleColorChanged = (selectedColors) => {
        // console.log(selectedColors);
        setColors(selectedColors);
    }

    {/* Handle Size change */}
    const handleSizeChanged = (selectedSizes) => {
        // console.log(selectedSizes);
        setSizes(selectedSizes);
    }

    {/* Handle Material change */}
    const handleMaterialChanged = (selectedMaterials) => {
        // console.log(selectedMaterials);
        setMaterials(selectedMaterials);
    }

    {/* Handle New Arrival change */}
    const handleNewArrivalChanged = (selectedOption) => {
        // console.log(`selectedOption: ${selectedOption}`);
        setNewArrival(selectedOption);
    };

    if (!filterConfig) {
        return <></>;
    }

    return (
        <div className="w-72 p-6 bg-white shadow rounded-lg">
            {/* Price range */}
            <div>
                <h3 className="text-left font-semibold mb-2">Price</h3>
                <RangeSlider minLimit={0} maxLimit={2000} onValueChanged={handlePriceRangeChanged} />

            </div>

            {/* Category/Subcategory */}
            <div className="mb-6">
                <h3 className="text-left font-semibold mb-2">Category</h3>
                <TreeWithMultiSelect
                    data={filterConfig.categories}
                    onSelectionChange={handleCategoryChanged}
                />
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
        </div>
    );
};

export default FilterComponent;
