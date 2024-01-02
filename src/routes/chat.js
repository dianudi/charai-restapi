import { Router } from "express";
import { chat } from "../controllers/chatController.js";
import { auth } from "../middlewares/auth.js";
import { sendChatRequest } from "../requests/chatRequests.js";

const r = Router();
// r.use(auth);
r.route("/api/chats").post(sendChatRequest, chat);

export default r;
