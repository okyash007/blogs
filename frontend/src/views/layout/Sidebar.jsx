import { isAction } from "@reduxjs/toolkit";
import React from "react";
import { TbHome } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { LuFileEdit } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { TbUser } from "react-icons/tb";
import { useSelector } from "react-redux";
import { TbUserCog } from "react-icons/tb";

const Sidebar = () => {
  const user = useSelector((store) => store.user.data);

  return (
    <div className="p-2 flex flex-col gap-2">
      <NavLink
        to={"/blogs"}
        className={({ isActive }) =>
          isActive
            ? "bg-[#6947BF] w-10 h-10 flex justify-center text-white items-center rounded-xl"
            : "w-10 h-10 flex justify-center items-center"
        }
      >
        <div>
          <TbHome size={20} />
        </div>
      </NavLink>

      {user ? (
        <>
          <NavLink
            to={"/create"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#6947BF] w-10 h-10 flex justify-center text-white items-center rounded-xl"
                : "w-10 h-10 flex justify-center items-center"
            }
          >
            <div>
              <LuFileEdit size={20} />
            </div>
          </NavLink>
          <NavLink
            to={"/bookmarks"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#6947BF] w-10 h-10 flex justify-center text-white items-center rounded-xl"
                : "w-10 h-10 flex justify-center items-center"
            }
          >
            <div>
              <FaRegBookmark size={20} />
            </div>
          </NavLink>
          <NavLink
            to={`/profile/${user._id}`}
            className={({ isActive }) =>
              isActive
                ? "bg-[#6947BF] w-10 h-10 flex justify-center text-white items-center rounded-xl"
                : "w-10 h-10 flex justify-center items-center"
            }
          >
            <div>
              <TbUser size={25} />
            </div>
          </NavLink>
          <NavLink
            to={`/profile/edit`}
            className={({ isActive }) =>
              isActive
                ? "bg-[#6947BF] w-10 h-10 flex justify-center text-white items-center rounded-xl"
                : "w-10 h-10 flex justify-center items-center"
            }
          >
            <div>
              <TbUserCog size={25} />
            </div>
          </NavLink>
        </>
      ) : (
        <>
          <div className="w-10 h-10 flex justify-center items-center">
            <LuFileEdit size={20} />
          </div>
          <div className="w-10 h-10 flex justify-center items-center">
            <FaRegBookmark size={20} />
          </div>
          <div className="w-10 h-10 flex justify-center items-center">
            <TbUser size={25} />
          </div>
          <div className="w-10 h-10 flex justify-center items-center">
            <TbUserCog size={25} />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
