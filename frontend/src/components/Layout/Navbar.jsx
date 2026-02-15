import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <header className="h-auto sm:h-16 px-4 sm:px-10 py-3 sm:py-0 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b bg-white gap-3">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full border border-black flex items-center justify-center text-xs font-semibold">
          BW
        </div>
        <div className="leading-tight">
          <p className="text-sm font-medium">BookWorm (NK-TECH)</p>
          <p className="text-[11px] text-gray-500">
            Embarking on the journey of reading
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 w-full sm:w-auto justify-between sm:justify-end">
        <div className="text-right leading-tight">
          <p className="font-medium">{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>
        <button
          onClick={() => navigate("/settings")}
          className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs"
        >
          ⚙
        </button>
      </div>
    </header>
  );
}

export default Navbar;



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const [dateTime, setDateTime] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const formattedDate = dateTime.toLocaleDateString("en-IN", {
//     month: "short",
//     year: "numeric",
//   });

//   const formattedTime = dateTime.toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });

//   return (
//     <header className="h-16 px-6 sm:px-10 flex items-center justify-between border-b bg-white">
//       <div className="flex items-center gap-3">
//         <div className="w-9 h-9 rounded-full border border-black flex items-center justify-center text-xs font-semibold">
//           BW
//         </div>
//         <div className="leading-tight">
//           <p className="text-sm font-medium">BookWorm (NK-TECH)</p>
//           <p className="text-[11px] text-gray-500">
//             Embarking on the journey of reading
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center gap-6 text-xs sm:text-sm text-gray-500">
//         <div className="text-right leading-tight">
//           <p className="font-medium">{formattedDate}</p>
//           <p>{formattedTime}</p>
//         </div>
//         <button
//           onClick={() => navigate("/settings")}
//           className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs"
//         >
//           ⚙
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Navbar;
