import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // try to fetch current user on mount
    (async () => {
      try {
        const data = await authApi.me();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signup = async (payload) => {
    setError(null);
    await authApi.register(payload);
    // backend sends OTP to email; user will go to verify page manually
  };

  const verifyOtp = async (payload) => {
    setError(null);
    const data = await authApi.verifyOtp(payload);
    setUser(data.user);
    return data;
  };

  const login = async (payload) => {
    setError(null);
    const data = await authApi.login(payload);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    setError,
    signup,
    verifyOtp,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);


