import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { updateCredential } from "../requests/credentialRequest.js";
import { updateToken } from "../controllers/credentialController.js";

const r = Router();
/**
 * @swagger
 * /api/credential:
 *   patch:
 *     description: Update Character AI token for authorized action.
 *     summary: Update Character AI token.
 *     tags:
 *       - Credential Token
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Required parameters to send.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               session_token:
 *                 type: string
 *                 description: Session token from local storage.
 *                 example: randomstring
 *     responses:
 *       200:
 *         description: Return success update token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message
 *                   example: Success update token
 *
 *       401:
 *         description: Unauthorized action.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Unauthorized
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
r.use("/api/credential", auth);
r.route("/api/credential").patch(updateCredential, updateToken);
export default r;
