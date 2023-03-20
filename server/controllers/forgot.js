import Account from "../models/accountModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../middleware/error.js";

export const forgot = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const account = await Account.findOneAndUpdate(req.body.email, {
      $set: { password: hash },
    });
    if (!account) return next(createError(404, "wrong account"));

    const token = jwt.sign({ id: account._id }, process.env.JWT);

    const { password, ...otherInformation } = account._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherInformation });
  } catch (err) {
    next(err);
  }
};
