import express from "express";
import { check, validationResult } from "express-validator";
import config from "config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import checkAuth from "../../middlewares/checkAuth";
import User from "../models/user";

const router = express.Router();

router.get("/", checkAuth, (req, res) => {
  try {
    const user = User.findById(req.user);
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

const loginValidations = [
  check("email", "please enter a valid email").isEmail(),
  check("password", "please enter a valid password").isLength({ min: 6 })
];

const getErrors = errors =>
  errors.map(error => ({ name: error.value, message: error.msg }));

router.post("/login", loginValidations, async (req, res) => {
  const { errors } = validationResult(req);
  if (Boolean(errors.length)) return res.json({ errors: getErrors(errors) });
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("please enter valid credentials");
  const isValid = bcrypt.compareSync(password, user.password);
  if (isValid) {
    const token = jwt.sign({ user: { id: user.id } }, config.get("jwtSecret"), {
      expiresIn: 3600
    });
    return res.json({ token });
  }
  res.status(400).send("please enter valid credentials");
});

export default router;
