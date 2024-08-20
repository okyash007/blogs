import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Onboard from "../components/Onboard";


const Public = () => {
  const user = useSelector((store) => store.user.data);

  return user ? (
    <Navigate to={"/blogs"} />
  ) : (
    <>
      <div>
        <Navbar>
          <div className="flex items-center justify-between">
            <Link to={"/blogs"} className="text-2xl p-2">
              Blogs
            </Link>
            <Dialog>
              <DialogTrigger>
                <Button>Login</Button>
              </DialogTrigger>
              <DialogContent>
                <Onboard dafault="login" />
              </DialogContent>
            </Dialog>
          </div>
        </Navbar>
      </div>
      <Outlet />
    </>
  );
};

export default Public;
