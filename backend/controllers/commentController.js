import mongoose from "mongoose";
import {
  createComment,
  findCommentById,
  updateComment,
} from "../services/commentService.js";
import { findPostById, updatePost } from "../services/postService.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const commentCreate = asyncHandler(async (req, res, next) => {
  const post = await findPostById(req.body.post);
  if (!post) {
    return next(new apiError(400, ["invalid post id"]));
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  const newComment = await createComment({ ...req.body, user: req.user.id });
  await updatePost(req.body.post, {
    comments: [...post.comments, newComment._id],
  });

  await session.commitTransaction();

  return res.json(new apiResponse(200, newComment));
});

export const commentReply = asyncHandler(async (req, res, next) => {
  const comment = await findCommentById(req.params.id);
  if (!comment) {
    return next(new apiError(400, ["comment not found"]));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  const newComment = await createComment({ ...req.body, user: req.user.id });
  await updateComment(comment._id, {
    replies: [...comment.replies, newComment._id],
  });

  await session.commitTransaction();
  return res.json(new apiResponse(200, newComment));
});
