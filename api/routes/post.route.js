import express from "express";
import {
  create,
  getPosts,
  deletePost,
} from "../controllers/post.controller.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, create);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", isAuthenticated, deletePost);

export default router;
