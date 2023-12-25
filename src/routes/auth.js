import { Router } from "express";
import { auth } from "../controllers/authController.js";

const r = Router();
r.route("/api/auth").post(auth);
export default r;
