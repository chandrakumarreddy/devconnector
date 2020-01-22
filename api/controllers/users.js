import { validationResult } from "express-validator";
import config from "config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

import { getErrors } from "../utils/helpers";

export const POST_REGISTER = async (req, res) => {
  try {
    const { errors } = validationResult(req);
    if (Boolean(errors.length)) return res.json({ errors: getErrors(errors) });
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).send("Email is already registered");
    const newUser = new User({ email, password, name });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
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
};
