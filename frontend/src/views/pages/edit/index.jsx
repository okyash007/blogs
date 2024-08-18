import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../../utils/apis/makeGetRequest";
import { useParams } from "react-router-dom";
import Editor from "../../components/Editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { makePutRequest } from "../../utils/apis/makePutRequest";
import { useSelector } from "react-redux";

const index = () => {
  const [blog, setBlog] = useState(null);
  const loalUser = useSelector((store) => store.user.data);
  const { id } = useParams();

  async function getPost(id) {
    const res = await makeGetRequest(`http://localhost:4000/post/${id}`);
    if (res.success === true) {
      const { user, title, content } = res.data;
      if (user.toString() === loalUser._id) {
        setBlog({ title, content: JSON.parse(content) });
      }
    }
  }

  async function updatePost(id, body) {
    const res = await makePutRequest(`http://localhost:4000/post/${id}`, body);
    console.log(res);
  }

  useEffect(() => {
    getPost(id);
  }, []);

  if (!blog) {
    return <div className="flex justify-center">loading</div>;
  }

  return (
    <div>
      <div className="px-[5%] text-right">
        <Button
          onClick={() => {
            updatePost(id, {
              title: blog.title,
              content: JSON.stringify(blog.content),
            });
          }}
        >
          Update
        </Button>
      </div>
      <div className="mb-4" style={{ marginInline: "50px" }}>
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
      <div>
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
    </div>
  );
};

export default index;
