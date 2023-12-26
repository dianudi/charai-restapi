import { check, validationResult } from "express-validator";

const storeUpdateApplicationRequest = [
  check("name").notEmpty().withMessage("Name can't empty").bail(),
  check("description").notEmpty().withMessage("Description can't empty").bail(),
  check("multiple_conversation").optional().isBoolean().withMessage("Multiple Conversation must be boolean").bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export { storeUpdateApplicationRequest };
