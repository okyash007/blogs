import React from "react";
import { MdFileDownloadDone } from "react-icons/md";

const Success = ({ message }) => {
  return (
    <div className="">
      <div className="flex gap-2 items-center">
        <MdFileDownloadDone size="20" color="green" />
        <p className="text-green-600 text-xl">Success</p>
      </div>
      <p className="text-xs text-[#0000004a]">
        {message ? message : "Task done successfullt"}
      </p>
    </div>
  );
};

export default Success;
