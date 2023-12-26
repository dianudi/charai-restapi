import jwt from "jsonwebtoken";
import { env } from "node:process";

function auth(req, res, next) {
  if (!req.headers["authorization"]) return res.status(401).json({ msg: "Unauthorized" });
  const [type, token] = req.header("authorization").split(" ");
  if (type && token && type !== "Bearer") return res.status(422).json({ msg: "Invalid Auth Type" });
  try {
    jwt.verify(token, env.SECRET_KEY);
  } catch (error) {
    return res.status(422).json({ msg: "Invalid JWT Token" });
  }
  next();
}

export { auth };
