import { useState } from "react";

function UserForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Admin's Name"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Admin's Email"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Admin's Password"
        minLength={8}
        maxLength={16}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        required
      />
      <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-1.5 text-xs border rounded w-full sm:w-auto"
        >
          Close
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 text-xs bg-black text-white rounded w-full sm:w-auto"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default UserForm;









// import { useState } from "react";

// function UserForm({ onSubmit, onClose }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit?.(form);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <input
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//         placeholder="Admin's Name"
//         className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//         required
//       />
//       <input
//         name="email"
//         type="email"
//         value={form.email}
//         onChange={handleChange}
//         placeholder="Admin's Email"
//         className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//         required
//       />
//       <input
//         name="password"
//         type="password"
//         value={form.password}
//         onChange={handleChange}
//         placeholder="Admin's Password"
//         minLength={8}
//         maxLength={16}
//         className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//         required
//       />
//       <div className="flex justify-end gap-2 pt-2">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-1.5 text-xs border rounded"
//         >
//           Close
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-1.5 text-xs bg-black text-white rounded"
//         >
//           Add
//         </button>
//       </div>
//     </form>
//   );
// }

// export default UserForm;


