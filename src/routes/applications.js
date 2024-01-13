import { Router } from "express";
import { destroy, index, show, store, update } from "../controllers/appController.js";
import { auth } from "../middlewares/auth.js";
import { storeUpdateApplicationRequest } from "../requests/applicationRequests.js";

const r = Router();
/**
 * @swagger
 * /api/applications:
 *   get:
 *     description: Get all consume application.
 *     summary: Get all consume application.
 *     tags:
 *       - Application
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Return all consume application.
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
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Name of consume application.
 *                     example: My Assistant
 *                   access_token:
 *                     type: string
 *                     description: Access token for authorizing chat.
 *                     example: blablabla
 *                   mutiple_conversation:
 *                     type: boolean
 *                     description: Can consume application make more conversation.
 *                     example: true
 *                   created_at:
 *                     type: string
 *                     description: Created at.
 *                   updated_at:
 *                     type: string
 *                     description: Updated at.
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
 *   post:
 *     description: Add new consume application.
 *     summary: Add new consume application.
 *     tags:
 *       - Application
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
 *                 description: Name of consume application.
 *                 example: My Assistant
 *               description:
 *                 type: string
 *                 description: Description of consume application.
 *                 example: Lorem ipsum dolor sit amet
 *               multiple_conversation:
 *                 type: boolean
 *                 description: Can consume application make more conversation.
 *     responses:
 *       201:
 *         description: Success created new consume application.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Created

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
 * /api/applications/{id}:
 *   get:
 *     description: Return detail of consume application.
 *     summary: Get detail consume application.
 *     tags:
 *       - Application
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Application ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Return consume application data.
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique ID.
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: Name of consume application.
 *                       example: My Assistant
 *                     access_token:
 *                       type: string
 *                       description: Access token for authorizing.
 *                       example: blablabla
 *                     mutiple_conversation:
 *                       type: boolean
 *                       description: Can consume application make more conversation.
 *                       example: true
 *                     created_at:
 *                       type: string
 *                       description: Created at.
 *                     updated_at:
 *                       type: string
 *                       description: Updated at.
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
 *                   example: Not Found
 * 
 *   patch:
 *     description: Update consume application.
 *     summary: Update consume application.
 *     tags:
 *       - Application
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Application ID.
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
 *                 description: Name of consume application.
 *                 example: My Assistant
 *               description:
 *                 type: string
 *                 description: Description of consume application.
 *                 example: Lorem ipsum dolor sit amet
 *               multiple_conversation:
 *                 type: boolean
 *                 description: Can consume application make more conversation.
 *     responses:
 *       200:
 *         description: Success updated new consume application.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Updated

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
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Not Found
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
 *                         description: Field of error.
 *                         example: name
 *                       type:
 *                         type: string
 *                         description: Type.
 *                         example: field
 *
 *   delete:
 *     description: Delete consume application.
 *     summary: Delete consume application.
 *     tags:
 *       - Application
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Application ID.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success deleted consume application.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Deleted
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
r.use("/api/applications", auth);
r.route("/api/applications").get(index).post(storeUpdateApplicationRequest, store);
r.route("/api/applications/:id").get(show).patch(storeUpdateApplicationRequest, update).delete(destroy);
export default r;
