import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { makeDeleteRequest } from "../../../utils/apis/makeDeleteRequest";
import { backend_url } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../store/userSlice";
import { LoaderZoomie } from "../../../components/Loaders";

const DeleteBtn = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.data);
  const [loading, setLoading] = useState(false);

  async function deletePost(id) {
    const res = await makeDeleteRequest(`${backend_url}/post/${id}`);
    setLoading(false);
    if (res.success) {
      const newPosts = user.posts.filter((f) => f !== id);
      const newBookmarks = user.bookmarks.filter((f) => f !== id);
      dispatch(setUser({ ...user, posts: newPosts, bookmarks: newBookmarks }));
      navigate("/blogs");
    }
  }

  if (loading) {
    return (
      <Badge className="cursor-pointer">
        <LoaderZoomie color="black" size={"50"} />
      </Badge>
    );
  }

  return (
    <Badge
      className="cursor-pointer"
      onClick={() => {
        setLoading(true);
        deletePost(id);
      }}
    >
      delete
    </Badge>
  );
};

export default DeleteBtn;
