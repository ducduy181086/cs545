import AttributeSelector from 'components/common/AttributeSelector';
import ImageSlider from 'components/common/ImageSlider';
import React from 'react';

const ProductInfo = ({ product }) => {
  const {
    name,
    category,
    subcategory,
    price,
    brand,
    size,
    color,
    material,
    discount,
    ratings,
  } = product;

const images= [
  "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470067/sub/goods_470067_sub13_3x4.jpg",
  "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470067/sub/goods_470067_sub14_3x4.jpg",
  "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/470067/sub/goods_470067_sub17_3x4.jpg",
  "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/470067/item/usgoods_32_470067_3x4.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f3cc9c184bf84995b2b66713ec497643_9366/ADIZERO_ADIOS_PRO_3_Shoes_Blue_ID3635_HM6.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cb1009c258fa40a5bfc01aa56b2aa639_9366/ADIZERO_ADIOS_PRO_3_Shoes_Blue_ID3635_HM7.jpg",
  "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/03da0a9cd40d48358bcb5b008e78abe4_9366/ADIZERO_ADIOS_PRO_3_Shoes_Blue_ID3635_HM8.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3fbb78d5996548b4a295374463c68647_9366/ADIZERO_ADIOS_PRO_3_Shoes_Blue_ID3635_HM9.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/be1706307aa8424e8fb36864db7e48b9_9366/ADIZERO_ADIOS_PRO_3_Shoes_Blue_ID3635_HM10.jpg"
];

  // Format the price and discount to show in a readable way
  const formattedPrice = price.toFixed(2);
  const discountedPrice = (price - (price * discount) / 100).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">

      <ImageSlider images={images} />
      {/* Product Name */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{name??''}</h1>

      {/* Product Category and Subcategory */}
      <p className="text-md text-gray-600">
        <span className="font-semibold">Category:</span> {category.name} ●{' '}
        {subcategory}
      </p>

      {/* Product Price and Discount */}
      <p className="text-xl font-bold text-red-500 mt-6">${formattedPrice}</p>
      <div className="mt-2 flex items-center">
        {discount > 0 && (
          <span className="text-md line-through text-gray-500">
            ${discountedPrice}
          </span>
        )}
        {discount > 0 && (
          <p>
          <span className="ml-4 text-md text-red-500">
            -{discount}%
          </span>
          <span className="ml-1 text-md text-gray-500"> Original price</span>
          </p>
        )}

      </div>

      {/* Product Brand */}
      <p className="mt-2 text-md text-gray-600">
        <span className="font-semibold">Brand:</span> {brand}
      </p>

      {/* Product Size */}
      <p className="mt-2 text-md text-gray-600">
        <span className="font-semibold">Size:</span> {size.join(', ')}
      </p>

      {/* Product Color */}
      <p className="mt-2 text-md text-gray-600">
        <span className="font-semibold">Color:</span> {color.join(', ')}
      </p>

      {/* Product Material */}
      <p className="mt-2 text-md text-gray-600">
        <span className="font-semibold">Material:</span> {material}
      </p>

       {/* Test */}
       <AttributeSelector title={'Size'}/>


    </div>
  );
};

export default ProductInfo;
