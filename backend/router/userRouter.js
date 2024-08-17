import { Router } from "express";
import {
  userAuth,
  userLogin,
  userSignup,
} from "../controllers/userController.js";
import { userAccessSchema, userCreateSchema } from "../zod/schema.js";
import { validateZodSchema } from "../middlewares/validateZodSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const userRouter = Router();

userRouter
  .route("/signup")
  .post(validateZodSchema(userCreateSchema), userSignup);
userRouter.route("/login").post(validateZodSchema(userAccessSchema), userLogin);
userRouter.route("/auth").get(verifyToken, userAuth);
