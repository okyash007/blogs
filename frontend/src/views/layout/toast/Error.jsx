import React from "react";
import { MdError } from "react-icons/md";

const Error = ({ message }) => {
  return (
    <div className="">
      <div className="flex gap-2 items-center">
        <MdError size="20" color="red" />
        <p className="text-red-600 text-xl">Error</p>
      </div>
      <p className="text-xs text-[#0000004a]">
        {message ? message : "Something went wrong"}
      </p>
    </div>
  );
};

export default Error;
