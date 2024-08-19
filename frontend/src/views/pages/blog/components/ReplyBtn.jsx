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
import { CirCleLoader } from "../../../components/Loaders";
import { makePostRequest } from "../../../utils/apis/makePostRequest";
import { backend_url } from "../../../utils/constant";

const ReplyBtn = ({ comment, getReplies }) => {
  const user = useSelector((store) => store.user.data);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentDrawer, setCommentDrawer] = useState(false);

  async function postReply(id, body) {
    const res = await makePostRequest(`${backend_url}/comment/${id}`, body);
    await getReplies(id);
    setLoading(false);
    setCommentDrawer(false);
  }

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
            <div className="">
              <CommentCard comment={comment} isReply={true} />
            </div>
            <div className="relative">
              <textarea
                rows={15}
                placeholder="type your reply here ........"
                className="p-0 border-0 focus:outline-none w-full bg-[#00000000]"
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
                  <CirCleLoader size={"20"} stroke={"3"} color="white" />
                </Button>
              ) : (
                <Button
                  disabled={!text ? true : false}
                  className="absolute bottom-2 right-2"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setLoading(true);
                    postReply(comment._id, {
                      post: comment.post,
                      content: text,
                    });
                  }}
                >
                  <IoSend size={25} />
                </Button>
              )}
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
