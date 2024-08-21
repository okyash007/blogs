import User from "../model/userModel.js";

export const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

export const findUser = async (filter) => {
  const user = await User.findOne(filter);
  return user;
};

export const createUser = async (body) => {
  const newUser = new User(body);
  await newUser.save();
  return newUser;
};

export const updateUser = async (id, body) => {
  const updatedUser = await User.findByIdAndUpdate(id, body);
  return updatedUser;
};

export const findUserPopulate = async (id) => {
  const user = await User.findById(id).populate("posts");
  return user;
};

export const findUserBookmarks = async (id) => {
  const user = await User.findById(id).populate({
    path: "bookmarks", // Populate top-level comments
    populate: [
      {
        path: "user", // Populate the user who created the comment
        select: "name email profile_image",
      },
    ],
  });
  return user;
};

export const findUsers = async (filter) => {
  const user = await User.find(filter);
  return user;
};
