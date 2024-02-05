import { check, validationResult } from "express-validator";

const updateCredential = [
  check("session_token").notEmpty().withMessage("Can't empty").isString().withMessage("Must be string").bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export { updateCredential };
