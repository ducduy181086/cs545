import Pagination from "components/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router";


const ProductTable = (props) => {

    const navigate = useNavigate();

    const { products } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const totalPages = Math.ceil(products.length / productsPerPage);

    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewDetail = (productId) => {
        console.log('handleViewDetail of id: ', productId)
        navigate(`${productId}`);
    }

    return <>
        <div className="overflow-hidden border rounded-lg shadow-sm bg-white mt-4">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th> */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentProducts.map((product) => (
                        <tr key={product.id}
                            onClick={() => handleViewDetail(product.id)}
                        >
                            <td className="px-6 py-4 text-sm text-gray-900">{product.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{product.category.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">${product.price.toFixed(2)}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{product.brand}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{product.size.join(", ")}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{product.color.join(", ")}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{product.material}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{product.discount}</td>
                            {/* <td className="px-6 py-4 text-sm text-gray-500">
                                <button className="text-red-600 hover:text-red-800">
                                    Delete
                                </button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    </>
}

export default ProductTable;