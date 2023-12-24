import { config } from "dotenv";
import Cai from "node_characterai";
import { env } from "node:process";

config();
const ai = new Cai();
if (env.ENV == "staging") {
  ai.authenticateAsGuest();
} else {
  ai.authenticateWithToken(env.CAI_TOKEN);
}
if (env.CHROMIUM_PATH) {
  ai.requester.puppeteerPath = env.CHROMIUM_PATH;
}
export default ai;
