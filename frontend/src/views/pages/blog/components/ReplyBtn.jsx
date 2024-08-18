import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommentCard from "../../../layout/components/CommentCard";
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
import { IoSend } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Onboard from "../../../components/Onboard";

const ReplyBtn = ({ comment, postReply, commentDrawer, setCommentDrawer }) => {
  const user = useSelector((store) => store.user.data);
  const [text, setText] = useState("");

  if (user) {
    return (
      <Drawer open={commentDrawer} onOpenChange={setCommentDrawer}>
        <DrawerTrigger>
          <Badge variant="secondary" className="cursor-pointer">
            Reply
          </Badge>
        </DrawerTrigger>
        <DrawerContent className="p-6">
          <div className="flex flex-col gap-3">
            <div>
              <CommentCard comment={comment} />
            </div>
            <div className="relative">
              <textarea
                rows={20}
                placeholder="type your reply here ........"
                className="p-0 border-0 focus:outline-none w-full bg-[#000000]"
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
    );
  } else {
    return (
      <Dialog>
        <DialogTrigger>
          <Badge variant="secondary" className="cursor-pointer">
            Reply
          </Badge>
        </DialogTrigger>
        <DialogContent>
          <Onboard dafault="login" />
        </DialogContent>
      </Dialog>
    );
  }
};

export default ReplyBtn;
