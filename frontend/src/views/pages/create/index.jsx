import React, { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { makePostRequest } from "../apis/makePostRequest";

const index = () => {
  const [blog, setBlog] = useState(
    localStorage.getItem("blog")
      ? JSON.parse(localStorage.getItem("blog"))
      : {
          title: "",
          content: null,
        }
  );

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
    const res = await makePostRequest("http://localhost:4000/post", body);
    console.log(res);
  }

  useEffect(() => {
    localStorage.setItem("blog", JSON.stringify(blog));
  }, [blog]);

  return (
    <div>
      <div className="px-[5%] text-right">
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
      </div>
      <div className="mb-4 " style={{ marginInline: "50px" }}>
        <Input
          value={blog.title}
          className="bg-black border-0 px-0 py-8 text-5xl font-extrabold tracking-wide"
          placeholder="Title"
          onChange={(e) => {
            setBlog((prev) => {
              return { ...prev, title: e.target.value };
            });
          }}
        />
      </div>
      <Editor
        editable={true}
        blocks={blog.content}
        setBlocks={(e) => {
          setBlog((prev) => {
            return { ...prev, content: e };
          });
        }}
      />
    </div>
  );
};

export default index;
