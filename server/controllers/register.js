import Account from "../models/accountModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newAccount = new Account({
      email: req.body.email,
      password: hash,
    });

    await newAccount.save();
    res.status(200).send("New Account Created Successfully");
  } catch (error) {
    next(error);
  }
};