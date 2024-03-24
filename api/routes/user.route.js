import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

const router = express.Router();

router.put("/update/:userId", isAuthenticated, updateUser);

export default router;
