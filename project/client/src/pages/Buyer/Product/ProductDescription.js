import React from "react";

const ProductDescription = ({ description }) => {

  return (
    <div className="prose max-w-none mt-12 border-t pt-4">
      <h2 className="text-lg font-bold mb-4">Description</h2>
      {/* Render the description as HTML */}
      <div dangerouslySetInnerHTML={{ __html: description ?? '' }} />
    </div>
  );
};

export default ProductDescription;
