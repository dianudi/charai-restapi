import { Router } from "express";
import { destroy, index, show, store, update } from "../controllers/appController.js";
import { auth } from "../middlewares/auth.js";
import { storeUpdateApplicationRequest } from "../requests/applicationRequests.js";

const r = Router();
r.use(auth);
r.route("/api/applications").get(index).post(storeUpdateApplicationRequest, store);
r.route("/api/applications/:id").get(show).patch(storeUpdateApplicationRequest, update).delete(destroy);
export default r;
