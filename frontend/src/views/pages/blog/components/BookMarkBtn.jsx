import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { makeGetRequest } from "../../../utils/apis/makeGetRequest";
import { setUser } from "../../../../store/userSlice";
import { CirCleLoader } from "../../../components/Loaders";
import Success from "../../../layout/toast/Success";
import { toast } from "sonner";

const BookMarkBtn = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user.data);
  const dispatch = useDispatch();
  const { id } = useParams();

  async function bookmarkToggle(params) {
    const res = await makeGetRequest(
      `http://localhost:4000/user/bookmark/${id}`
    );
    setLoading(false);
    if (res.success) {
      toast(<Success message={res.message} />);
      if (user.bookmarks.includes(id)) {
        const newBookmarks = user.bookmarks.filter((f) => f !== id);
        dispatch(setUser({ ...user, bookmarks: newBookmarks }));
      } else {
        dispatch(setUser({ ...user, bookmarks: [...user.bookmarks, id] }));
      }
    }
  }

  if (!user) {
    return <></>;
  }

  if (loading) {
    return (
      <Button variant="secondary" size="icon">
        <CirCleLoader size="20" stroke="2" color="white" />
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={() => {
        setLoading(true);
        bookmarkToggle();
      }}
    >
      {user.bookmarks.includes(id) ? (
        <IoBookmark size={25} />
      ) : (
        <IoBookmarkOutline size={25} />
      )}
    </Button>
  );
};

export default BookMarkBtn;
