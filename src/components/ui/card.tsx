import * as React from "react";

import { cn } from "@/lib/shadcn/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-20 w-auto items-center justify-start gap-x-4 rounded-sm px-3 shadow-c-xl md:w-full",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardIndex = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-full w-10 items-center justify-center", className)}
    {...props}
  />
));
CardIndex.displayName = "CardIndex";

const CardImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, src }, ref) => (
  <Avatar className={cn("h-14 w-14 rounded-sm", className)}>
    <AvatarImage className="h-full w-full rounded-sm" src={`${src}`} />
    <AvatarFallback className="h-full w-full rounded-sm">
      <Skeleton className="h-full w-full rounded-sm" />
    </AvatarFallback>
  </Avatar>
));
CardImage.displayName = "CardImage";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("line-clamp-1 font-bold text-text", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("line-clamp-1 text-text", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-full items-center", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-28 items-center justify-center gap-x-3",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
  CardIndex,
};
