import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../../utils/apis/makeGetRequest";
import { useParams } from "react-router-dom";
import Editor from "../../components/Editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { makePutRequest } from "../../utils/apis/makePutRequest";
import { useSelector } from "react-redux";
import { backend_url } from "../../utils/constant";
import { LoaderZoomie } from "../../components/Loaders";
import UpdateBtn from "./components/UpdateBtn";

const index = () => {
  const [blog, setBlog] = useState(null);
  const localUser = useSelector((store) => store.user.data);
  const { id } = useParams();

  async function getPost(id) {
    const res = await makeGetRequest(`${backend_url}/post/${id}`);
    if (res.success === true) {
      const { user, title, content } = res.data;
      if (user._id.toString() === localUser._id) {
        setBlog({ title, content: JSON.parse(content) });
      }
    }
  }

  useEffect(() => {
    getPost(id);
  }, []);

  if (!localUser.posts.includes(id)) {
    return (
      <div className="flex justify-center">
        <p className="text-xs text-[#ffffff3a]">You can edit your posts only</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center">
        <LoaderZoomie size="80" />
      </div>
    );
  }

  return (
    <div>
      <div className="px-[5%] text-right">
        <UpdateBtn blog={blog} />
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
