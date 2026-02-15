import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";

function Signup({ onRegistered, goToLogin }) {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage(""); setLoading(true);
    try {
      await signup(form);
      setMessage("Verification code sent to your email.");
      onRegistered?.(form.email);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="hidden md:flex md:w-1/2 bg-black text-white flex-col items-center justify-center rounded-r-[4rem] p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-xl font-semibold">BW</div>
          <div className="text-center">
            <p className="text-3xl font-semibold tracking-wide">BookWorm</p>
            <p className="text-xs uppercase tracking-[0.3em] mt-1">Library</p>
          </div>
        </div>
        <p className="mt-10 text-sm text-gray-300 text-center">
          Already have account?{" "}
          <button onClick={goToLogin} className="underline underline-offset-4 hover:text-white">Sign in now.</button>
        </p>
        <button onClick={goToLogin} className="mt-6 px-8 py-2 border border-white rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition">
          SIGN IN
        </button>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-xs font-semibold">BW</div>
            <h1 className="text-2xl font-semibold tracking-wide">Sign Up</h1>
          </div>
          <p className="text-sm text-gray-500 mb-6">Please provide your information to sign up.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 px-4 py-2.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-black" required />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 px-4 py-2.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-black" required />
            <input type="password" name="password" placeholder="Password (8–16 characters)" value={form.password} onChange={handleChange} minLength={8} maxLength={16} className="w-full border border-gray-300 px-4 py-2.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-black" required />

            {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">{error}</p>}
            {message && <p className="text-xs text-green-600 bg-green-50 border border-green-100 rounded px-3 py-2">{message}</p>}

            <button type="submit" disabled={loading} className="w-full mt-2 border border-black px-4 py-2.5 text-sm font-medium tracking-wide rounded hover:bg-black hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "SENDING OTP..." : "SIGN UP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;






// import { useState } from "react";
// import { useAuth } from "../../../context/AuthContext.jsx";

// function Signup({ onRegistered, goToLogin }) {
//   const { signup } = useAuth();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setLoading(true);
//     try {
//       await signup(form);
//       setMessage("Verification code sent to your email.");
//       onRegistered?.(form.email);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-white">
//       {/* Left dark panel */}
//       <div className="hidden md:flex md:w-1/2 bg-black text-white flex-col items-center justify-center rounded-r-[4rem]">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-xl font-semibold">
//             BW
//           </div>
//           <div className="text-center">
//             <p className="text-3xl font-semibold tracking-wide">BookWorm</p>
//             <p className="text-xs uppercase tracking-[0.3em] mt-1">Library</p>
//           </div>
//         </div>
//         <p className="mt-10 text-sm text-gray-300">
//           Already have account?{" "}
//           <button
//             onClick={goToLogin}
//             className="underline underline-offset-4 hover:text-white"
//           >
//             Sign in now.
//           </button>
//         </p>
//         <button
//           onClick={goToLogin}
//           className="mt-6 px-8 py-2 border border-white rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition"
//         >
//           SIGN IN
//         </button>
//       </div>

//       {/* Right form area */}
//       <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16">
//         <div className="w-full max-w-md">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-xs font-semibold">
//               BW
//             </div>
//             <h1 className="text-2xl font-semibold tracking-wide">Sign Up</h1>
//           </div>

//           <p className="text-sm text-gray-500 mb-6">
//             Please provide your information to sign up.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-black"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-black"
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password (8–16 characters)"
//               value={form.password}
//               onChange={handleChange}
//               minLength={8}
//               maxLength={16}
//               className="w-full border border-gray-300 px-4 py-2.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-black"
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
//               className="w-full mt-2 border border-black px-4 py-2.5 text-sm font-medium tracking-wide rounded hover:bg-black hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {loading ? "SENDING OTP..." : "SIGN UP"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;


