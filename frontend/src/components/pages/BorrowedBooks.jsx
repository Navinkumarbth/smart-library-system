import { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar.jsx";
import Sidebar from "../Layout/Sidebar.jsx";
import Footer from "../Layout/Footer.jsx";
import { borrowApi } from "../../services/api.js";
import { formatCurrency, formatDate } from "../../utils/helpers.js";

function BorrowedBooks() {
  const [borrowed, setBorrowed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMyBorrowed = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await borrowApi.myBorrowed();
      setBorrowed(data.borrowedBooks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyBorrowed();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="borrowed" onChange={() => { }} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 space-y-4">
          <h1 className="text-xl font-semibold mb-2">My Borrowed Books</h1>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">
              {error}
            </p>
          )}

          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Borrowed Date</th>
                    <th className="px-4 py-2">Due Date</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : borrowed.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        You have not borrowed any books yet.
                      </td>
                    </tr>
                  ) : (
                    borrowed.map((b, index) => (
                      <tr
                        key={b.bookId}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 text-xs">{index + 1}</td>
                        <td className="px-4 py-2 text-xs">{b.bookTitle}</td>
                        <td className="px-4 py-2 text-xs">
                          {formatDate(b.borrowedDate)}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {formatDate(b.dueDate)}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {formatCurrency(b.price)}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {b.returned ? "Returned" : "Borrowed"}
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
    </div>
  );
}

export default BorrowedBooks;


