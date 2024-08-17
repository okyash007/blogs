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
