import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
export default function ImageWithLoader({ src }: { src: string }) {
  return (
    <div className={`relative aspect-square h-full w-full`}>
      <Avatar className="h-full w-full rounded-sm">
        <AvatarImage src={`${src}`} className="rounded-sm" />
        <AvatarFallback className="rounded-sm">
          <Skeleton className="h-full w-full rounded-sm" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
