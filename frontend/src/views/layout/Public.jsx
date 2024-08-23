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
import Sidebar from "./Sidebar";

const Public = () => {
  const user = useSelector((store) => store.user.data);

  return user ? (
    <Navigate to={"/blogs"} />
  ) : (
    <>
      <div className="flex flex-col h-screen">
        <div className="">
          <Navbar>
            <div className="flex items-center justify-between">
              <Link to={"/blogs"} className="text-2xl p-2">
                ZuAi
              </Link>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger>
                    <Button variant="secondary" className="rounded-full">
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <Onboard dafault="login" />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger>
                    <Button className="bg-[#6947BF] hover:bg-[#6947BF9a] rounded-full">
                      Join now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <Onboard dafault="signup" />
                  </DialogContent>
                </Dialog>
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
  );
};

export default Public;
