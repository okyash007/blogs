import React from "react";
import UserCard from "./UserCard";

const CommentCard = ({ comment }) => {
  return (
    <div>
      <UserCard user={comment.user} />
      <p className="ml-14">{comment.content}</p>
    </div>
  );
};

export default CommentCard;
