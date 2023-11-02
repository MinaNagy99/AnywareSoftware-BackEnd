import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { generateToken } from "../../middleWare/generateToken.js";
import { authSchema } from "./auth.validation.js";
import { validation } from "../../middleWare/validation.js";

import upload from "./fileUploud.js";

const authRouter = Router();

authRouter.route("/login").post(validation(authSchema), generateToken, login);
authRouter
  .route("/register")
  .post(upload.single("profileImg"), validation(authSchema), register);

export default authRouter;
