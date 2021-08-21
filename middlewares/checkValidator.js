const { body, validationResult } = require("express-validator");

const registerRules = () => [
  body("name", "name is required").notEmpty(),
  body("lastName", "lastName is required").notEmpty(),
  body("email", "email is invalid").isEmail(),
  body("password", "password must contain at least 6 characters").isLength({
    min: 6,
    max: 20,
  }),
];

const loginRules = () => [
  body("email", "email in invalid").isEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password is to short")
    .isLength({ max: 10 })
    .withMessage("password is to long"),
];

//format the error
const myValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      msg: error.msg,
    };
  },
});

const validator = (req, res, next) => {
  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validator,
  registerRules,
  loginRules,
};
