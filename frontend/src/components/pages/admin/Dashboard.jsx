import Navbar from "../../Layout/Navbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import Footer from "../../Layout/Footer.jsx";

function AdminDashboard() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar active="dashboard" isAdmin onChange={() => { }} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          {/* Left: Pie chart + stats */}
          <div className="bg-white rounded shadow-sm p-4 md:p-6 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-gray-900 to-gray-600 relative">
                  <div className="absolute inset-[20%] bg-white rounded-full" />
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="bg-gray-50 rounded p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-gray-800 text-white flex items-center justify-center text-sm">
                    👥
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Total User Base</p>
                    <p className="text-xl font-semibold">8</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-gray-800 text-white flex items-center justify-center text-sm">
                    📚
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Total Book Count</p>
                    <p className="text-xl font-semibold">10</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-gray-800 text-white flex items-center justify-center text-sm">
                    🧑‍💼
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Total Admin Count</p>
                    <p className="text-xl font-semibold">3</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 border rounded p-4 text-sm text-gray-700">
              <p className="font-medium mb-2">Embarking on the journey</p>
              <p>
                Embarking on the journey of reading fosters personal growth,
                nurturing a path towards excellence and the refinement of
                character.
              </p>
            </div>
          </div>

          {/* Right: Profile card */}
          <div className="space-y-4">
            <div className="bg-white rounded shadow-sm p-4 md:p-6 flex flex-col items-center gap-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-300" />
              <div className="text-center">
                <p className="font-semibold">Admin User</p>
                <p className="text-xs text-gray-500">
                  Welcome to your admin dashboard. Here you can manage all the
                  settings and monitor the statistics.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminDashboard;






// import Navbar from "../../Layout/Navbar.jsx";
// import Sidebar from "../../Layout/Sidebar.jsx";
// import Footer from "../../Layout/Footer.jsx";

// function AdminDashboard() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar active="dashboard" isAdmin onChange={() => { }} />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
//           {/* Left: Pie chart + stats */}
//           <div className="bg-white rounded shadow-sm p-6 flex flex-col gap-6">
//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="flex-1 flex items-center justify-center">
//                 <div className="w-56 h-56 rounded-full bg-gradient-to-br from-gray-900 to-gray-600 relative">
//                   <div className="absolute inset-[20%] bg-white rounded-full" />
//                 </div>
//               </div>
//               <div className="flex-1 space-y-3">
//                 <div className="bg-gray-50 rounded p-3 flex items-center gap-3">
//                   <div className="w-9 h-9 rounded bg-gray-800 text-white flex items-center justify-center text-sm">
//                     👥
//                   </div>
//                   <div className="text-sm">
//                     <p className="text-gray-500">Total User Base</p>
//                     <p className="text-xl font-semibold">8</p>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 rounded p-3 flex items-center gap-3">
//                   <div className="w-9 h-9 rounded bg-gray-800 text-white flex items-center justify-center text-sm">
//                     📚
//                   </div>
//                   <div className="text-sm">
//                     <p className="text-gray-500">Total Book Count</p>
//                     <p className="text-xl font-semibold">10</p>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 rounded p-3 flex items-center gap-3">
//                   <div className="w-9 h-9 rounded bg-gray-800 text-white flex items-center justify-center text-sm">
//                     🧑‍💼
//                   </div>
//                   <div className="text-sm">
//                     <p className="text-gray-500">Total Admin Count</p>
//                     <p className="text-xl font-semibold">3</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 border rounded p-4 text-sm text-gray-700">
//               <p className="font-medium mb-2">Embarking on the journey</p>
//               <p>
//                 Embarking on the journey of reading fosters personal growth,
//                 nurturing a path towards excellence and the refinement of
//                 character.
//               </p>
//             </div>
//           </div>

//           {/* Right: Profile card */}
//           <div className="space-y-4">
//             <div className="bg-white rounded shadow-sm p-6 flex flex-col items-center gap-3">
//               <div className="w-20 h-20 rounded-full bg-gray-300" />
//               <div className="text-center">
//                 <p className="font-semibold">Admin User</p>
//                 <p className="text-xs text-gray-500">
//                   Welcome to your admin dashboard. Here you can manage all the
//                   settings and monitor the statistics.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

