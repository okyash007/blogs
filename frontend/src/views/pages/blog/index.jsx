import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../../utils/apis/makeGetRequest";
import { useParams } from "react-router-dom";
import Editor from "../../components/Editor";
import { Button } from "@/components/ui/button";
import Comments from "./components/Comments";


const index = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  async function getPost(id) {
    const res = await makeGetRequest(`http://localhost:4000/post/${id}`);
    if (res.success === true) {
      const { _id, title, content, comments } = res.data;
      setBlog({ title, content: JSON.parse(content), comments, _id });
    }
  }
  useEffect(() => {
    getPost(id);
  }, []);

  if (!blog) {
    return <div></div>;
  }

  return (
    <div className="pb-[5%]">
      <div className="mb-4 mx-[5%]">
        <h1 className="text-5xl font-bold tracking-wide">{blog.title}</h1>
      </div>
      <div>
        <Editor blocks={blog.content} editable={false} setBlocks={() => {}} />
      </div>
      <div className="mx-[5%]">
        <Comments
          comments={blog.comments}
          post={blog._id}
        />
      </div>
    </div>
  );
};

export default index;
