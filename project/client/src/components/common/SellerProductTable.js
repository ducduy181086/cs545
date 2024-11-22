import Loading from "components/layout/Loading";
import Pagination from "components/Pagination";
import AuthContext from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { adminFetchProducts } from "services/adminService";
import { sellerFetchProducts } from "services/sellerService";


const ProductTable = () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [products, setProducts] = useState()
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (user.role === 'ADMIN') {
            adminFetchProducts(currentPage - 1).then(res => {
                setProducts(res);
            }).catch(err => {
                setError(true);
                console.log(err)
            }).finally(() => {
                setLoading(false);
            });
        } else {
            sellerFetchProducts(user.ownerId, currentPage - 1).then(res => {
                setProducts(res);
            }).catch(err => {
                setError(true);
                console.err(err)
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [currentPage])


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewDetail = (productId) => {
        console.log('handleViewDetail of id: ', productId)
        navigate(`${productId}`);
    }

    if (error || loading) {
        return <Loading />
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Can Delete</th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th> */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products?.content && products?.content.map((product) => (
                        <tr key={product.id}
                            onClick={() => handleViewDetail(product.id)}
                        >
                            <td className="px-6 py-4 text-sm text-gray-900">{product.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{product.category.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">${product.price.toFixed(2)}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{product.quantity === 0 ? 'Out of stock' : product.quantity}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{product.discount}%</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{product.canDelete ? 'Yes' : 'No'}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <Pagination
            currentPage={currentPage}
            totalPages={products?.totalPages}
            onPageChange={handlePageChange}
        />
    </>
}

export default ProductTable;