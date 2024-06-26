import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const create = async (req, res, next) => {
  if (!req.body.content || req.body.content === "")
    return next(errorHandler(401, "Comment can't be empty "));

  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();

    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

export const fetch = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = await comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.likesCount += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.likesCount -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {}
};

export const update = async (req, res, next) => {
  if (req.user.id === req.params.userId) {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return next(errorHandler(404, "Comment not found."));
      }
      comment.content = req.body.content;
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }
};

export const remove = async (req, res, next) => {
  if (req.user.id === req.params.userId) {
    try {
      const deleted = await Comment.findByIdAndDelete(req.params.commentId);
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  }
};

export const getcomments = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not authorized."));
  }
  if (req.user.isAdmin) {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortBy = req.query.order === "asc" ? 1 : -1;
      const data = await Comment.find()
        .limit(limit)
        .sort({ createdAt: sortBy })
        .skip(startIndex);

      const comments = data.map((comment) => {
        return comment._doc;
      });

      const totalComments = await Comment.countDocuments();
      const now = new Date();
      const lastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );

      const lastMonthComments = await Comment.countDocuments({
        createdAt: { $gte: lastMonth },
      });
      res.status(200).json({ comments, totalComments, lastMonthComments });
    } catch (error) {
      next(error);
    }
  }
};
