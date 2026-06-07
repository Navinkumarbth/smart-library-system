import { useState } from "react";
import { authApi } from "../../../services/api.js";

function ForgotPassword({ goToLogin }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await authApi.forgetPassword({ email });
      setMessage(`If an account exists, an email was sent to ${email}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        <p className="text-sm text-gray-500 mb-4">Enter your account email and we'll send a password reset link.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          {message && <p className="text-xs text-green-600">{message}</p>}
          <div className="flex gap-2">
            <button disabled={loading} className="px-4 py-2 bg-black text-white rounded">
              {loading ? "Sending..." : "Send Email"}
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

export default ForgotPassword;
