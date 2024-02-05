import { config } from "dotenv";
import Cai from "node_characterai";
import { env } from "node:process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

config();
const ai = new Cai();
if (env.CHROMIUM_PATH) ai.requester.puppeteerPath = env.CHROMIUM_PATH;

if (env.ENV == "staging") {
  await ai.authenticateAsGuest();
} else {
  const { session_token } = JSON.parse(await readFile(resolve("storage/credential.json")));
  await ai.authenticateWithToken(session_token);
}
export default ai;
