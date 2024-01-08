import { Router } from "express";
import { destroy, index, show, store, update } from "../controllers/characterController.js";
import { auth } from "../middlewares/auth.js";
import { storeCharacterRequest, updateCharacterRequest } from "../requests/characterRequest.js";

const r = Router();
/**
 * @swagger
 * /api/characters:
 *   get:
 *     description: Get all AI characters.
 *     summary: Ger all AI characters.
 *     tags:
 *       - Character
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return all character.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique ID.
 *                     exampe: 1
 *                   name:
 *                     type: string
 *                     description: Character name.
 *                     example: Lorem Ipsum
 *                   short_description:
 *                     type: string
 *                     description: Short description of AI character.
 *                     example: Lorem ipsum dolor sit amet.
 *                   description:
 *                     type: string
 *                     description: Long description of AI character.
 *                     example: Lorem ipsum dolor sit amet.
 *                   char_id:
 *                     type: string
 *                     description: Character id from character.ai.
 *                     example: randomcharacterstring
 *                   gender:
 *                     type: string
 *                     description: Gender of AI character.
 *                     example: male
 *                   created_at:
 *                     type: string
 *                     description: Created at.
 *                   updated_at:
 *                     type: string
 *                     description: Updated at.
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Unauthorized
 */
r.use("/api/characters", auth);
r.route("/api/characters").get(index).post(storeCharacterRequest, store);
r.route("/api/characters/:id").get(show).patch(updateCharacterRequest, update).delete(destroy);
export default r;
