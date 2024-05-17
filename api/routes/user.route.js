import express from "express";
import {
  updateUser,
  deleteUser,
  signOut,
  getusers,
  deleteUserDash,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

const router = express.Router();

router.put("/update/:userId", isAuthenticated, updateUser);
router.delete("/delete/:userId", isAuthenticated, deleteUser);
router.delete("/deleteUser/:userId/:adminId", isAuthenticated, deleteUserDash);
router.post("/signout", signOut);
router.get("/getusers", isAuthenticated, getusers);

export default router;
