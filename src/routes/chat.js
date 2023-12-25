import { Router } from "express";
import { chat } from "../controllers/chatController.js";

const r = Router();
r.route("/api/chats").post(chat);

export default r;
