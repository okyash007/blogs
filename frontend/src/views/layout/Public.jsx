import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const Public = () => {
  const user = useSelector((store) => store.user.data);

  return user ? (
    <Navigate to={"/blogs"} />
  ) : (
    <>
      <div>
        <Navbar>
          <div className="flex items-center justify-between">
            <p className="text-2xl p-2">Blogs</p>
            <Button>Login</Button>
          </div>
        </Navbar>
      </div>
      <Outlet />
    </>
  );
};

export default Public;
