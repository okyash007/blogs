import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";

const Public = () => {
  const user = useSelector((store) => store.user.data);

  return user ? (
    <Navigate to={"/blogs"} />
  ) : (
    <>
      <div>
        <Navbar>
          <p className="text-2xl p-2">Blogs</p>
        </Navbar>
      </div>
      <Outlet />
    </>
  );
};

export default Public;
