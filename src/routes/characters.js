import { Router } from "express";
import { destroy, index, show, store, update } from "../controllers/characterController.js";
import { auth } from "../middlewares/auth.js";
import { storeCharacterRequest, updateCharacterRequest } from "../requests/characterRequest.js";

const r = Router();
r.use(auth);
r.route("/api/characters").get(index).post(storeCharacterRequest, store);
r.route("/api/characters/:id").get(show).patch(updateCharacterRequest, update).delete(destroy);
export default r;
