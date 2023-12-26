import express from "express";
import routes from "./routes/index.js";
import swagger from "swagger-ui-express";
import { rootSpec } from "./swagger.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use("/docs", swagger.serve, swagger.setup(rootSpec, { explorer: false, customSiteTitle: "CharacterAI RestAPI" }));
app.get("/", (req, res) => res.redirect("/docs"));
app.use(routes);
app.use((req, res) => res.status(404).json({ msg: "Not Found" }));
app.use((err, req, res) => {
  if (err) {
    return res.status(500);
  }
});
app.listen(3000, console.log("App Running🚀"));
