import { check, validationResult } from "express-validator";
import db from "../db.js";

const storeCharacterRequest = [
  check("name").notEmpty().withMessage("Can't empty").isString().withMessage("Must be string").bail(),
  check("short_description").optional().isString().withMessage("Must be string").bail(),
  check("description").optional().isString().withMessage("Must be string").bail(),
  check("char_id")
    .notEmpty()
    .withMessage("Can't empty")
    .isString()
    .withMessage("Must be string")
    .custom(async (value) => {
      const char = await db("characters")
        .select("id")
        .where("char_id", value || "")
        .first();
      if (char) throw new Error("Must be unique or not used");
    })
    .bail(),
  check("gender").isString().optional().bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];
const updateCharacterRequest = [
  check("name").notEmpty().withMessage("Can't empty").isString().withMessage("Must be string").bail(),
  check("short_description").optional().isString().withMessage("Must be string").bail(),
  check("description").optional().isString().withMessage("Must be string").bail(),
  check("char_id")
    .notEmpty()
    .withMessage("Can't empty")
    .isString()
    .withMessage("Must be string")
    .custom(async (value, { req }) => {
      const char = await db("characters")
        .select("id")
        .where("char_id", value || "")
        .first();
      if (char && char.id != req.params.id) throw new Error("Must be unique or not used");
    })
    .bail(),
  check("gender").isString().optional().bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export { storeCharacterRequest, updateCharacterRequest };
