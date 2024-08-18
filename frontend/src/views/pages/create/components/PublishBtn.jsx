import React from "react";
import { makePostRequest } from "../../../utils/apis/makePostRequest";
import { backend_url } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const PublishBtn = ({ blog }) => {
  const navigate = useNavigate();
  const postSchema = z.object({
    title: z
      .string({
        message: "title is required",
      })
      .min(1, { message: "title must be something" }),
    content: z
      .string({
        message: "content is required",
      })
      .min(1, { message: "content must be something" }),
  });

  async function createPost(body) {
    const res = await makePostRequest(`${backend_url}/post`, body);
    if (res.success) {
      localStorage.removeItem("blog");
      navigate(`/blogs/${res.data._id}`);
    }
  }

  return (
    <Button
      onClick={() => {
        const isValid = postSchema.safeParse({
          title: blog.title,
          content: JSON.stringify(blog.content),
        });
        if (isValid.success === true) {
          createPost(isValid.data);
        }
      }}
    >
      Publish
    </Button>
  );
};

export default PublishBtn;
