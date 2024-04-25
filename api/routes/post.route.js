import express from "express";
import { create } from "../controllers/post.controller.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, create);

export default router;
