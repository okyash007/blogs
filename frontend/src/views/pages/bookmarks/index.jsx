import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../../utils/apis/makeGetRequest";
import { backend_url } from "../../utils/constant";
import PostCard from "../../layout/components/PostCard";
import UserCard from "../../layout/components/UserCard";

const index = () => {
  const [bookmarks, setBookmarks] = useState(null);

  async function getBookmarks() {
    const res = await makeGetRequest(`${backend_url}/user/bookmarks`);
    if (res.success) {
      setBookmarks(res.data);
    }
  }

  useEffect(() => {
    getBookmarks();
  }, []);

  if (!bookmarks) {
    return <div className="text-center">Loading</div>;
  }

  if (bookmarks.length === 0) {
    return (
      <p className="text-center text-xs text-[#ffffff5a]">
        You dont have any bookmarks
      </p>
    );
  }

  return (
    <div className="p-[5%] space-y-5">
      <h1 className="text-3xl">Bookmarks </h1>
      <div className="space-y-3">
        {bookmarks.map((m) => {
          return (
            <div
              className="flex gap-2 flex-col bg-[#ffffff1a] p-5 rounded-xl"
              key={m._id}
            >
              <UserCard user={m.user} />
              <PostCard post={m} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
