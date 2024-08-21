import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

postSchema.index({ title: "text" });

const Post = mongoose.model("Post", postSchema);

export default Post;
