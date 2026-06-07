import { useEffect, useMemo, useState } from "react";
import Navbar from "../../Layout/Navbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import Footer from "../../Layout/Footer.jsx";
import BookForm from "../../Forms/BookForm.jsx";
import { bookApi } from "../../../services/api.js";
import { formatCurrency } from "../../../utils/helpers.js";
import { useToast } from "../../../context/ToastContext.jsx";

function AdminBooks() {
  const toast = useToast();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

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

  const filteredBooks = useMemo(() => {
    const lower = query.toLowerCase();
    return books.filter((book) => {
      return `${book.title} ${book.author}`.toLowerCase().includes(lower);
    });
  }, [books, query]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / pageSize));
  const visibleBooks = filteredBooks.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const openCreate = () => {
    setEditingBook(null);
    setEditorOpen(true);
  };

  const openEdit = (book) => {
    setEditingBook(book);
    setEditorOpen(true);
  };

  const submitBook = async (payload) => {
    try {
      if (editingBook) {
        await bookApi.update(editingBook._id, payload);
        toast?.success?.("Book updated successfully.");
      } else {
        await bookApi.add(payload);
        toast?.success?.("Book added successfully.");
      }
      setEditorOpen(false);
      setEditingBook(null);
      loadBooks();
    } catch (err) {
      toast?.error?.(err.message);
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await bookApi.delete(id);
      toast?.info?.("Book deleted.");
      loadBooks();
    } catch (err) {
      toast?.error?.(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar active="books" isAdmin />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 space-y-4 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold">Book Management</h1>
              <p className="text-sm text-gray-500">Create, edit, delete, and search books.</p>
            </div>
            <button
              onClick={openCreate}
              className="px-4 py-2 text-sm bg-black text-white rounded"
            >
              + Add Book
            </button>
          </div>

          <div className="bg-white rounded shadow-sm p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or author..."
              className="w-full sm:max-w-md border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <button onClick={loadBooks} className="px-3 py-2 border rounded text-sm">
              Refresh
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">
              {error}
            </p>
          )}

          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm table-auto">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Author</th>
                    <th className="px-4 py-2">Qty</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Availability</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : visibleBooks.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                        No books found.
                      </td>
                    </tr>
                  ) : (
                    visibleBooks.map((book, index) => (
                      <tr key={book._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2 text-xs">{(page - 1) * pageSize + index + 1}</td>
                        <td className="px-4 py-2 text-xs">
                          <div className="font-medium">{book.title}</div>
                          {book.cover?.url ? <img src={book.cover.url} alt={book.title} className="mt-2 h-12 w-10 object-cover rounded border" /> : null}
                        </td>
                        <td className="px-4 py-2 text-xs">{book.author}</td>
                        <td className="px-4 py-2 text-xs">{book.quantity}</td>
                        <td className="px-4 py-2 text-xs">{formatCurrency(book.price)}</td>
                        <td className="px-4 py-2 text-xs">
                          {book.availability ? "Available" : "Not Available"}
                        </td>
                        <td className="px-4 py-2 text-xs text-right space-x-2">
                          <button
                            onClick={() => openEdit(book)}
                            className="px-3 py-1 border rounded text-[11px]"
                          >
                            Edit
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

            <div className="flex items-center justify-between px-4 py-3 border-t text-sm">
              <p>
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {editorOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-5">
            <h2 className="text-sm font-semibold mb-3">
              {editingBook ? "Edit Book" : "Add Book"}
            </h2>
            <BookForm
              initialValues={editingBook}
              onSubmit={submitBook}
              onClose={() => setEditorOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBooks;
