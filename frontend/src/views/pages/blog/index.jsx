import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../apis/makeGetRequest";
import { useParams } from "react-router-dom";
import Editor from "../../components/Editor";

const index = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  async function getPost(id) {
    const res = await makeGetRequest(`http://localhost:4000/post/${id}`);
    if (res.success === true) {
      const { title, content } = res.data;
      setBlog({ title, content: JSON.parse(content) });
    }
  }
  useEffect(() => {
    getPost(id);
  }, []);

  console.log(blog);

  if (!blog) {
    return <></>;
  }

  return (
    <div>
      <div className="mb-4" style={{ marginInline: "5%" }}>
        <h1 className="text-5xl font-bold tracking-wide">{blog.title}</h1>
      </div>
      <div>
        <Editor blocks={blog.content} editable={false} setBlocks={() => {}} />
      </div>
    </div>
  );
};

export default index;