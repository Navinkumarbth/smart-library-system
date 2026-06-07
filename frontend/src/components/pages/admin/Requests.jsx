import { useEffect, useMemo, useState } from "react";
import Navbar from "../../Layout/Navbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import Footer from "../../Layout/Footer.jsx";
import { borrowApi } from "../../../services/api.js";
import { formatDate } from "../../../utils/helpers.js";
import { useToast } from "../../../context/ToastContext.jsx";

function AdminRequests() {
  const toast = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);

  const loadRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await borrowApi.getRequests();
      setRequests(data.requests || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return requests.filter((request) => {
      const text = `${request.user?.name} ${request.user?.email} ${request.book?.title} ${request.status}`.toLowerCase();
      return text.includes(lower);
    });
  }, [requests, query]);

  const toggleSelected = (requestId) => {
    setSelected((current) =>
      current.includes(requestId)
        ? current.filter((id) => id !== requestId)
        : [...current, requestId],
    );
  };

  const handleAction = async (requestId, action) => {
    try {
      if (action === "approve") {
        await borrowApi.approveRequest(requestId);
        toast?.success?.("Request approved and borrow recorded.");
      } else {
        await borrowApi.declineRequest(requestId, { note: "Declined from admin dashboard" });
        toast?.info?.("Request declined.");
      }
      setSelected((current) => current.filter((id) => id !== requestId));
      loadRequests();
    } catch (err) {
      toast?.error?.(err.message);
    }
  };

  const handleBulk = async (action) => {
    const ids = [...selected];
    if (!ids.length) return;
    try {
      for (const requestId of ids) {
        if (action === "approve") {
          await borrowApi.approveRequest(requestId);
        } else {
          await borrowApi.declineRequest(requestId, { note: "Declined in bulk action" });
        }
      }
      toast?.success?.(`Bulk ${action} completed for ${ids.length} request(s).`);
      setSelected([]);
      loadRequests();
    } catch (err) {
      toast?.error?.(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="requests" isAdmin />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold">Borrow Requests</h1>
              <p className="text-sm text-gray-500">Approve or decline user borrow requests.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleBulk("approve")}
                disabled={!selected.length}
                className="px-4 py-2 text-sm bg-black text-white rounded disabled:opacity-50"
              >
                Bulk Approve
              </button>
              <button
                onClick={() => handleBulk("decline")}
                disabled={!selected.length}
                className="px-4 py-2 text-sm border rounded disabled:opacity-50"
              >
                Bulk Decline
              </button>
            </div>
          </div>

          <div className="bg-white rounded shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by user, email, book, status..."
              className="w-full sm:max-w-md border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <button onClick={loadRequests} className="text-sm px-3 py-2 border rounded">
              Refresh
            </button>
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">{error}</p>}

          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2">Select</th>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Book</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Requested</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-center text-gray-500">Loading...</td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No requests found.</td>
                    </tr>
                  ) : (
                    filtered.map((request) => (
                      <tr key={request._id} className="border-t">
                        <td className="px-4 py-2">
                          <input
                            type="checkbox"
                            checked={selected.includes(request._id)}
                            onChange={() => toggleSelected(request._id)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <div className="font-medium">{request.user?.name}</div>
                          <div className="text-xs text-gray-500">{request.user?.email}</div>
                        </td>
                        <td className="px-4 py-2">{request.book?.title}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${request.status === "Pending" ? "bg-yellow-100 text-yellow-800" : request.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-xs">{formatDate(request.createdAt)}</td>
                        <td className="px-4 py-2 text-right space-x-2">
                          <button
                            onClick={() => handleAction(request._id, "approve")}
                            disabled={request.status !== "Pending"}
                            className="px-3 py-1 text-xs bg-black text-white rounded disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(request._id, "decline")}
                            disabled={request.status !== "Pending"}
                            className="px-3 py-1 text-xs border rounded disabled:opacity-50"
                          >
                            Decline
                          </button>
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

export default AdminRequests;
