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
 *         description: Return all characters.
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
 *                     description: Character ID.
 *                     example: randomcharacterstring
 *                   gender:
 *                     type: string
 *                     description: Gender of AI character.
 *                     example: male
 *                   conversation_count:
 *                     type: integer
 *                     description: Total AI's conversation.
 *                     example: 1
 *                   created_at:
 *                     type: string
 *                     description: Created at.
 *                   updated_at:
 *                     type: string
 *                     description: Updated at.
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
 *
 *   post:
 *     description: Add new AI character.
 *     summary: Add new ai character.
 *     tags:
 *       - Character
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Required parameters to send.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of character.
 *                 example: Lorem
 *               short_description:
 *                 type: string
 *                 description: Short description of character.
 *                 example: Lorem ipsum dolor sit amet.
 *               description:
 *                 type: string
 *                 description: Long description of character.
 *                 example: Lorem ipsum dolor sit amet.
 *               char_id:
 *                 type: string
 *                 description: Character ID.
 *                 example: randomstringid
 *               gender:
 *                 type: string
 *                 description: Gender of character.
 *                 example: female
 *     responses:
 *       201:
 *         description: Success created new ai character.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Created
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
 * /api/characters/{id}:
 *   get:
 *     description: Return detail of AI Character.
 *     summary: Get detail of AI Character.
 *     tags:
 *       - Character
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Character id from database.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Return character data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Name of character.
 *                   example: Lorem
 *                 short_description:
 *                   type: string
 *                   description: Short description of character.
 *                   example: Lorem ipsum dolor sit amet.
 *                 description:
 *                   type: string
 *                   description: Long description of character.
 *                   example: Lorem ipsum dolor sit amet.
 *                 char_id:
 *                   type: string
 *                   description: Unique Character ID.
 *                   example: randomstring
 *                 gender:
 *                   type: string
 *                   description: Gender of character.
 *                   example: female
 *                 conversation_count:
 *                   type: integer
 *                   description: Total AI's conversation.
 *                   example: 1
 *                 created_at:
 *                   type: string
 *                   description: Created at.
 *                 updated_at:
 *                   type: string
 *                   description: Updated at.
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
 * 
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Not found
 * 
 *   patch:
 *     description: Update AI Character.
 *     summary: Update ai character.
 *     tags:
 *       - Character
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Character ID from database.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Required parameters to send.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of character.
 *                 example: Lorem
 *               short_description:
 *                 type: string
 *                 description: Short description of character.
 *                 example: Lorem ipsum dolor sit amet.
 *               description:
 *                 type: string
 *                 description: Long description of character.
 *                 example: Lorem ipsum dolor sit amet.
 *               char_id:
 *                 type: string
 *                 description: Unique Character ID.
 *                 example: randomstring
 *     responses:
 *       200:
 *         description: Success updated ai character.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Updated
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
 * 
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Not found
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
 *   delete:
 *     description: Delete ai character.
 *     summary: Delete ai character.
 *     tags:
 *       - Character
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Character ID from database.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success deleted ai character.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Deleted
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
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Not Found
 *
 */
r.use("/api/characters", auth);
r.route("/api/characters").get(index).post(storeCharacterRequest, store);
r.route("/api/characters/:id").get(show).patch(updateCharacterRequest, update).delete(destroy);
export default r;
