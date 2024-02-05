import { resolve } from "node:path";
import { writeFile } from "node:fs/promises";
import { matchedData } from "express-validator";

async function updateToken(req, res) {
  try {
    await writeFile(resolve("storage/credential.json"), JSON.stringify(matchedData(req)));
    return res.status(200).json({ msg: "Success update token" });
  } catch (error) {
    return res.sendStatus(500);
  }
}

export { updateToken };
