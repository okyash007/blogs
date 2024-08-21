import { Router } from "express";
import {
  userAuth,
  userBookmarks,
  userBookmarkToggle,
  userFind,
  userLogin,
  userSignup,
  userUpdate,
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
userRouter.route("/bookmarks").get(verifyToken, userBookmarks);
userRouter.route("/:id").get(userFind);
userRouter
  .route("/update")
  .post(verifyToken, validateZodSchema(userCreateSchema), userUpdate);

userRouter.route("/bookmark/:id").get(verifyToken, userBookmarkToggle);
