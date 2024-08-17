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

const Comment = ({ comment, text }) => {
  const [thisComment, setThisComment] = useState({ ...comment });
  const [replies, setReplies] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div>{comment.content}</div>

      <div className="flex gap-2">
        <Drawer>
          <DrawerTrigger>
            <Badge
              variant="secondary"
              className="cursor-pointer"
              //   onClick={() => {
              //     setThisComment((prev) => {
              //       return {
              //         ...prev,
              //         replies: [...prev.replies, { content: text, replies: [] }],
              //       };
              //     });
              //   }}
            >
              Reply
            </Badge>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {thisComment.replies.length > 0 && (
          <Badge
            variant="secondary"
            className="cursor-pointer"
            onClick={() => {
              // setThisComment((prev) => {
              //   return {
              //     ...prev,
              //     replies: [...prev.replies, { content: text, replies: [] }],
              //   };
              // });
              setReplies((prev) => {
                return !prev;
              });
            }}
          >
            {replies ? "Hide Replies" : "Show Replies"}
          </Badge>
        )}
      </div>
      {thisComment.replies.length > 0 && replies && (
        <div className="flex flex-col gap-4 border-l-2 p-2">
          {thisComment.replies.map((m) => {
            return <Comment key={m.content} comment={m} text={text} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
