
import { classNames } from "../../utils/helpers.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const adminItems = [
  { id: "dashboard", label: "Dashboard", icon: "⏲", path: "/admin" },
  { id: "books", label: "Books", icon: "📚", path: "/admin/books" },
  { id: "catalog", label: "Catalog", icon: "📖", path: "/admin/reports" },
  { id: "users", label: "Users", icon: "👥", path: "/admin/users" },
];

const userItems = [
  { id: "dashboard", label: "Dashboard", icon: "⏲", path: "/user" },
  { id: "books", label: "Books", icon: "📚", path: "/" },
  { id: "borrowed", label: "My Borrowed Books", icon: "🏷", path: "/borrowed" },
];

function Sidebar({ isAdmin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const items = isAdmin ? adminItems : userItems;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex md:w-56 lg:w-64 bg-black text-white flex-col py-6">
      <div className="flex items-center gap-3 px-6 mb-8">
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-sm font-semibold">
          BW
        </div>
        <div>
          <p className="text-lg font-semibold">BookWorm</p>
          <p className="text-[11px] uppercase tracking-[0.25em]">Library</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" &&
              location.pathname.startsWith(item.path));

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={classNames(
                "w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition",
                isActive
                  ? "bg-white text-black"
                  : "text-gray-200 hover:bg-gray-800"
              )}
            >
              <span>{item.icon}</span>
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto px-6 pt-4 text-xs text-gray-400 hover:text-white text-left"
      >
        Log Out
      </button>
    </aside>
  );
}

export default Sidebar;





// import { classNames } from "../../utils/helpers.js";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext.jsx";

// const adminItems = [
//   { id: "dashboard", label: "Dashboard", icon: "⏲", path: "/admin" },
//   { id: "books", label: "Books", icon: "📚", path: "/admin/books" },
//   { id: "catalog", label: "Catalog", icon: "📖", path: "/admin/reports" },
//   { id: "users", label: "Users", icon: "👥", path: "/admin/users" },
// ];

// const userItems = [
//   { id: "dashboard", label: "Dashboard", icon: "⏲", path: "/user" },
//   { id: "books", label: "Books", icon: "📚", path: "/" },
//   { id: "borrowed", label: "My Borrowed Books", icon: "🏷", path: "/borrowed" },
// ];

// function Sidebar({ isAdmin }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   const items = isAdmin ? adminItems : userItems;

//   const handleNav = (path) => {
//     navigate(path);
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } finally {
//       navigate("/login");
//     }
//   };

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col py-6">
//       <div className="flex items-center gap-3 px-6 mb-8">
//         <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-sm font-semibold">
//           BW
//         </div>
//         <div>
//           <p className="text-lg font-semibold">BookWorm</p>
//           <p className="text-[11px] uppercase tracking-[0.25em]">Library</p>
//         </div>
//       </div>

//       <nav className="flex-1 space-y-1 px-3">
//         {items.map((item) => {
//           const isActive =
//             location.pathname === item.path ||
//             (item.path !== "/" && location.pathname.startsWith(item.path));

//           return (
//             <button
//               key={item.id}
//               onClick={() => handleNav(item.path)}
//               className={classNames(
//                 "w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition",
//                 isActive
//                   ? "bg-white text-black"
//                   : "text-gray-200 hover:bg-gray-800"
//               )}
//             >
//               <span>{item.icon}</span>
//               <span>{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>

//       <button
//         onClick={handleLogout}
//         className="mt-auto px-6 pt-4 text-xs text-gray-400 hover:text-white text-left"
//       >
//         Log Out
//       </button>
//     </aside>
//   );
// }

// export default Sidebar;


