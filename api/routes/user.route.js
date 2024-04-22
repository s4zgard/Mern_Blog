import express from "express";
import {
  updateUser,
  deleteUser,
  signOut,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

const router = express.Router();

router.put("/update/:userId", isAuthenticated, updateUser);
router.delete("/delete/:userId", isAuthenticated, deleteUser);
router.post("/signout", signOut);

export default router;
