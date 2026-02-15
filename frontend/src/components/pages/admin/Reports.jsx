import { useEffect, useState } from "react";
import Navbar from "../../Layout/Navbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import Footer from "../../Layout/Footer.jsx";
import { borrowApi } from "../../../services/api.js";
import { formatCurrency, formatDate } from "../../../utils/helpers.js";

function AdminReports() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("borrowed");

  const loadRecords = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await borrowApi.adminBorrowedList();
      setRecords(data.borrowedBooks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const filtered =
    activeTab === "overdue"
      ? records.filter((r) => r.fine && r.fine > 0)
      : records;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="catalog" isAdmin onChange={() => { }} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 space-y-4">
          <h1 className="text-xl font-semibold mb-2">Borrowed Books Report</h1>

          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setActiveTab("borrowed")}
              className={`px-4 py-1.5 text-xs rounded-t ${activeTab === "borrowed"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
                }`}
            >
              Borrowed Books
            </button>
            <button
              onClick={() => setActiveTab("overdue")}
              className={`px-4 py-1.5 text-xs rounded-t ${activeTab === "overdue"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
                }`}
            >
              Overdue Borrowers
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
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Due Date</th>
                    <th className="px-4 py-2">Date &amp; Time</th>
                    <th className="px-4 py-2">Return</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item, index) => (
                      <tr
                        key={item._id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 text-xs">{index + 1}</td>
                        <td className="px-4 py-2 text-xs">
                          {item.user?.name}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {item.user?.email}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {formatDate(item.dueDate)}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {item.returnDate ? "Returned" : "Pending"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminReports;


