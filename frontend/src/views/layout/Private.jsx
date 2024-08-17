import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Private = () => {
  const user = useSelector((store) => store.user.data);

  return user ? (
    <>
      <div className="mb-3">
        <Navbar>
          <div className="flex justify-between items-center">
            <SideBar />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">{user.name}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <p>{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
