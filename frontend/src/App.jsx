import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Signup from "./components/pages/auth/Signup.jsx";
import Login from "./components/pages/auth/Login.jsx";
import VerifyEmail from "./components/pages/auth/VerifyEmail.jsx";
import AdminDashboard from "./components/pages/admin/Dashboard.jsx";
import AdminBooks from "./components/pages/admin/Books.jsx";
import AdminReports from "./components/pages/admin/Reports.jsx";
import AdminUsers from "./components/pages/admin/User.jsx";
import BooksCatalog from "./components/pages/BooksCatalog.jsx";
import BorrowedBooks from "./components/pages/BorrowedBooks.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import Setting from "./components/pages/user/Setting.jsx";
import UserDashboard from "./components/pages/user/Dashboard.jsx";
import Profile from "./components/pages/user/Profile.jsx";

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen" />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen" />;
  return user?.role === "Admin" ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  const navigate = useNavigate();
  const [emailForOtp, setEmailForOtp] = useState("");

  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <Signup
            onRegistered={(email) => {
              setEmailForOtp(email);
              navigate("/verify-email");
            }}
            goToLogin={() => navigate("/login")}
          />
        }
      />
      <Route
        path="/login"
        element={<Login goToSignup={() => navigate("/signup")} />}
      />
      <Route
        path="/verify-email"
        element={
          <VerifyEmail email={emailForOtp} goToLogin={() => navigate("/login")} />
        }
      />

      {/* User routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <BooksCatalog />
          </PrivateRoute>
        }
      />
      <Route
        path="/borrowed"
        element={
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/books"
        element={
          <PrivateRoute>
            <AdminRoute>
              <AdminBooks />
            </AdminRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <PrivateRoute>
            <AdminRoute>
              <AdminReports />
            </AdminRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute>
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Setting />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

import { useState } from "react";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
