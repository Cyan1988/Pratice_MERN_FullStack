import express from "express";
import { register } from "../controllers/register.js";

const router = express.Router();

router.post("/register", register);

router.get("/register", (req, res) => {
  res.send("hello register");
});

export default router;
