import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Layout/Navbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import Footer from "../../Layout/Footer.jsx";
import { bookApi, borrowApi, userApi } from "../../../services/api.js";

function StatCard({ title, value, hint }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{title}</p>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
      <p className="mt-1 text-sm text-gray-500">{hint}</p>
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ books: 0, users: 0, requests: 0, borrowed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [booksData, usersData, requestsData, borrowedData] = await Promise.all([
          bookApi.getAll(),
          userApi.getAll(),
          borrowApi.getRequests().catch(() => ({ requests: [] })),
          borrowApi.adminBorrowedList().catch(() => ({ borrowedBooks: [] })),
        ]);
        setStats({
          books: booksData.books?.length || 0,
          users: usersData.users?.length || 0,
          requests: requestsData.requests?.length || 0,
          borrowed: borrowedData.borrowedBooks?.length || 0,
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar active="dashboard" isAdmin />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard title="Books" value={loading ? "-" : stats.books} hint="Available titles in catalog" />
                <StatCard title="Users" value={loading ? "-" : stats.users} hint="Verified user accounts" />
                <StatCard title="Borrow Requests" value={loading ? "-" : stats.requests} hint="Pending + handled requests" />
                <StatCard title="Borrow Records" value={loading ? "-" : stats.borrowed} hint="Active historical borrow logs" />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <h2 className="font-semibold mb-3">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => navigate("/admin/books")} className="px-4 py-2 rounded bg-black text-white text-sm">Manage Books</button>
                  <button onClick={() => navigate("/admin/requests")} className="px-4 py-2 rounded border text-sm">Review Requests</button>
                  <button onClick={() => navigate("/admin/users")} className="px-4 py-2 rounded border text-sm">Manage Users</button>
                  <button onClick={() => navigate("/admin/reports")} className="px-4 py-2 rounded border text-sm">View Reports</button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <h2 className="font-semibold mb-3">Library Operations</h2>
                <p className="text-sm text-gray-600 leading-6">
                  Use the admin sections to add or edit books, review borrow requests, manage user roles, and monitor borrow history. This dashboard now reflects live counts from the backend.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-[320px] space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <h3 className="font-semibold mb-2">Admin Notes</h3>
                <p className="text-sm text-gray-600">Review pending requests daily and keep the catalog updated for active users.</p>
              </div>
              <div
                className="text-white rounded-xl shadow-sm p-5"
                style={{ backgroundImage: "linear-gradient(to bottom right, #111827, #374151)" }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-gray-300">Status</p>
                <p className="mt-2 text-2xl font-semibold">{loading ? "Loading..." : "Live"}</p>
                <p className="mt-1 text-sm text-gray-200">Dashboard connected to current API data.</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminDashboard;
