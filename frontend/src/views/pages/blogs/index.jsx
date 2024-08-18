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
    <div className="p-[5%] flex justify-center">
      <div className="w-[50%] min-w-[350px] flex flex-col gap-3">
        {blogs.map((m) => {
          return <Post key={m._id} post={m} />;
        })}
      </div>
    </div>
  );
};

export default index;
