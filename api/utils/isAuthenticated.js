import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const isAuthenticated = (req, res, next) => {

  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Not authorized"));
  }

  jwt.verify(token, process.env.JWTSECRET, (err, userData) => {
    if (err) {
      return next(errorHandler(401, "Not Authorized"));
    }
    req.user = userData;
    next();
  });
};
