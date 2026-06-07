import Navbar from "../../Layout/Navbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import Footer from "../../Layout/Footer.jsx";
import { useState } from "react";
import { authApi } from "../../../services/api.js";

function Setting() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await authApi.updatePassword(form);
      setMessage("Password updated successfully.");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onChange={() => { }} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 space-y-4">
          <h1 className="text-xl font-semibold mb-2">Change Credentials</h1>

          <div className="bg-white rounded shadow-sm max-w-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="password"
                name="currentPassword"
                placeholder="Enter Current Password"
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="Enter New Password"
                value={form.newPassword}
                onChange={handleChange}
                minLength={8}
                maxLength={16}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              />
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                value={form.confirmNewPassword}
                onChange={handleChange}
                minLength={8}
                maxLength={16}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              />

              {error && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">
                  {error}
                </p>
              )}
              {message && (
                <p className="text-xs text-green-600 bg-green-50 border border-green-100 rounded px-3 py-2">
                  {message}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-xs bg-black text-white rounded disabled:opacity-60"
                >
                  {loading ? "UPDATING..." : "CONFIRM"}
                </button>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Setting;


