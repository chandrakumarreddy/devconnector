import express from "express";
import { profileValidations } from "../utils/validations";
import { POST_PROFILE } from "../controllers/profile";

const router = express.Router();

router.post("/profile", profileValidations, POST_PROFILE);

export default router;
