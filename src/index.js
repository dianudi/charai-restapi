import express from "express";
import routes from "./routes/index.js";
import swagger from "swagger-ui-express";
import { rootSpec } from "./swagger.js";
import { resolve } from "node:path";
import { writeFileSync, existsSync } from "node:fs";

if (!existsSync(resolve("storage/credential.json"))) writeFileSync(resolve("storage/credential.json"), JSON.stringify({ session_token: "" }));

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use("/docs", swagger.serve, swagger.setup(rootSpec, { explorer: false, customSiteTitle: "CharacterAI RestAPI" }));
app.get("/", (req, res) => res.redirect("/docs"));
app.use(routes);
app.use((_, res) => res.status(404).json({ msg: "Not Found" }));
app.use((err, req, res) => {
  if (err) {
    return res.status(500);
  }
});
app.listen(3000, console.log("App Running🚀"));
