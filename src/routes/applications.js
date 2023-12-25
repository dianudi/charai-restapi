import { Router } from "express";
import { destroy, index, show, store, update } from "../controllers/appController.js";

const r = Router();
r.route("/api/applications").get(index).post(store);
r.route("/api/application/:id").get(show).patch(update).delete(destroy);
export default r;
