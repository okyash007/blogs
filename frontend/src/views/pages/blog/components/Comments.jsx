import React, { useState } from "react";
import Comment from "./Comment";
import CommentBtn from "./CommentBtn";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Success from "../../../layout/toast/Success";
import { copyToClipboard } from "../../../utils/helper";
import { useParams } from "react-router-dom";
import BookMarkBtn from "./BookMarkBtn";
import { FaShareAlt } from "react-icons/fa";

const Comments = ({ comments, post }) => {
  const [thisComments, setThisComments] = useState([...comments]);
  const { id } = useParams();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <BookMarkBtn />
        <Button
          variant="secondary"
          size="icon"
          onClick={() => {
            copyToClipboard(`https://blogs.okyash.tech/blogs/${id}`);
            toast(<Success message={"Link copied"} />);
          }}
        >
          <FaShareAlt size={20} />
        </Button>
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
