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
    const sortBy = req.query.order === "asc" ? 1 : -1;
    const post = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.serachTerm && {
        $or: [
          { title: { $regex: req.query.serachTerm, $options: "i" } },
          { content: { $regex: req.query.serachTerm, $options: "i" } },
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

    res.status(200).json({ post, postsCount, postCountLastMonth });
  } catch (error) {}
};

export const show = async (req, res, next) => {
  const slug = req.params.slug;
  try {
    const post = await Post.findOne({ slug });
    if (!post) {
      return next(errorHandler(404, `Not found for slug ${slug}`));
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
