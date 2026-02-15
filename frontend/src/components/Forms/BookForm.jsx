import { useState } from "react";

function BookForm({ initialValues, onSubmit, onClose }) {
  const [form, setForm] = useState(
    initialValues || {
      title: "",
      author: "",
      description: "",
      price: "",
      quantity: "",
    }
  );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Book Author"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="Book Price"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          required
        />
        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          required
        />
      </div>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Book Description"
        rows={3}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none"
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
          Save
        </button>
      </div>
    </form>
  );
}

export default BookForm;







// import { useState } from "react";

// function BookForm({ initialValues, onSubmit, onClose }) {
//   const [form, setForm] = useState(
//     initialValues || {
//       title: "",
//       author: "",
//       description: "",
//       price: "",
//       quantity: "",
//     }
//   );

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
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Book Title"
//           className="border border-gray-300 rounded px-3 py-2 text-sm"
//           required
//         />
//         <input
//           name="author"
//           value={form.author}
//           onChange={handleChange}
//           placeholder="Book Author"
//           className="border border-gray-300 rounded px-3 py-2 text-sm"
//           required
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//         <input
//           name="price"
//           type="number"
//           step="0.01"
//           value={form.price}
//           onChange={handleChange}
//           placeholder="Book Price"
//           className="border border-gray-300 rounded px-3 py-2 text-sm"
//           required
//         />
//         <input
//           name="quantity"
//           type="number"
//           value={form.quantity}
//           onChange={handleChange}
//           placeholder="Quantity"
//           className="border border-gray-300 rounded px-3 py-2 text-sm"
//           required
//         />
//       </div>
//       <textarea
//         name="description"
//         value={form.description}
//         onChange={handleChange}
//         placeholder="Book Description"
//         rows={3}
//         className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none"
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
//           Save
//         </button>
//       </div>
//     </form>
//   );
// }

// export default BookForm;


