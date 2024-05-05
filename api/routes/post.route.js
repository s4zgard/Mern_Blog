import express from "express";
import {
  create,
  getPosts,
  update,
  deletePost,
} from "../controllers/post.controller.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, create);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", isAuthenticated, deletePost);
router.put("/update/:postId/:userId", isAuthenticated, update);

export default router;
