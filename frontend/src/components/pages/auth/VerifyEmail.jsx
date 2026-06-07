import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";

function VerifyEmail({ email, goToLogin }) {
  const { verifyOtp } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage(""); setLoading(true);
    try {
      await verifyOtp({ email, otp });
      setMessage("Account verified successfully. You can now sign in.");
      goToLogin();
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center text-xl font-semibold">BW</div>
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-wide">Check your Mailbox</h1>
              <p className="text-sm text-gray-500 mt-2">Please enter the OTP sent to <span className="font-medium">{email}</span> to proceed.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name="otp" 
              placeholder="Enter OTP" 
              value={otp} 
              onChange={(e) => {
                // Only allow numbers, max 5 digits
                const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                setOtp(value);
              }}
              className="w-full border border-gray-300 px-4 py-2.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-black tracking-widest text-center" 
              maxLength={5}
              required 
            />
            {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">{error}</p>}
            {message && <p className="text-xs text-green-600 bg-green-50 border border-green-100 rounded px-3 py-2">{message}</p>}
            <button type="submit" disabled={loading} className="w-full mt-2 bg-black text-white px-4 py-2.5 text-sm font-medium tracking-wide rounded hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "VERIFYING..." : "VERIFY"}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-black text-white flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-xl font-semibold">BW</div>
          <div className="text-center">
            <p className="text-3xl font-semibold tracking-wide">BookWorm</p>
            <p className="text-xs uppercase tracking-[0.3em] mt-1">Library</p>
          </div>
        </div>
        <button onClick={goToLogin} className="mt-10 px-8 py-2 border border-white rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition">
          BACK TO SIGN IN
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;






// import { useState } from "react";
// import { useAuth } from "../../../context/AuthContext.jsx";

// function VerifyEmail({ email, goToLogin }) {
//   const { verifyOtp } = useAuth();
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setLoading(true);
//     try {
//       await verifyOtp({ email, otp });
//       setMessage("Account verified successfully. You can now sign in.");
//       goToLogin();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-white">
//       {/* Left white OTP panel */}
//       <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16">
//         <div className="w-full max-w-md">
//           <div className="flex flex-col items-center gap-4 mb-6">
//             <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center text-xl font-semibold">
//               BW
//             </div>
//             <div className="text-center">
//               <h1 className="text-2xl font-semibold tracking-wide">
//                 Check your Mailbox
//               </h1>
//               <p className="text-sm text-gray-500 mt-2">
//                 Please enter the OTP sent to <span className="font-medium">{email}</span> to proceed.
//               </p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="otp"
//               placeholder="OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-black tracking-widest text-center"
//               required
//             />

//             {error && (
//               <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">
//                 {error}
//               </p>
//             )}
//             {message && (
//               <p className="text-xs text-green-600 bg-green-50 border border-green-100 rounded px-3 py-2">
//                 {message}
//               </p>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-2 bg-black text-white px-4 py-2.5 text-sm font-medium tracking-wide rounded hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {loading ? "VERIFYING..." : "VERIFY"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Right black panel with logo */}
//       <div className="hidden md:flex md:w-1/2 bg-black text-white flex-col items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-xl font-semibold">
//             BW
//           </div>
//           <div className="text-center">
//             <p className="text-3xl font-semibold tracking-wide">BookWorm</p>
//             <p className="text-xs uppercase tracking-[0.3em] mt-1">Library</p>
//           </div>
//         </div>
//         <button
//           onClick={goToLogin}
//           className="mt-10 px-8 py-2 border border-white rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition"
//         >
//           BACK TO SIGN IN
//         </button>
//       </div>
//     </div>
//   );
// }

// export default VerifyEmail;


