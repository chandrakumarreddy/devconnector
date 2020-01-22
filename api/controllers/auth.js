import { validationResult } from "express-validator";
import config from "config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { getErrors } from "../utils/helpers";

export const GET_AUTH = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password -date");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

export const POST_LOGIN = async (req, res) => {
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
};
