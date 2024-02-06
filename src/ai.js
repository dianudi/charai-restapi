import { config } from "dotenv";
import Cai from "node_characterai";
import { env } from "node:process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import log from "./log.js";

config();
const ai = new Cai();
if (env.CHROMIUM_PATH) ai.requester.puppeteerPath = env.CHROMIUM_PATH;
try {
  if (env.ENV == "staging") {
    await ai.authenticateAsGuest();
  } else {
    const { session_token } = JSON.parse(await readFile(resolve("storage/credential.json")));
    await ai.authenticateWithToken(session_token);
  }
} catch (error) {
  log.error(error.message);
}

export default ai;
