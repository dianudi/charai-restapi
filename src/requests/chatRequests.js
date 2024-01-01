import { check, header, validationResult } from "express-validator";
import db from "../db.js";

const sendChatRequest = [
  header("x-access-token").notEmpty().withMessage("x-access-token headers can't empty"),
  check("character_id")
    .isNumeric()
    .withMessage("Must be number")
    .notEmpty()
    .custom(async (value) => {
      const char = await db("characters").select("id").where("id", value).first();
      if (!char) throw new Error("Character must be exist on database");
    }),
  check("conversation_id")
    .optional()
    .isNumeric()
    .withMessage("Must be number")
    .custom(async (value, { req }) => {
      const app = await db("consume_applications")
        .join("character_conversations", "consume_applications.id", "=", "character_conversations.consume_application_id")
        .select("consume_applications.access_token as access_token", "character_conversations.id as character_id")
        .first();
      if (!app || app?.access_token != req.headers["x-access-token"]) throw new Error("Conversation id not your own");
    }),
  check("message").notEmpty().withMessage("Can't empty").bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export { sendChatRequest };
