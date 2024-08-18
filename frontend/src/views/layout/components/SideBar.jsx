import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  const user = useSelector((store) => store.user.data);
  const [open, setOpen] = useState(false);
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size={"icon"}>
          <TbLayoutSidebarLeftExpand size={25} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-xs">{user.email}</p>
          </div>

          <div>
            <Link to={"/create"}>Create Blog</Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
