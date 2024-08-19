import React from "react";
import UserCard from "./UserCard";

const CommentCard = ({ comment, isReply}) => {
  return (
    <div>
      <UserCard user={comment.user} />
      <p className={isReply ? "ml-14 line-clamp-2" : "ml-14"}>{comment.content}</p>
    </div>
  );
};

export default CommentCard;
