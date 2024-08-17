import React, { useState } from "react";

const Comment = ({ comment, text }) => {
  const [thisComment, setThisComment] = useState({ ...comment });

  return (
    <div className="bg-[#ffffff1a] p-2">
      <div>{comment.content}</div>
      <div className="flex flex-col gap-2">
        {thisComment.replies &&
          thisComment.replies.map((m) => {
            return <Comment key={m.content} comment={m} text={text} />;
          })}
      </div>
      <button
        onClick={() => {
          setThisComment((prev) => {
            return {
              ...prev,
              replies: [...prev.replies, { content: text, replies: [] }],
            };
          });
        }}
      >
        reply
      </button>
    </div>
  );
};

export default Comment;
