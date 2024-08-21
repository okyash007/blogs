import mongoose from "mongoose";
import {
  createPost,
  deletePost,
  findPostById,
  findPostPopulated,
  updatePost,
} from "../services/postService.js";
import {
  findUser,
  findUserById,
  findUsers,
  updateUser,
} from "../services/userService.js";
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
  const { search } = req.query;
  const posts = await findAllPosts(search);
  return res.json(new apiResponse(200, posts));
});

export const postDelete = asyncHandler(async (req, res, next) => {
  const bookmarkUsers = await findUsers({ bookmarks: req.params.id });
  const postUser = await findUser({ posts: req.params.id });

  if (postUser._id.toString() !== req.user.id) {
    console.log();
    return next(new apiError(400, "you can only delte your post"));
  }

  async function updateBookmarkUser(user) {
    const newBookMarks = user.bookmarks.filter(
      (f) => f.toString() !== req.params.id
    );
    // console.log(newBookMarks);
    const res = await updateUser(user._id, {
      bookmarks: newBookMarks,
    });
    // console.log(res);
  }

  async function updatePostUser(user) {
    const newPosts = user.posts.filter((f) => f.toString() !== req.params.id);
    // console.log(newPosts);
    const res = await updateUser(user._id, { posts: newPosts });
    // console.log(res);
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  const deletePostRes = await deletePost(req.params.id);
  console.log(deletePostRes);

  bookmarkUsers.map(async (m) => {
    await updateBookmarkUser(m);
  });

  await updatePostUser(postUser);

  await session.commitTransaction();

  return res.json(new apiResponse(200));
});
