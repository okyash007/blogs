import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { makeGetRequest } from "../../apis/makeGetRequest";
import { Textarea } from "@/components/ui/textarea";
import { IoSend } from "react-icons/io5";
import { makePostRequest } from "../../apis/makePostRequest";

const Comment = ({ comment }) => {
  const [replies, setReplies] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [text, setText] = useState("");
  const [commentDrawer, setCommentDrawer] = useState(false);

  async function getReplies(id) {
    const res = await makeGetRequest(
      `http://localhost:4000/comment/replies/${id}`
    );
    if (res.success) {
      setReplies(res.data);
    }
  }

  console.log(commentDrawer);

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
        <p className="text-2xl font-bold">{comment.user.name}</p>
        <p>{comment.content}</p>
      </div>

      <div className="flex gap-2">
        <Drawer isOpen={commentDrawer} onOpenChange={setCommentDrawer}>
          <DrawerTrigger>
            <Badge
              onClick={() => {
                setReplyTo(comment);
              }}
              variant="secondary"
              className="cursor-pointer"
            >
              Reply
            </Badge>
          </DrawerTrigger>
          <DrawerContent className="p-6">
            <div className="flex flex-col gap-3">
              {replyTo && (
                <div>
                  <p className="text-2xl font-bold">{replyTo.user.name}</p>
                  <p>{replyTo.content}</p>
                </div>
              )}
              <div className="relative">
                <Textarea
                  rows={9}
                  placeholder="type your reply here ........"
                  className="p-0 border-0"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
                <Button
                  disabled={!text ? true : false}
                  className="absolute bottom-2 right-2"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    postReply(comment._id, {
                      post: comment.post,
                      content: text,
                    });
                  }}
                >
                  <IoSend size={25} />
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>

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
