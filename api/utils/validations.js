import { check } from "express-validator";

export const loginValidations = [
  check("email", "please enter a valid email").isEmail(),
  check("password", "please enter a valid password").isLength({ min: 6 })
];

export const registerValidations = [
  check("name", "please enter a valid name")
    .not()
    .isEmpty(),
  check("email", "please enter a valid email").isEmail(),
  check("password", "please enter a valid password").isLength({ min: 6 })
];
