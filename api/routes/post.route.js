import express from "express";
import { create, show, getPosts } from "../controllers/post.controller.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, create);
router.get("/getposts", getPosts);

export default router;
