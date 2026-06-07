import { useState } from "react";

function BorrowForm({ bookTitle, onSubmit, onClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-gray-600">
        Record borrow for: <span className="font-medium">{bookTitle}</span>
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User Email"
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
          Record
        </button>
      </div>
    </form>
  );
}

export default BorrowForm;






// import { useState } from "react";

// function BorrowForm({ bookTitle, onSubmit, onClose }) {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit?.({ email });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <p className="text-sm text-gray-600">
//         Record borrow for: <span className="font-medium">{bookTitle}</span>
//       </p>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="User Email"
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
//           Record
//         </button>
//       </div>
//     </form>
//   );
// }

// export default BorrowForm;


