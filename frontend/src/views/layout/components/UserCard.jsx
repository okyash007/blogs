import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const UserCard = ({ user, email }) => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <Link to={`/profile/${user._id}`}>
          <h1 className="font-bold hover:underline">{user.name}</h1>
        </Link>
        {email && <p className="text-xs text-[#ffffff6a]">{user.email}</p>}
      </div>
    </div>
  );
};

export default UserCard;
