import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetchSellersUnapproved, adminPutSellersApprove } from "services/adminService";
import AdminHeader from "./AdminHeader";

const ManageSellersUnapproved = (props) => {
    const navigate = useNavigate()
    const [users, setUsers] = useState()
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = () => {
        adminFetchSellersUnapproved().then(res => {
            setUsers(res);
        }).catch(err => {
            navigate('/login')
        });
    }

    const handleApprove = (userId) => async (event) => {
        event.preventDefault();
        try {
            const result = adminPutSellersApprove(userId)
            if (result) {
                setIsSuccessDialogOpen(true);
                setErrorMessage('') //clear
                await handleFetch();
            } else {
                setErrorMessage('Error')
            }
        } catch (err) {
            setErrorMessage('Error')
        }
    }

    const handleDialogClose = () => {
        setIsSuccessDialogOpen(false);
    };

    return <>
        <div className="min-h-full">
            <AdminHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Unapproved Seller</h1>
                </div>
            </header>
            <main>

                {errorMessage && (
                    <div className="mt-4 rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                            </div>
                        </div>
                    </div>
                )}


                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {users
                        &&
                        <div className="overflow-hidden border rounded-lg shadow-sm bg-white mt-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        users?.content.length > 0 ? (
                                            users.content.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {user.roles[0].roleType}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        <button className="text-blue-600 hover:text-red-800"
                                                            onClick={handleApprove(user.id)}>
                                                            Approve
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No seller need approve.
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                    {/* Pagination Component */}
                    {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> */}
                </div>
            </main>
        </div>
        {isSuccessDialogOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Approved Seller Successful
                    </h3>
                    <p className="mt-4 text-gray-600">
                        This seller has been approved successfully.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleDialogClose}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
}

export default ManageSellersUnapproved