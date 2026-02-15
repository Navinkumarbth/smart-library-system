
import { useEffect, useState } from "react";
import Navbar from "../../Layout/Navbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import Footer from "../../Layout/Footer.jsx";
import BookForm from "../../Forms/BookForm.jsx";
import BorrowForm from "../../Forms/BorrowForm.jsx";
import { bookApi, borrowApi } from "../../../services/api.js";
import { formatCurrency } from "../../../utils/helpers.js";

function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [borrowBook, setBorrowBook] = useState(null);

  const loadBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await bookApi.getAll();
      setBooks(data.books || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleAddBook = async (payload) => {
    try {
      await bookApi.add(payload);
      setShowAddModal(false);
      loadBooks();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await bookApi.delete(id);
      loadBooks();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRecordBorrow = async ({ email }) => {
    if (!borrowBook) return;
    try {
      await borrowApi.recordBorrow(borrowBook._id, { email });
      setBorrowBook(null);
      alert("Borrow recorded successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar active="books" isAdmin onChange={() => { }} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 space-y-4 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-xl font-semibold">Book Management</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 text-sm bg-black text-white rounded"
            >
              + Add Book
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">
              {error}
            </p>
          )}

          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 border-b gap-2">
              <p className="font-medium text-sm">Books</p>
              <input
                type="text"
                placeholder="Search books..."
                className="w-full sm:w-56 border border-gray-300 rounded px-3 py-1.5 text-xs"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm table-auto">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Author</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Availability</th>
                    <th className="px-4 py-2 text-right">Record Book</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : books.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        No books found.
                      </td>
                    </tr>
                  ) : (
                    books.map((book, index) => (
                      <tr
                        key={book._id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 text-xs">{index + 1}</td>
                        <td className="px-4 py-2 text-xs">{book.title}</td>
                        <td className="px-4 py-2 text-xs">{book.author}</td>
                        <td className="px-4 py-2 text-xs">{book.quantity}</td>
                        <td className="px-4 py-2 text-xs">
                          {formatCurrency(book.price)}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {book.availability ? "Available" : "Not Available"}
                        </td>
                        <td className="px-4 py-2 text-xs text-right flex flex-col sm:flex-row sm:justify-end gap-2">
                          <button
                            onClick={() => setBorrowBook(book)}
                            className="px-3 py-1 border rounded text-[11px]"
                          >
                            Record
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book._id)}
                            className="px-3 py-1 border rounded text-[11px] text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-5">
            <h2 className="text-sm font-semibold mb-3">Record Book</h2>
            <BookForm
              onSubmit={handleAddBook}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}

      {/* Borrow Book Modal */}
      {borrowBook && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5">
            <h2 className="text-sm font-semibold mb-3">Record Book</h2>
            <BorrowForm
              bookTitle={borrowBook.title}
              onSubmit={handleRecordBorrow}
              onClose={() => setBorrowBook(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBooks;






// import { useEffect, useState } from "react";
// import Navbar from "../../Layout/Navbar.jsx";
// import Sidebar from "../../Layout/Sidebar.jsx";
// import Footer from "../../Layout/Footer.jsx";
// import BookForm from "../../Forms/BookForm.jsx";
// import BorrowForm from "../../Forms/BorrowForm.jsx";
// import { bookApi, borrowApi } from "../../../services/api.js";
// import { formatCurrency } from "../../../utils/helpers.js";

// function AdminBooks() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [borrowBook, setBorrowBook] = useState(null);

//   const loadBooks = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const data = await bookApi.getAll();
//       setBooks(data.books || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadBooks();
//   }, []);

//   const handleAddBook = async (payload) => {
//     try {
//       await bookApi.add(payload);
//       setShowAddModal(false);
//       loadBooks();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleDeleteBook = async (id) => {
//     if (!window.confirm("Delete this book?")) return;
//     try {
//       await bookApi.delete(id);
//       loadBooks();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleRecordBorrow = async ({ email }) => {
//     if (!borrowBook) return;
//     try {
//       await borrowApi.recordBorrow(borrowBook._id, { email });
//       setBorrowBook(null);
//       alert("Borrow recorded successfully");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar active="books" isAdmin onChange={() => { }} />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <main className="flex-1 p-6 space-y-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-xl font-semibold">Book Management</h1>
//             <button
//               onClick={() => setShowAddModal(true)}
//               className="px-4 py-2 text-sm bg-black text-white rounded"
//             >
//               + Add Book
//             </button>
//           </div>

//           {error && (
//             <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">
//               {error}
//             </p>
//           )}

//           <div className="bg-white rounded shadow-sm overflow-hidden">
//             <div className="flex items-center justify-between px-4 py-3 border-b">
//               <p className="font-medium text-sm">Books</p>
//               <input
//                 type="text"
//                 placeholder="Search books..."
//                 className="w-56 border border-gray-300 rounded px-3 py-1.5 text-xs"
//               />
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm">
//                 <thead className="bg-gray-100 text-left">
//                   <tr>
//                     <th className="px-4 py-2">ID</th>
//                     <th className="px-4 py-2">Name</th>
//                     <th className="px-4 py-2">Author</th>
//                     <th className="px-4 py-2">Quantity</th>
//                     <th className="px-4 py-2">Price</th>
//                     <th className="px-4 py-2">Availability</th>
//                     <th className="px-4 py-2 text-right">Record Book</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td
//                         colSpan={7}
//                         className="px-4 py-6 text-center text-gray-500"
//                       >
//                         Loading...
//                       </td>
//                     </tr>
//                   ) : books.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan={7}
//                         className="px-4 py-6 text-center text-gray-500"
//                       >
//                         No books found.
//                       </td>
//                     </tr>
//                   ) : (
//                     books.map((book, index) => (
//                       <tr
//                         key={book._id}
//                         className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                       >
//                         <td className="px-4 py-2 text-xs">{index + 1}</td>
//                         <td className="px-4 py-2 text-xs">{book.title}</td>
//                         <td className="px-4 py-2 text-xs">{book.author}</td>
//                         <td className="px-4 py-2 text-xs">{book.quantity}</td>
//                         <td className="px-4 py-2 text-xs">
//                           {formatCurrency(book.price)}
//                         </td>
//                         <td className="px-4 py-2 text-xs">
//                           {book.availability ? "Available" : "Not Available"}
//                         </td>
//                         <td className="px-4 py-2 text-xs text-right space-x-2">
//                           <button
//                             onClick={() => setBorrowBook(book)}
//                             className="px-3 py-1 border rounded text-[11px]"
//                           >
//                             Record
//                           </button>
//                           <button
//                             onClick={() => handleDeleteBook(book._id)}
//                             className="px-3 py-1 border rounded text-[11px] text-red-600"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>

//       {/* Add Book Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-5">
//             <h2 className="text-sm font-semibold mb-3">Record Book</h2>
//             <BookForm
//               onSubmit={handleAddBook}
//               onClose={() => setShowAddModal(false)}
//             />
//           </div>
//         </div>
//       )}

//       {/* Borrow Book Modal */}
//       {borrowBook && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5">
//             <h2 className="text-sm font-semibold mb-3">Record Book</h2>
//             <BorrowForm
//               bookTitle={borrowBook.title}
//               onSubmit={handleRecordBorrow}
//               onClose={() => setBorrowBook(null)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminBooks;


