import AdminHeader from "./AdminHeader";
import AdminUserTable from "components/common/AdminUserTable";

const ManageUsers = () => {

    return <>
        <div className="min-h-full">
            <AdminHeader />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Users</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <AdminUserTable />
                </div>
            </main>
        </div>
    </>
}

export default ManageUsers