import { Router } from "express";
import {
  commentCreate,
  commentRepliesFind,
  commentReply,
} from "../controllers/commentController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateZodSchema } from "../middlewares/validateZodSchema.js";
import { commentSchema } from "../zod/schema.js";

export const commentRouter = Router();

commentRouter
  .route("/")
  .post(verifyToken, validateZodSchema(commentSchema), commentCreate);

commentRouter
  .route("/:id")
  .post(verifyToken, validateZodSchema(commentSchema), commentReply);

commentRouter.route("/replies/:id").get(commentRepliesFind);
