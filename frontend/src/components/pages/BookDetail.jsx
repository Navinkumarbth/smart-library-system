import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Layout/Navbar.jsx";
import Sidebar from "../Layout/Sidebar.jsx";
import Footer from "../Layout/Footer.jsx";
import { bookApi, borrowApi } from "../../services/api.js";
import BorrowForm from "../Forms/BorrowForm.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

function BookDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showBorrowModal, setShowBorrowModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await bookApi.get(id);
        setBook(data.book || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleRecordBorrow = async ({ email }) => {
    try {
      await borrowApi.recordBorrow(id, { email });
      toast?.success?.("Borrow recorded successfully.");
      setShowBorrowModal(false);
    } catch (err) {
      toast?.error?.(err.message);
    }
  };

  if (loading) return <div className="min-h-screen" />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="catalog" onChange={() => { }} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          {error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : !book ? (
            <p className="text-sm text-gray-500">Book not found.</p>
          ) : (
            <div className="bg-white rounded shadow-sm p-6 max-w-3xl mx-auto">
              <div className="flex gap-6">
                {book.cover?.url ? (
                  <img src={book.cover.url} alt={book.title} className="w-40 h-56 rounded object-cover border" />
                ) : (
                  <div className="w-40 h-56 bg-gray-200 rounded" />
                )}
                <div className="flex-1">
                  <h1 className="text-xl font-semibold">{book.title}</h1>
                  <p className="text-sm text-gray-600">By {book.author}</p>
                  <p className="mt-4 text-sm text-gray-700">{book.description}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="text-lg font-semibold">{formatCurrency(book.price)}</div>
                    <div className="text-sm text-gray-500">{book.availability ? "Available" : "Not Available"}</div>
                  </div>
                  <div className="mt-6">
                    {user?.role === "Admin" ? (
                      <button onClick={() => setShowBorrowModal(true)} className="px-4 py-2 bg-black text-white rounded">Record Borrow</button>
                    ) : (
                      <button
                        disabled={!book.availability}
                        onClick={async () => {
                          if (!book.availability) return;
                          try {
                            await borrowApi.requestBorrow(id);
                            toast?.success?.("Borrow request submitted. An admin will review it.");
                          } catch (err) {
                            toast?.error?.(err.message || "Failed to submit request");
                          }
                        }}
                        className="px-4 py-2 bg-black text-white rounded"
                      >
                        {book.availability ? "Request Borrow" : "Unavailable"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>

      {showBorrowModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5">
            <h2 className="text-sm font-semibold mb-3">Record Borrow</h2>
            <BorrowForm bookTitle={book?.title} onSubmit={handleRecordBorrow} onClose={() => setShowBorrowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetail;
