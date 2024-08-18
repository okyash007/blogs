import mongoose from "mongoose";
import {
  createPost,
  findPostById,
  findPostPopulated,
  updatePost,
} from "../services/postService.js";
import { findUserById, updateUser } from "../services/userService.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { findAllPosts } from "../services/postService.js";

export const postCreate = asyncHandler(async (req, res, next) => {
  const user = await findUserById(req.user.id);
  if (!user) {
    return next(new apiError(400, ["user not found"]));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  const newPost = await createPost({ ...req.body, user: user._id });
  await updateUser(req.user.id, {
    posts: [...user.posts, newPost._id],
  });

  await session.commitTransaction();
  return res.json(new apiResponse(200, newPost));
});

export const postUpdate = asyncHandler(async (req, res, next) => {
  const post = await findPostById(req.params.id);
  if (!post) {
    return next(new apiError(400, ["post not found"]));
  }

  if (post.user.toString() !== req.user.id) {
    return next(new apiError(400, ["you can oly update you post"]));
  }

  await updatePost(req.params.id, req.body);
  return res.json(new apiResponse(200));
});

export const postFind = asyncHandler(async (req, res, next) => {
  const post = await findPostPopulated(req.params.id);
  if (!post) {
    return next(new apiError(400, ["post not found"]));
  }
  return res.json(new apiResponse(200, post));
});

export const postAll = asyncHandler(async (req, res) => {
  const posts = await findAllPosts();
  return res.json(new apiResponse(200, posts));
});
