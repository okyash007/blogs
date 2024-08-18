import React from "react";
import PostCard from "../../../layout/components/PostCard";
import UserCard from "../../../layout/components/UserCard";

const Post = ({ post }) => {
  return (
    <div className="space-y-3 bg-[#ffffff1a] p-5 rounded-2xl">
      <UserCard user={post.user} />
      <PostCard post={post} />
    </div>
  );
};

export default Post;
