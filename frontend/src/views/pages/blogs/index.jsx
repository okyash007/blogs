import React, { useEffect, useState } from "react";
import PostCard from "../../layout/components/PostCard";
import { makeGetRequest } from "../../utils/apis/makeGetRequest";
import { backend_url } from "../../utils/constant";
import { LoaderZoomie } from "../../components/Loaders";
import Post from "./components/Post";

const index = () => {
  const [blogs, setBlogs] = useState(null);

  async function getAllBlogs() {
    const res = await makeGetRequest(`${backend_url}/post`);
    if (res.success === true) {
      setBlogs(res.data);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (!blogs) {
    return (
      <div className="text-center">
        <LoaderZoomie size={"100"} />
      </div>
    );
  }

  return (
    <div className="p-[5%] space-y-4">
      <h1 className="text-3xl">Blogs </h1>
      <div className="space-y-3">
        {blogs.map((m) => {
          return <Post key={m._id} post={m} />;
        })}
      </div>
    </div>
  );
};

export default index;
