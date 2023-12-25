import { Router } from "express";
import { destroy, index, show, store, update } from "../controllers/characterController.js";

const r = Router();
r.route("/api/characters").get(index).post(store);
r.route("/api/characters/:id").get(show).patch(update).delete(destroy);
export default r;
