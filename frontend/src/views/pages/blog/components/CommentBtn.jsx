import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { makePostRequest } from "../../../utils/apis/makePostRequest";
import Onboard from "../../../components/Onboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CommentBtn = ({ post, setThisComments }) => {
  const user = useSelector((store) => store.user.data);
  const [text, setText] = useState("");
  const [commentModal, setCommentModal] = useState(false);

  async function postComment(body) {
    const res = await makePostRequest("http://localhost:4000/comment", body);
    if (res.success) {
      setThisComments((prev) => {
        return [...prev, { ...res.data, user }];
      });
      setCommentModal(false);
    }
  }

  if (user) {
    return (
      <Drawer open={commentModal} onOpenChange={setCommentModal}>
        <DrawerTrigger>
          <Button className="cursor-pointer">Comment</Button>
        </DrawerTrigger>
        <DrawerContent className="p-6">
          <div className="relative mt-4">
            <textarea
              placeholder="type your comment here ........"
              className="p-0 border-0 focus:outline-none w-full bg-[#000000]"
              rows={20}
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
    );
  } else {
    return (
      <Dialog>
        <DialogTrigger>
          <Button className="cursor-pointer">Comment</Button>
        </DialogTrigger>
        <DialogContent>
          <Onboard dafault="login" />
        </DialogContent>
      </Dialog>
    );
  }
};

export default CommentBtn;
