import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import ToastStack from "./components/Common/ToastStack.jsx";
import Signup from "./components/pages/auth/Signup.jsx";
import Login from "./components/pages/auth/Login.jsx";
import VerifyEmail from "./components/pages/auth/VerifyEmail.jsx";
import ForgotPassword from "./components/pages/auth/ForgotPassword.jsx";
import ResetPassword from "./components/pages/auth/ResetPassword.jsx";
import AdminDashboard from "./components/pages/admin/Dashboard.jsx";
import AdminBooks from "./components/pages/admin/Books.jsx";
import AdminRequests from "./components/pages/admin/Requests.jsx";
import AdminReports from "./components/pages/admin/Reports.jsx";
import AdminUsers from "./components/pages/admin/User.jsx";
import BooksCatalog from "./components/pages/BooksCatalog.jsx";
import BorrowedBooks from "./components/pages/BorrowedBooks.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import BookDetail from "./components/pages/BookDetail.jsx";
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
        element={<Login goToSignup={() => navigate("/signup")} goToForgotPassword={() => navigate("/password/forget")} />}
      />
      <Route path="/password/forget" element={<ForgotPassword goToLogin={() => navigate("/login")} />} />
      <Route path="/password/reset/:token" element={<ResetPassword goToLogin={() => navigate("/login")} />} />
      <Route path="/verify-email" element={<VerifyEmail email={emailForOtp} goToLogin={() => navigate("/login")} />} />

      <Route path="/" element={<PrivateRoute><BooksCatalog /></PrivateRoute>} />
      <Route path="/book/:id" element={<PrivateRoute><BookDetail /></PrivateRoute>} />
      <Route path="/borrowed" element={<PrivateRoute><BorrowedBooks /></PrivateRoute>} />
      <Route path="/user" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

      <Route path="/admin" element={<PrivateRoute><AdminRoute><AdminDashboard /></AdminRoute></PrivateRoute>} />
      <Route path="/admin/books" element={<PrivateRoute><AdminRoute><AdminBooks /></AdminRoute></PrivateRoute>} />
      <Route path="/admin/requests" element={<PrivateRoute><AdminRoute><AdminRequests /></AdminRoute></PrivateRoute>} />
      <Route path="/admin/reports" element={<PrivateRoute><AdminRoute><AdminReports /></AdminRoute></PrivateRoute>} />
      <Route path="/admin/users" element={<PrivateRoute><AdminRoute><AdminUsers /></AdminRoute></PrivateRoute>} />

      <Route path="/settings" element={<PrivateRoute><Setting /></PrivateRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-100">
          <ToastStack />
          <AppRoutes />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
