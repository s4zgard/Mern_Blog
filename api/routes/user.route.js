import express from "express";
import {
  updateUser,
  deleteUser,
  signOut,
  getusers,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

const router = express.Router();

router.put("/update/:userId", isAuthenticated, updateUser);
router.delete("/delete/:userId", isAuthenticated, deleteUser);
router.post("/signout", signOut);
router.get("/getusers", isAuthenticated, getusers);

export default router;
