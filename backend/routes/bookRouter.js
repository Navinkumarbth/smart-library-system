// import {
//   isAuthenticated,
//   isAuthorized,
// } from "../middlewares/authMiddleware.js";
// import {
//   addBook,
//   deleteBook,
//   getAllBooks,
// } from "../controller/bookController.js";

// import express from "express";

// const router = express.Router();

// router.post("/admin/add", isAuthenticated, isAuthorized("admin"), addBook);
// router.get("/all", isAuthenticated, getAllBooks);
// router.delete(
//   "/delete/:id",
//   isAuthenticated,
//   isAuthorized("admin"),
//   deleteBook
// );

// export default router;


import express from "express";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";
import {
  addBook,
  deleteBook,
  getAllBooks,
} from "../controller/bookController.js";

const router = express.Router();

// ✅ ONLY ADMIN CAN ADD BOOK
router.post(
  "/admin/add",
  isAuthenticated,
  isAuthorized("Admin"), // 🔥 FIXED (Admin ≠ admin)
  addBook
);

// ✅ ALL LOGGED-IN USERS CAN VIEW BOOKS
router.get("/all", isAuthenticated, getAllBooks);

// ✅ ONLY ADMIN CAN DELETE BOOK
router.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("Admin"), // 🔥 FIXED
  deleteBook
);

export default router;
