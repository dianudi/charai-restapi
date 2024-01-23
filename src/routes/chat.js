import { Router } from "express";
import { chat } from "../controllers/chatController.js";
// import { auth } from "../middlewares/auth.js";
import { sendChatRequest } from "../requests/chatRequests.js";

const r = Router();
/**
 * @swagger
 * /api/chats:
 *   post:
 *     description: Create or continue chat with ai character.
 *     summary: Create or continue chat with ai character.
 *     tags:
 *       - Chat
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: Access token consume application.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Required parameters to send.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               character_id:
 *                 type: integer
 *                 description: Character id from database.
 *                 example: 1
 *               conversation_id:
 *                 type: string
 *                 description: Conversation id from database or set null if want to create new conversation.
 *                 example: 23
 *               message:
 *                 type: string
 *                 description: Message to forward to ai character.
 *                 example: Hello
 *     responses:
 *       200:
 *         description: Return message from ai character.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message from ai character.
 *                   example: Hi there.
 *                 new_conversation:
 *                   type: boolean
 *                   description: Is new conversation.
 *                   example: true
 *                 conversation_id:
 *                   type: integer
 *                   description: Conversation id if new_conversation is true.
 *                   example: 1

 *       401:
 *         description: Unauthorized acton.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Unauthorized
 * 
 *       422:
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   description: Errors field.
 *                   items:
 *                     type: object
 *                     properties:
 *                       location:
 *                         type: string
 *                         description: Location of error.
 *                         example: body
 *                       msg:
 *                         type: string
 *                         description: Message of error.
 *                         example: Name can't empty
 *                       path:
 *                         type: string
 *                         description: Field of error
 *                         example: name
 *                       type:
 *                         type: string
 *                         description: Type
 *                         example: field
 *
 */
// r.use(auth);
r.route("/api/chats").post(sendChatRequest, chat);

export default r;
