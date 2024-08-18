import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { makeGetRequest } from "../../../utils/apis/makeGetRequest";
import { makePostRequest } from "../../../utils/apis/makePostRequest";
import CommentCard from "../../../layout/components/CommentCard";
import ReplyBtn from "./ReplyBtn";

const Comment = ({ comment }) => {
  const [replies, setReplies] = useState(null);
  const [commentDrawer, setCommentDrawer] = useState(false);

  async function getReplies(id) {
    const res = await makeGetRequest(
      `http://localhost:4000/comment/replies/${id}`
    );
    if (res.success) {
      setReplies(res.data);
    }
  }

  async function postReply(id, body) {
    const res = await makePostRequest(
      `http://localhost:4000/comment/${id}`,
      body
    );
    await getReplies(id);
    setCommentDrawer(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <CommentCard comment={comment} />
      </div>

      <div className="flex gap-2 ml-12">
        <ReplyBtn
          comment={comment}
          postReply={postReply}
          commentDrawer={commentDrawer}
          setCommentDrawer={setCommentDrawer}
        />

        {replies ? (
          <Badge
            variant="secondary"
            className="cursor-pointer"
            onClick={() => {
              setReplies(null);
            }}
          >
            Hide Replies
          </Badge>
        ) : (
          comment.replies.length > 0 && (
            <Badge
              variant="secondary"
              className="cursor-pointer"
              onClick={() => {
                getReplies(comment._id);
              }}
            >
              Show Replies
            </Badge>
          )
        )}
      </div>
      {replies && (
        <div className="flex flex-col gap-4 border-l-2 p-2">
          {replies.map((m) => {
            return <Comment key={m._id} comment={m} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
