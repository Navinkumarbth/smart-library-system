import { useEffect, useMemo, useState } from "react";
import Navbar from "../../Layout/Navbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import Footer from "../../Layout/Footer.jsx";
import UserForm from "../../Forms/UserForm.jsx";
import { userApi } from "../../../services/api.js";
import { useToast } from "../../../context/ToastContext.jsx";

function AdminUsers() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await userApi.getAll();
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const lower = query.toLowerCase();
    return users.filter((user) => {
      return `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(lower);
    });
  }, [users, query]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const visibleUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const handleAddAdmin = async (form) => {
    try {
      await userApi.addAdmin(form);
      setShowAddModal(false);
      toast?.success?.("Admin created successfully.");
      loadUsers();
    } catch (err) {
      toast?.error?.(err.message);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await userApi.updateRole(userId, role);
      toast?.success?.("User role updated.");
      loadUsers();
    } catch (err) {
      toast?.error?.(err.message);
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      await userApi.toggleStatus(user._id, !user.isActive);
      toast?.info?.(user.isActive ? "User deactivated." : "User reactivated.");
      loadUsers();
    } catch (err) {
      toast?.error?.(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="users" isAdmin />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold">User Management</h1>
              <p className="text-sm text-gray-500">Promote users, deactivate accounts, and add new admins.</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 text-sm bg-black text-white rounded"
            >
              + Add New Admin
            </button>
          </div>

          <div className="bg-white rounded shadow-sm p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, role..."
              className="w-full sm:max-w-md border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <button onClick={loadUsers} className="px-3 py-2 border rounded text-sm">
              Refresh
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">
              {error}
            </p>
          )}

          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-center text-gray-500">Loading...</td>
                    </tr>
                  ) : visibleUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No users found.</td>
                    </tr>
                  ) : (
                    visibleUsers.map((user, index) => (
                      <tr key={user._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2 text-xs">{(page - 1) * pageSize + index + 1}</td>
                        <td className="px-4 py-2 text-xs">{user.name}</td>
                        <td className="px-4 py-2 text-xs">{user.email}</td>
                        <td className="px-4 py-2 text-xs">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            className="border rounded px-2 py-1 text-xs"
                          >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-4 py-2 text-xs">
                          <span className={`px-2 py-1 rounded text-xs ${user.isActive === false ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                            {user.isActive === false ? "Inactive" : "Active"}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-xs text-right">
                          <button
                            onClick={() => handleToggleStatus(user)}
                            className="px-3 py-1 border rounded text-[11px]"
                          >
                            {user.isActive === false ? "Reactivate" : "Deactivate"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t text-sm">
              <p>
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5">
            <h2 className="text-sm font-semibold mb-3">Add New Admin</h2>
            <UserForm
              onSubmit={handleAddAdmin}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
