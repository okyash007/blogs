import Post from "../model/postModel.js";

export const createPost = async (body) => {
  const newPost = new Post(body);
  await newPost.save();
  return newPost;
};

export const updatePost = async (id, body) => {
  const updatedPost = await Post.findByIdAndUpdate(id, body);
  return updatedPost;
};

export const findPostById = async (id) => {
  const post = await Post.findById(id);
  return post;
};

