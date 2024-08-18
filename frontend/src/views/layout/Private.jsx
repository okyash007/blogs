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

const Private = () => {
  const user = useSelector((store) => store.user.data);
  const dispatch = useDispatch();

  return user ? (
    <>
      <div className="mb-3">
        <Navbar>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* <SideBar /> */}
              <Link to={"/blogs"} className="text-2xl p-2">
                Blogs
              </Link>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost">{user.name}</Button>
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
                  <DropdownMenuItem
                    onClick={() => {
                      dispatch(setUser(null));
                      localStorage.clear();
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
      <Outlet />
    </>
  ) : (
    <Navigate to={"/blogs"} />
  );
};

export default Private;
