import React from "react";
import { Badge } from "@/components/ui/badge";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <div className="bg-[#ffffff1a] p-5 rounded-2xl flex flex-col gap-3">
      <div className="">
        <UserCard user={post.user} />
      </div>
      <div>
        <Link to={`/blogs/${post._id}`}>
          <h1 className="text-3xl font-extrabold tracking-wide hover:underline">
            {post.title}
          </h1>
        </Link>
      </div>
      <div className="text-right">
        <Badge>{post.createdAt}</Badge>
      </div>
    </div>
  );
};

export default PostCard;
