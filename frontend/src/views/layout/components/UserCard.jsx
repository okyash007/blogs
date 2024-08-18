import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserCard = ({ user }) => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h1 className="font-bold">{user.name}</h1>
      </div>
    </div>
  );
};

export default UserCard;
