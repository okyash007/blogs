import React from "react";
import { Badge } from "@/components/ui/badge";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostCard = ({ post }) => {
  return (
    <div className="rounded-2xl flex flex-col gap-3">
      <div>
        <Link to={`/blogs/${post._id}`}>
          <h1 className="text-3xl font-extrabold tracking-wide hover:underline ">
            {post.title}
          </h1>
        </Link>
      </div>
      <div className="flex justify-end gap-3">
        <Badge>{post.createdAt}</Badge>
      </div>
    </div>
  );
};

export default PostCard;
