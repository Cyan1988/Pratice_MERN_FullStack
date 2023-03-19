import jwt from "jsonwebtoken";
import { createError } from "../middleware/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, account) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.account = account;
    next();
  });
};
