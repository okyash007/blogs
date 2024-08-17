import React from "react";
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

const SideBar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size={"icon"}>
          <TbLayoutSidebarLeftExpand size={25} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="m-3 rounded-3xl h-max border-2">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
