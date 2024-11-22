import React, { useState } from "react";

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${
          currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-white"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-white hover:bg-blue-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded ${
          currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
