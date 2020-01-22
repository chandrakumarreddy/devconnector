import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import { loginValidations } from "../utils/validations";
import { GET_AUTH, POST_LOGIN } from "../controllers/auth";

const router = express.Router();

router.get("/", checkAuth, GET_AUTH);

router.post("/login", loginValidations, POST_LOGIN);

export default router;
