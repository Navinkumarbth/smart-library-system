import { useState } from "react";
import { useParams } from "react-router-dom";
import { authApi } from "../../../services/api.js";

function ResetPassword({ goToLogin }) {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await authApi.resetPassword(token, { password, confirmPassword });
      setMessage("Password reset successful. You may sign in now.");
      setTimeout(() => goToLogin(), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password (8-16 chars)"
            minLength={8}
            maxLength={16}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            minLength={8}
            maxLength={16}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          {message && <p className="text-xs text-green-600">{message}</p>}
          <div className="flex gap-2">
            <button disabled={loading} className="px-4 py-2 bg-black text-white rounded">
              {loading ? "Saving..." : "Reset Password"}
            </button>
            <button type="button" onClick={goToLogin} className="px-4 py-2 border rounded">
              Back to Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
