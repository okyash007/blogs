import {
  createUser,
  findUser,
  findUserBookmarks,
  findUserById,
  findUserPopulate,
  updateUser,
} from "../services/userService.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createToken } from "../utils/createToken.js";
import { hashPassword, matchPassword } from "../utils/hashPassword.js";

export const userSignup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = hashPassword(password);

  const newUser = await createUser({ name, email, password: hashedPassword });
  if (!newUser) {
    return next(new apiError(400, ["user canot be created"]));
  }
  const token = createToken(newUser._id);

  return res.json(new apiResponse(200, { user: newUser, token }));
});

export const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    return next(new apiError(400, ["user not found"]));
  }

  const isPasswordCorrect = matchPassword(password, user.password);
  if (!isPasswordCorrect) {
    return next(new apiError(400, ["incorrect password"]));
  }

  const token = createToken(user._id);

  return res.json(new apiResponse(200, { user: user, token }));
});

export const userAuth = asyncHandler(async (req, res, next) => {
  const user = await findUserById(req.user.id);
  if (!user) {
    return next(new apiError(400, ["user not found"]));
  }
  return res.json(new apiResponse(200, { user }));
});

export const userFind = asyncHandler(async (req, res) => {
  const user = await findUserPopulate(req.params.id);
  if (!user) {
    return next(new apiError(400, ["user not found"]));
  }
  const { password, bookmarks, ...rest } = user._doc;
  return res.json(new apiResponse(200, rest));
});

export const userUpdate = asyncHandler(async (req, res, next) => {
  const { name, email, profile_image, password } = req.body;
  const user = await findUserById(req.user.id);

  if (!user) {
    return next(new apiError(400, ["user not found"]));
  }

  const isPasswordCorrect = matchPassword(password, user.password);
  if (!isPasswordCorrect) {
    return next(new apiError(400, ["incorrect password"]));
  }

  await updateUser(req.user.id, { name, email, profile_image });
  res.json(new apiResponse(200));
});

export const userBookmarkToggle = asyncHandler(async (req, res, next) => {
  const user = await findUserById(req.user.id);

  if (!user) {
    return next(new apiError(400, ["user not found"]));
  }

  if (user.bookmarks.includes(req.params.id)) {
    const newBookmarks = user.bookmarks.filter(
      (f) => f.toString() !== req.params.id
    );
    await updateUser(req.user.id, { bookmarks: newBookmarks });
    return res.json(new apiResponse(200, undefined, "Bookmark removed"));
  } else {
    await updateUser(req.user.id, {
      bookmarks: [...user.bookmarks, req.params.id],
    });
    return res.json(new apiResponse(200, undefined, "Bookmark added"));
  }
});

export const userBookmarks = asyncHandler(async (req, res) => {
  const user = await findUserBookmarks(req.user.id);

  if (!user) {
    return next(new apiError(400, ["user not found"]));
  }
  return res.json(new apiResponse(200, user.bookmarks));
});
