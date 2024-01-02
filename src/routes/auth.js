import { Router } from "express";
import { auth } from "../controllers/authController.js";

/**
 * @swagger
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - BearerAuth: []
 *
 * /auth:
 *   post:
 *     summary: Login.
 *     description: Authentication.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Return JWT token used in Authorizatio http header type bearer.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   example: blablablabla
 *                 type:
 *                   type: string
 *                   example: bearer
 *
 *       422:
 *         description: Wrong password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Wrong Password
 *     requestBody:
 *       description: Required parameters to send.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Password.
 *                 example: 0123456789
 */
const r = Router();
r.route("/api/auth").post(auth);
export default r;
