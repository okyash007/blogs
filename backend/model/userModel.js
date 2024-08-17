import mongoose from "mongoose";
import { apiError } from "../utils/apiError.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: {
      type: String,
      require: true,
      unique: [true, "email alredy exists"],
    },
    password: { type: String, require: true },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    next(
      new apiError(400, [
        `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already exists. Please choose a different ${field}.`,
      ])
    );
  } else {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
