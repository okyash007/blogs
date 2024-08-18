import React, { useState } from "react";
import Comment from "./Comment";
import CommentBtn from "./CommentBtn";
import { Button } from "@/components/ui/button";

const Comments = ({ comments, post }) => {
  const [thisComments, setThisComments] = useState([...comments]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <Button>Book mark</Button>
        <Button>share</Button>
        <CommentBtn post={post} setThisComments={setThisComments} />
      </div>
      <div className="space-y-5">
        {thisComments.map((m) => {
          return <Comment key={m.content} comment={m} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
