import React from "react";
import Post from "./Post";
import { LoaderZoomie } from "../../../components/Loaders";

const Blogs = ({ blogs }) => {
  if (!blogs) {
    return (
      <div className="text-center">
        <LoaderZoomie size={"100"} />
      </div>
    );
  }

  return (
    <>
      {blogs.map((m) => {
        return <Post key={m._id} post={m} />;
      })}
    </>
  );
};

export default Blogs;
