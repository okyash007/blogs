import { z } from "zod";
import mongoose from "mongoose";

const passwordSchema = z
  .string({ message: "password is required" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
    { message: "password is not in correct format" }
  );

export const userCreateSchema = z.object({
  name: z.string({ message: "name is required" }),
  email: z
    .string({ message: "email is required" })
    .email({ message: "email in not in correct format" }),
  password: passwordSchema,
});

export const userAccessSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .email({ message: "email in not in correct format" }),
  password: passwordSchema,
});

export const postCreateSchema = z.object({
  title: z.string({ message: "title is required" }),
  content: z.string({ message: "content is required" }),
});

export const postUpdateSchema = z.object({
  title: z.string({ message: "title is required" }),
  content: z.string({ message: "content is required" }),
});

export const commentSchema = z.object({
  content: z.string({ message: "content is required" }),
  post: z.string({ message: "post is required" }),
});
