import AttributeSelector from 'components/common/AttributeSelector';
import ProductQuantity from 'components/common/ProductQuantity';
import React, { useState } from 'react';

const ProductAttribute = ({ product }) => {

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSelectedSizeChanged = (size) => {
    setSelectedSize(size);
  }

  const handleSelectedColorChanged = (color) => {
    setSelectedColor(color);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">

      {/* Product Size */}
      <p className="mt-2 text-md text-gray-600">
        <AttributeSelector title={'Size'} data={product.size} selectedValue={selectedSize} onSelectedChange={handleSelectedSizeChanged} />
      </p>

      {/* Product Color */}
      <p className="mt-2 text-md text-gray-600">
        <AttributeSelector title={'Color'} data={product.color} selectedValue={selectedColor} onSelectedChange={handleSelectedColorChanged} />
      </p>

      {/* Product qty */}
      <ProductQuantity />

    </div>
  );
};

export default ProductAttribute;
