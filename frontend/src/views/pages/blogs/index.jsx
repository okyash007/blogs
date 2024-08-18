import React, { useEffect, useState } from "react";
import PostCard from "../../layout/components/PostCard";
import { makeGetRequest } from "../../utils/apis/makeGetRequest";

const index = () => {
  const [blogs, setBlogs] = useState(null);

  async function getAllBlogs() {
    const res = await makeGetRequest("http://localhost:4000/post");
    if (res.success === true) {
      setBlogs(res.data);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (!blogs) {
    return <></>;
  }

  return (
    <div className="p-[5%] flex justify-center">
      <div className="w-[50%] min-w-[350px] flex flex-col gap-3">
        {blogs.map((m) => {
          return <PostCard key={m._id} post={m} />;
        })}
      </div>
    </div>
  );
};

export default index;
