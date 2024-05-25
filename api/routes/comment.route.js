import { isAuthenticated } from "../utils/isAuthenticated.js";
import {
  create,
  fetch,
  like,
  remove,
  update,
} from "../controllers/comment.controller.js";
import express from "express";

const router = express.Router();
router.post("/create", isAuthenticated, create);
router.get("/fetch/:postId", fetch);
router.put("/like/:commentId", isAuthenticated, like);
router.put("/update/:commentId/:userId", isAuthenticated, update);
router.delete("/remove/:commentId/:userId", isAuthenticated, remove);
export default router;
