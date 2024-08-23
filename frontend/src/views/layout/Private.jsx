import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { setUser } from "../../store/userSlice";
import UserCard from "./components/UserCard";
import { FiUser } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Success from "./toast/Success";
import Sidebar from "./Sidebar";

const Private = () => {
  const user = useSelector((store) => store.user.data);
  const dispatch = useDispatch();

  return user ? (
    <>
      <div className="flex flex-col h-screen">
        <div className="">
          <Navbar>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link to={"/blogs"} className="text-2xl p-2">
                  ZuAi
                </Link>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="hover:outline">
                      <AvatarImage
                        src={user.profile_image}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        <FiUser size={25} />
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <UserCard user={user} email={true} />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link to={"/profile/edit"}>
                      <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                    </Link>
                    <Link to={"/create"}>
                      <DropdownMenuItem>Create Blog</DropdownMenuItem>
                    </Link>
                    <Link to={"/bookmarks"}>
                      <DropdownMenuItem>Bookmarks</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => {
                        dispatch(setUser(null));
                        localStorage.clear();
                        toast(<Success message={"Succesfullt loged out"} />);
                      }}
                    >
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Navbar>
        </div>
        <div className="flex overflow-y-auto flex-grow">
          <div className=" sticky top-0  bg-white">
            <Sidebar />
          </div>
          <div className=" flex-grow rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to={"/blogs"} />
  );
};

export default Private;
