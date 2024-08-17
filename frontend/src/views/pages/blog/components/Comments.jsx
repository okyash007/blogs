import React, { useState } from "react";
import Comment from "./Comment";

const Comments = () => {
  const [comments, setComments] = useState([
    {
      content: "hbiejcnedlce",
      replies: [
        { content: "dsibckdsc ds", replies: [] },
        { content: "evbiejvefv", replies: [] },
      ],
    },
  ]);
  const [text, setText] = useState("");

  return (
    <div>
      <div>
        {comments.map((m) => {
          return <Comment key={m.content} comment={m} text={text} />;
        })}
      </div>
      <div>
        <input
          className="bg-black"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default Comments;
