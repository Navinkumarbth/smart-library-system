import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";

function Login({ goToSignup }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [mode, setMode] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = mode === "admin" ? { ...form, expectedRole: "Admin" } : { ...form };
      const data = await login(payload);
      const role = data?.user?.role;
      navigate(role === "Admin" ? "/admin" : "/user", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left dark panel */}
      <div className="hidden md:flex md:w-1/2 bg-black text-white flex-col items-center justify-center rounded-r-[4rem] p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-xl font-semibold">BW</div>
          <div className="text-center">
            <p className="text-3xl font-semibold tracking-wide">NK-TECH</p>
            <p className="text-xs uppercase tracking-[0.3em] mt-1">Library</p>
          </div>
        </div>
        <p className="mt-10 text-sm text-gray-300 text-center">
          New to our platform?{" "}
          <button onClick={goToSignup} className="underline underline-offset-4 hover:text-white">
            Sign up now.
          </button>
        </p>
        <button className="mt-6 px-8 py-2 border border-white rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition" onClick={goToSignup}>
          SIGN UP
        </button>
      </div>

      {/* Right form area */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16">
        <div className="w-full max-w-md">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-xs font-semibold">BW</div>
              <h1 className="text-2xl font-semibold tracking-wide">Sign In</h1>
            </div>
            <div className="flex text-[11px] border rounded-full overflow-hidden">
              <button type="button" onClick={() => setMode("user")} className={`px-3 py-1.5 ${mode === "user" ? "bg-black text-white" : "bg-white text-gray-600"}`}>User</button>
              <button type="button" onClick={() => setMode("admin")} className={`px-3 py-1.5 border-l ${mode === "admin" ? "bg-black text-white" : "bg-white text-gray-600"}`}>Admin</button>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">{mode === "admin" ? "Sign in with your admin credentials to manage the library." : "Sign in with your user account to browse and borrow books."}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 px-4 py-2.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-black" required />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border border-gray-300 px-4 py-2.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-black" required />

            {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">{error}</p>}

            <button type="submit" disabled={loading} className="w-full mt-2 border border-black px-4 py-2.5 text-sm font-medium tracking-wide rounded hover:bg-black hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;








// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext.jsx";

// function Login({ goToSignup }) {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [mode, setMode] = useState("user"); // only UI label, backend role auto handle
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const payload =
//         mode === "admin"
//           ? { ...form, expectedRole: "Admin" }
//           : { ...form };
//       const data = await login(payload);
//       const role = data?.user?.role;
//       if (role === "Admin") {
//         navigate("/admin", { replace: true });
//       } else {
//         navigate("/user", { replace: true });
//       }
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
//           New to our platform?{" "}
//           <button
//             onClick={goToSignup}
//             className="underline underline-offset-4 hover:text-white"
//           >
//             Sign up now.
//           </button>
//         </p>
//         <button
//           onClick={goToSignup}
//           className="mt-6 px-8 py-2 border border-white rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition"
//         >
//           SIGN UP
//         </button>
//       </div>

//       {/* Right form area */}
//       <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16">
//         <div className="w-full max-w-md">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-xs font-semibold">
//                 BW
//               </div>
//               <h1 className="text-2xl font-semibold tracking-wide">Sign In</h1>
//             </div>

//             <div className="flex text-[11px] border rounded-full overflow-hidden">
//               <button
//                 type="button"
//                 onClick={() => setMode("user")}
//                 className={`px-3 py-1.5 ${mode === "user"
//                   ? "bg-black text-white"
//                   : "bg-white text-gray-600"
//                   }`}
//               >
//                 User
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setMode("admin")}
//                 className={`px-3 py-1.5 border-l ${mode === "admin"
//                   ? "bg-black text-white"
//                   : "bg-white text-gray-600"
//                   }`}
//               >
//                 Admin
//               </button>
//             </div>
//           </div>

//           <p className="text-sm text-gray-500 mb-6">
//             {mode === "admin"
//               ? "Sign in with your admin credentials to manage the library."
//               : "Sign in with your user account to browse and borrow books."}
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
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
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-black"
//               required
//             />

//             {error && (
//               <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">
//                 {error}
//               </p>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-2 border border-black px-4 py-2.5 text-sm font-medium tracking-wide rounded hover:bg-black hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {loading ? "SIGNING IN..." : "SIGN IN"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


