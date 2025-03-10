import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <div className="flex h-16 w-full items-center justify-between rounded-lg bg-white bg-opacity-20 px-4">
      <span className="flex items-center gap-x-3">
        <Avatar>
          <AvatarImage src="/default/avatar.png" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <h1 className="text-lg font-bold text-white">ادمین منوبار</h1>
      </span>
    </div>
  );
}
