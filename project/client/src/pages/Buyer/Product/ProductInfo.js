import AttributeSelector from 'components/common/AttributeSelector';
import ImageSlider from 'components/common/ImageSlider';
import ProductQuantity from 'components/common/ProductQuantity';
import React, { useState } from 'react';
import ProductDescription from './ProductDescription';

const ProductInfo = ({ product }) => {

  const images = [
    product.imageUrl
  ];

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSelectedSizeChanged = (size) => {
    setSelectedSize(size);
  }

  const handleSelectedColorChanged = (color) => {
    setSelectedColor(color);
  }

  // Format the price and discount to show in a readable way
  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">

      <ImageSlider images={images} />

      <div className='flex justify-between items-center border-b'>
        <div className='w-full'>
          {/* Product Name */}
          <h1 className="text-xl font-bold text-gray-800 mt-8">{product.name ?? ''}</h1>

          {/* Product Category and Subcategory */}
          <p className="text-md text-gray-600 pb-2">
            <span className="font-semibold">Category:</span> {product.category.name}
            {product.subcategory && <span> '● ' {product.subcategory.name}</span>}
          </p>
        </div>
        
        <div className='w-60'>
        {product.newArrival && (
            <span className="w-4 mr-4 text-xs bg-green-300 text-black font-semibold px-2 py-1 rounded-full z-10">
              New Arrival
            </span>
          )}

          {product.bestSeller && (
            <span className=" text-xs bg-yellow-300 text-black font-semibold px-2 py-1 rounded-full z-10">
              Bestseller
            </span>
          )}
        </div>
       
      </div>

      {/* Product Price and Discount */}
      <p className="text-xl font-bold text-red-500 mt-6">${product.price}</p>
      <div className="mt-2 flex items-center">
        {product.discount > 0 && (
          <span className="text-md line-through text-blue-500">
            ${(product.price + product.discount).toFixed(2)}
          </span>
        )}
        {product.discount > 0 && (
          <p>
            <span className="ml-4 text-md text-red-500">
              -${product.discount}
            </span>
            <span className="text-md text-gray-500"> Original price</span>
          </p>
        )}

      </div>

      {/* Product Brand */}
      <p className="mt-2 text-md text-gray-600">
        <span className="font-semibold">Brand:</span> {product.brand}
      </p>

      {/* Product Model */}
      <p className="mt-2 text-md text-gray-600">
        <span className="font-semibold">Model Year:</span> {product.modelYear}
      </p>

       {/* Instock */}
       <p className="mt-2 text-md text-gray-600">
        <span className="font-semibold">In Stock:</span> {product.inStock ?'Yes':'No'}
      </p>

      {/* Product Material */}
      <p className="mt-2 text-md text-gray-600">
        <span className="font-semibold">Material:</span> {product.material}
      </p>

       {/* Product Material */}
       <p className="mt-2 text-md text-gray-600">
        <span className="font-semibold">Features:</span> {product.features}
      </p>

      <div className='flex justify-start mb-4'>
        <div>
          {/* Product Size */}
          <p className="mt-2 text-md text-gray-600">
            <AttributeSelector title={'Size'} data={product.sizes} selectedValue={selectedSize} onSelectedChange={handleSelectedSizeChanged} />
          </p>


        </div>
        <div>
          {/* Product Color */}
          <p className="ml-12 mt-2 text-md text-gray-600">
            <AttributeSelector title={'Color'} data={product.colors} selectedValue={selectedColor} onSelectedChange={handleSelectedColorChanged} />
          </p>
        </div>
      </div>
      {/* Product qty */}
      <ProductQuantity />

      {/* Product desc */}
      <ProductDescription description={product.description} />

    </div>
  );
};

export default ProductInfo;
