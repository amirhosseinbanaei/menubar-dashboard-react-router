import { cn } from "@/lib/shadcn/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}
export default function Container({
  children,
  className,
}: ContainerProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex h-auto min-h-40 w-full flex-wrap rounded-sm bg-white p-5 shadow-c-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
