import express from "express";
import { check, validationResult } from "express-validator";
import config from "config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

const router = express.Router();

const registerValidations = [
  check("name", "please enter a valid name")
    .not()
    .isEmpty(),
  check("email", "please enter a valid email").isEmail(),
  check("password", "please enter a valid password").isLength({ min: 6 })
];

const getErrors = errors =>
  errors.map(error => ({ name: error.value, message: error.msg }));

router.post("/register", registerValidations, async (req, res) => {
  try {
    const { errors } = validationResult(req);
    if (Boolean(errors.length)) return res.json({ errors: getErrors(errors) });
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).send("Email is already registered");
    const newUser = new User({ email, password, name });
    const salt = bcrypt.genSaltSync(10);
    newUser.password = await bcrypt.hash(salt, password);
    await newUser.save();
    const token = jwt.sign(
      { user: { id: newUser.id } },
      config.get("jwtSecret"),
      {
        expiresIn: 3600
      }
    );
    return res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

export default router;
