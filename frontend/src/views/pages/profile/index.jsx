import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { makeGetRequest } from "../../utils/apis/makeGetRequest";
import { backend_url } from "../../utils/constant";
import UserCard from "../../layout/components/UserCard";
import PostCard from "../../layout/components/PostCard";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { formatDateTime } from "../../utils/helper";
import { LoaderZoomie } from "../../components/Loaders";

const index = () => {
  const { id } = useParams();
  const localUser = useSelector((store) => store.user.data);
  const [user, setUser] = useState(null);

  async function getUser(id) {
    const res = await makeGetRequest(`${backend_url}/user/${id}`);
    if (res.success) {
      setUser(res.data);
    }
  }

  useEffect(() => {
    getUser(id);
  }, [id]);

  if (!user) {
    return <div className="text-center"><LoaderZoomie size="80" /></div>;
  }

  return (
    <div className="space-y-3 p-[5%]">
      <div className="flex items-center justify-between">
        <UserCard user={user} />
        <div>
          <p className="text-right text-xs text-[#ffffff5a]">Joined on</p>
          <p className="text-right text-xs text-[#ffffff5a]">
            {`${formatDateTime(user.createdAt).date}`}
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {user.posts.map((m) => {
          return (
            <div
              className="bg-[#ffffff1a] p-5 rounded-2xl relative"
              key={m._id}
            >
              {localUser && localUser._id === user._id && (
                <Link to={`/edit/${m._id}`}>
                  <Badge className="absolute bottom-5 left-5 cursor-pointer">
                    edit
                  </Badge>
                </Link>
              )}
              <PostCard post={m} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
