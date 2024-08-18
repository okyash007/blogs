import React, { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import PublishBtn from "./components/PublishBtn";

const index = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(
    localStorage.getItem("blog")
      ? JSON.parse(localStorage.getItem("blog"))
      : {
          title: "",
          content: null,
        }
  );

  useEffect(() => {
    localStorage.setItem("blog", JSON.stringify(blog));
  }, [blog]);

  return (
    <div>
      <div className="px-[5%] text-right">
        <PublishBtn />
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
