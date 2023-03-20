import Account from "../models/accountModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../middleware/error.js";

export const login = async (req, res, next) => {
  try {
    const account = await Account.findOne({
      email: req.body.email,
    });
    if (!account) return next(createError(404, "wrong account"));

    const isPasswordCorrect = await bcrypt.compareSync(
      req.body.password,
      account.password
    );
    if (!isPasswordCorrect) return next(createError(400, "wrong password"));

    const token = jwt.sign({ id: account._id }, process.env.JWT);

    const { password, ...otherInformation } = account._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherInformation });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};


