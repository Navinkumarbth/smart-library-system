import Navbar from "../../Layout/Navbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import Footer from "../../Layout/Footer.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { formatDate } from "../../../utils/helpers.js";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-xl font-semibold mb-2">Profile</h1>

          <div className="bg-white rounded shadow-sm p-6 max-w-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {user?.name || "User"}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Role: {user?.role || "User"}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Member since:</span>{" "}
                {user?.createdAt ? formatDate(user.createdAt) : "-"}
              </p>
              <p>
                <span className="font-medium">Verified account:</span>{" "}
                {user?.accountVerified ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;


