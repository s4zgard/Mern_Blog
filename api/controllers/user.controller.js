import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId)
    return next(errorHandler(403, "Not Authorized"));

  if (req.body.email) {
    if (req.body.email === "" || req.body.email === null)
      return next(errorHandler(400, "Invalid email."));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email))
      return next(errorHandler(400, "Invalid email format."));
  }

  if (req.body.password) {
    if (req.body.password.length < 8) {
      return next(
        errorHandler(400, "Password must be more than 8 characters.")
      );
    }

    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    req.body.username = req.body.username.trim();

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/))
      return next(
        errorHandler(400, "Username should only contain letters or numbers.")
      );

    if (req.body.username.includes(" "))
      return next(errorHandler(400, "Username should not contains spaces."));

    if (req.body.username !== req.body.username.toLowerCase())
      return next(errorHandler(400, "Username should be in lower case."));

    if (
      req.body.username.length < 3 ||
      req.body.username.length > 20 ||
      req.body.username === ""
    )
      return next(
        errorHandler(
          400,
          "Username should be more than 3 characters and less than 20 characters."
        )
      );
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId)
    return next(errorHandler(403, "Not Authorized"));

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Sign out successfull");
  } catch (error) {
    next(error);
  }
};
