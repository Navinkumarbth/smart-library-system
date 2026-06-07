import express from "express";
import {
  getAllUsers,
  registerNewAdmin,
  updateUserRole,
  toggleUserStatus,
} from "../controller/userController.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUsers);
router.post(
  "/add/new-admin",
  isAuthenticated,
  isAuthorized("Admin"),
  registerNewAdmin,
);
router.put("/role/:id", isAuthenticated, isAuthorized("Admin"), updateUserRole);
router.put(
  "/status/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  toggleUserStatus,
);

export default router;
