import { resolve } from "node:path";
import { writeFile } from "node:fs/promises";
import { matchedData } from "express-validator";
import log from "../log.js";

async function updateToken(req, res) {
  try {
    await writeFile(resolve("storage/credential.json"), JSON.stringify(matchedData(req)));
    return res.status(200).json({ msg: "Success update token" });
  } catch (error) {
    log.error(error.message);
    return res.sendStatus(500);
  }
}

export { updateToken };
