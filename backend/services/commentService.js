import Comment from "../model/commentModel.js";

export const createComment = async (body) => {
  const newComment = new Comment(body);
  await newComment.save();
  return newComment;
};

export const updateComment = async (id, body) => {
  const updatedComment = await Comment.findByIdAndUpdate(id, body);
  return updatedComment;
};

export const findCommentById = async (id) => {
  const comment = await Comment.findById(id);
  return comment;
};
