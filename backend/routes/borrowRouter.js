// import express from "express";
// import {
//   borrowedBooks,
//   getBorrowedBooksForAdmin,
//   recordBorrowedBook,
//   returnBorrowBook,
// } from "../controller/borrowController.js";
// import {
//   isAuthenticated,
//   isAuthorized,
// } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post(
//   "/record-borrow-book/:id",
//   isAuthenticated,
//   isAuthorized("admin", "User"),
//   recordBorrowedBook
// );
// router.get(
//   "/borrowed-books-by-users",
//   isAuthenticated,
//   isAuthorized("Admin", "User"),
//   getBorrowedBooksForAdmin
// );
// router.get("/my-borrowed-books", isAuthenticated, borrowedBooks);

// router.put(
//   "/return-borrowed-book/:bookId",
//   isAuthenticated,
//   isAuthorized("admin", "User"),
//   returnBorrowBook
// );

// export default router;

import express from "express";
import {
  borrowedBooks,
  getBorrowedBooksForAdmin,
  recordBorrowedBook,
  returnBorrowBook,
  requestBorrow,
  getBorrowRequests,
  approveBorrowRequest,
  declineBorrowRequest,
} from "../controller/borrowController.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * Admin records borrow for a user
 */
router.post(
  "/record-borrow-book/:id",
  isAuthenticated,
  isAuthorized("Admin"), // ✅ ONLY Admin
  recordBorrowedBook,
);

// User requests a borrow
router.post("/request/:id", isAuthenticated, requestBorrow);

// Admin: manage requests
router.get(
  "/requests",
  isAuthenticated,
  isAuthorized("Admin"),
  getBorrowRequests,
);
router.put(
  "/requests/:requestId/approve",
  isAuthenticated,
  isAuthorized("Admin"),
  approveBorrowRequest,
);
router.put(
  "/requests/:requestId/decline",
  isAuthenticated,
  isAuthorized("Admin"),
  declineBorrowRequest,
);

/**
 * Admin sees all borrowed books
 */
router.get(
  "/borrowed-books-by-users",
  isAuthenticated,
  isAuthorized("Admin"), // ✅ ONLY Admin
  getBorrowedBooksForAdmin,
);

/**
 * Logged-in user sees their own borrowed books
 */
router.get(
  "/my-borrowed-books",
  isAuthenticated,
  isAuthorized("User"), // ✅ ONLY User
  borrowedBooks,
);

/**
 * Admin records return
 */
router.put(
  "/return-borrowed-book/:bookId",
  isAuthenticated,
  isAuthorized("Admin"), // ✅ ONLY Admin
  returnBorrowBook,
);

export default router;
