const { check, validationResult } = require("express-validator");
exports.registerRules = () => [
  check("firstname", "firstname is required").notEmpty(),
  check("lastname", "lastname is required").notEmpty(),
  check("email", "email is required").notEmpty(),
  check("email", "check  email again").isEmail(),
  check("numphone", "number phone is numeric").isNumeric(),
  check("password", "password  is required").isLength({ min: 6, max: 13 }),
];
exports.loginRules = () => [
  check("email", "email is required").notEmpty().isEmail(),
  check(
    "password",
    "password  must be betwin 6 caracter and 13 caracter"
  ).isLength({ min: 6, max: 13 }),
];
exports.validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.send({
      errors: errors.array().map((el) => ({
        msg: el.msg,
      })),
    });
  }
  next();
};
