import Loading from "components/layout/Loading";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { adminFetchUsers } from "services/adminService";

const AdminUserTable = () => {

  const [users, setUsers] = useState()
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true)
    adminFetchUsers(currentPage - 1).then(res => {
      setUsers(res);
    }).catch(err => {
      setError(true)
      console.err(err)
    }).finally(() => {
      setLoading(false)
    });
  }, [currentPage])


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  if (error || loading) {
    return <Loading />
  }
  return (
    <>
      <div className="overflow-hidden border rounded-lg shadow-sm bg-white mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users && users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.roles.map((role) => role.roleType).join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={users?.totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default AdminUserTable;