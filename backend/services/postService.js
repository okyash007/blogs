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

export const findPostPopulated = async (id) => {
  const post = await Post.findById(id)
    .populate({
      path: "user", // Populate the user who created the post
      select: "name email profile_image", // Select the fields you want to populate
    })
    .populate({
      path: "comments", // Populate top-level comments
      populate: [
        {
          path: "user", // Populate the user who created the comment
          select: "name email profile_image",
        },
      ],
    });
  return post;
};

export const findAllPosts = async () => {
  const posts = await Post.find().populate({
    path: "user",
    select: "name email profile_image",
  });
  return posts;
};
