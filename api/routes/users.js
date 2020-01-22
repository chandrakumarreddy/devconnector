import express from "express";
import { registerValidations } from "../utils/validations";
import { POST_REGISTER } from "../controllers/users";

const router = express.Router();

router.post("/register", registerValidations, POST_REGISTER);

export default router;
