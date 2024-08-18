import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { makeGetRequest } from "../../../utils/apis/makeGetRequest";
import { makePostRequest } from "../../../utils/apis/makePostRequest";
import CommentCard from "../../../layout/components/CommentCard";
import ReplyBtn from "./ReplyBtn";
import { LoaderZoomie } from "../../../components/Loaders";
import { backend_url } from "../../../utils/constant";

const Comment = ({ comment }) => {
  const [replies, setReplies] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getReplies(id) {
    const res = await makeGetRequest(
      `${backend_url}/comment/replies/${id}`
    );
    setLoading(false);
    if (res.success) {
      setReplies(res.data);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <CommentCard comment={comment} />
      </div>

      <div className="flex gap-2 ml-12">
        <ReplyBtn comment={comment} getReplies={getReplies} />

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
          comment.replies.length > 0 &&
          (loading ? (
            <Badge variant="secondary" className="cursor-pointer">
              <LoaderZoomie size={"50"} />
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="cursor-pointer"
              onClick={() => {
                setLoading(true);
                getReplies(comment._id);
              }}
            >
              Show Replies
            </Badge>
          ))
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
