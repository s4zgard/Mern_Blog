import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    next(errorHandler(400, "All Fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.json({ message: "Signup was successfull" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    errorHandler(400, "Please enter Email & Password");
  }
  try {
    const loggedInUser = await User.findOne({ email });
    if (!loggedInUser) {
      return next(errorHandler(400, "Invalid Email/Password"));
    }
    const loggedInPassword = bcryptjs.compareSync(
      password,
      loggedInUser.password
    );
    if (!loggedInPassword) {
      return next(errorHandler(400, "Invalid Email/Password"));
    }

    const { password: uPass, ...rest } = loggedInUser._doc;

    const token = jwt.sign(
      { id: loggedInUser._id, username: loggedInUser.username },
      process.env.JWTSECRET,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, email: user.email, username: name },
        process.env.JWTSECRET,
        { expiresIn: "1d" }
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const genPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(genPassword, 10);
      const user = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await user.save();
      const token = jwt.sign(
        { id: user._id, email: user.email, username: name },
        process.env.JWTSECRET,
        { expiresIn: "1d" }
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
