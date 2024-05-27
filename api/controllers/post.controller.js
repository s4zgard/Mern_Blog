import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not authorized."));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Fill the required required fields,"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({ ...req.body, slug, userId: req.user.id });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortBy = req.query.sort === "asc" ? 1 : -1;
    const post = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortBy })
      .skip(startIndex)
      .limit(limit);
    const postsCount = await Post.countDocuments();
    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const postCountLastMonth = await Post.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    res.status(200).json({
      post,
      postsCount,
      postCountLastMonth,
    });
  } catch (error) {}
};

export const update = async (req, res, next) => {
  if (req.user.isAdmin && req.user.id === req.params.userId) {
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Fill the required required fields,"));
    }
    try {
      await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: req.body.image,
          },
        },
        { new: true }
      );
      res.status(200).json("Post updated successfuly.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(403, `You are not authorized.`));
  }
};

export const deletePost = async (req, res, next) => {
  if (req.user.isAdmin && req.user.id === req.params.userId) {
    try {
      await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json("Post deleted successfuly.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(403, `You are not authorized.`));
  }
};
