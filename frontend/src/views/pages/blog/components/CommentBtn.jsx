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
import { CirCleLoader } from "../../../components/Loaders";
import { backend_url } from "../../../utils/constant";

const CommentBtn = ({ post, setThisComments }) => {
  const user = useSelector((store) => store.user.data);
  const [text, setText] = useState("");
  const [commentModal, setCommentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function postComment(body) {
    const res = await makePostRequest(`${backend_url}/comment`, body);
    setLoading(false);
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
            {loading ? (
              <Button
                className="absolute bottom-2 right-2"
                variant="ghost"
                size="icon"
              >
                <CirCleLoader size={"20"} stroke={"3"} color="white"/>
              </Button>
            ) : (
              <Button
                disabled={!text ? true : false}
                className="absolute bottom-2 right-2"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setLoading(true);
                  postComment({ post: post, content: text });
                }}
              >
                <IoSend size={25} />
              </Button>
            )}
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
