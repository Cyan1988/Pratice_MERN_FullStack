import express from "express";
import { forgot } from "../controllers/forgot.js";

const router = express.Router();

router.post("/forgot", forgot);

export default router;
