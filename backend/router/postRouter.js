import { Router } from "express";
import {
  postAll,
  postCreate,
  postFind,
  postUpdate,
} from "../controllers/postController.js";
import { postCreateSchema, postUpdateSchema } from "../zod/schema.js";
import { validateZodSchema } from "../middlewares/validateZodSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const postRouter = Router();

postRouter.get("/", postAll);

postRouter
  .route("/")
  .post(verifyToken, validateZodSchema(postCreateSchema), postCreate);

postRouter
  .route("/:id")
  .put(verifyToken, validateZodSchema(postUpdateSchema), postUpdate);

postRouter.route("/:id").get(postFind);
