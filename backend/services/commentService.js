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


export const findComentWithReplies = async (id) => {
  const commnet = await Comment.findById(id)
    .populate({
      path: "replies",
      populate: {
        path: "user",
        select: "name email profile_image"
      },
    })
    .exec();
  return commnet;
};
