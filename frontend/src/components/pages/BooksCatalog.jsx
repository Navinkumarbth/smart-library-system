import { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar.jsx";
import Sidebar from "../Layout/Sidebar.jsx";
import Footer from "../Layout/Footer.jsx";
import { bookApi } from "../../services/api.js";
import { formatCurrency } from "../../utils/helpers.js";

function BooksCatalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

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

  const filtered = books.filter((b) =>
    (b.title || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="catalog" onChange={() => { }} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Books</h1>
            <input
              type="text"
              placeholder="Search books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-56 border border-gray-300 rounded px-3 py-1.5 text-xs"
            />
          </div>

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
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Author</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        No books found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((book, index) => (
                      <tr
                        key={book._id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 text-xs">{index + 1}</td>
                        <td className="px-4 py-2 text-xs">{book.title}</td>
                        <td className="px-4 py-2 text-xs">{book.author}</td>
                        <td className="px-4 py-2 text-xs">
                          {formatCurrency(book.price)}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {book.availability ? "Available" : "Not Available"}
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

export default BooksCatalog;


