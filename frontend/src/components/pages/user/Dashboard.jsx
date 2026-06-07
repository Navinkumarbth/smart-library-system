import Navbar from "../../Layout/Navbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import Footer from "../../Layout/Footer.jsx";
import StatCard from "../../Common/StatCard.jsx";
import { useEffect, useState } from "react";
import { borrowApi } from "../../../services/api.js";
import { useAuth } from "../../../context/AuthContext.jsx";

function UserDashboard() {
  const { user } = useAuth();
  const [borrowed, setBorrowed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await borrowApi.myBorrowed();
        setBorrowed(data.borrowedBooks || []);
      } catch {
        setBorrowed([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalBorrowed = borrowed.length;
  const totalReturned = borrowed.filter((b) => b.returned).length;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-xl font-semibold">
              Welcome, {user?.name || "Reader"}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard
              icon="📚"
              title="Your Borrowed Book List"
              value={loading ? "-" : totalBorrowed}
            />
            <StatCard
              icon="✅"
              title="Your Returned Book List"
              value={loading ? "-" : totalReturned}
            />
            <StatCard icon="📖" title="Let's browse books inventory" value="" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr,3fr] gap-6 items-stretch">
            <div className="bg-white rounded shadow-sm p-4 md:p-6 flex flex-col justify-center">
              <h2 className="text-lg font-semibold mb-3">BookWorm Library</h2>
              <p className="text-sm text-gray-600">
                "Embarking on the journey of reading fosters personal growth,
                nurturing a path towards excellence and the refinement of
                character."
              </p>
              <p className="mt-3 text-xs text-gray-400 text-right">
                ~ BookWorm Team
              </p>
            </div>
            <div className="bg-white rounded shadow-sm flex items-center justify-center">
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-gray-900 to-gray-500 relative">
                <div className="absolute inset-[22%] bg-white rounded-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default UserDashboard;





// import Navbar from "../../Layout/Navbar.jsx";
// import Sidebar from "../../Layout/Sidebar.jsx";
// import Footer from "../../Layout/Footer.jsx";
// import StatCard from "../../Common/StatCard.jsx";
// import { useEffect, useState } from "react";
// import { borrowApi } from "../../../services/api.js";
// import { useAuth } from "../../../context/AuthContext.jsx";

// function UserDashboard() {
//   const { user } = useAuth();
//   const [borrowed, setBorrowed] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await borrowApi.myBorrowed();
//         setBorrowed(data.borrowedBooks || []);
//       } catch {
//         setBorrowed([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   const totalBorrowed = borrowed.length;
//   const totalReturned = borrowed.filter((b) => b.returned).length;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <main className="flex-1 p-6 space-y-6">
//           <div className="flex items-center justify-between">
//             <h1 className="text-xl font-semibold">
//               Welcome, {user?.name || "Reader"}
//             </h1>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <StatCard
//               icon="📚"
//               title="Your Borrowed Book List"
//               value={loading ? "-" : totalBorrowed}
//             />
//             <StatCard
//               icon="✅"
//               title="Your Returned Book List"
//               value={loading ? "-" : totalReturned}
//             />
//             <StatCard icon="📖" title="Let's browse books inventory" value="" />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-[2fr,3fr] gap-6 items-stretch">
//             <div className="bg-white rounded shadow-sm p-6 flex flex-col justify-center">
//               <h2 className="text-lg font-semibold mb-3">BookWorm Library</h2>
//               <p className="text-sm text-gray-600">
//                 "Embarking on the journey of reading fosters personal growth,
//                 nurturing a path towards excellence and the refinement of
//                 character."
//               </p>
//               <p className="mt-3 text-xs text-gray-400 text-right">
//                 ~ BookWorm Team
//               </p>
//             </div>
//             <div className="bg-white rounded shadow-sm flex items-center justify-center">
//               <div className="w-56 h-56 rounded-full bg-gradient-to-br from-gray-900 to-gray-500 relative">
//                 <div className="absolute inset-[22%] bg-white rounded-full" />
//               </div>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;


