import { env } from "node:process";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import crypto from "node:crypto";

config();

function auth(req, res) {
  if (!req.body?.password) return res.status(422).json({ msg: "Wrong Password" });
  const hash = crypto.createHash("md5");
  hash.update(Buffer.from(req.body.password));
  if (env.ACCESS_PASSWORD !== hash.digest("hex")) return res.status(422).json({ msg: "Wrong Password" });
  const token = jwt.sign({ auth: true }, env.SECRET_KEY);
  return res.status(200).json({ type: "bearer", access_token: token });
}

export { auth };
