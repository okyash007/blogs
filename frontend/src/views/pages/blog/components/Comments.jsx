import React, { useState } from "react";
import Comment from "./Comment";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IoSend } from "react-icons/io5";
import { makePostRequest } from "../../apis/makePostRequest";
import { useSelector } from "react-redux";

const Comments = ({ comments, post }) => {
  const user = useSelector((store) => store.user.data);
  const [thisComments, setThisComments] = useState([...comments]);
  const [text, setText] = useState("");

  async function postComment(body) {
    const res = await makePostRequest("http://localhost:4000/comment", body);
    if (res.success) {
      setThisComments((prev) => {
        return [...prev, { ...res.data, user }];
      });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Drawer>
          <DrawerTrigger>
            <Button className="cursor-pointer">Comment</Button>
          </DrawerTrigger>
          <DrawerContent className="p-6">
            <div className="relative mt-4">
              <Textarea
                placeholder="type your comment here ........"
                className="p-0 border-0"
                rows={9}
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
                  postComment({ post: post, content: text });
                }}
              >
                <IoSend size={25} />
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
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
