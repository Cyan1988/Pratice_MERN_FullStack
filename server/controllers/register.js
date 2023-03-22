import Account from "../models/accountModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
    if (pattern.test(req.body.password) === false) {
      return res.status(501).send("Password is invalid");
    }

    const newAccount = new Account({
      email: req.body.email,
      password: hash,
      subscribe: req.body.subscribe === "true" ? "true" : "false",
    });

    await newAccount.save();
    res.status(200).send("New Account Created Successfully");
  } catch (error) {
    next(error);
  }
};
