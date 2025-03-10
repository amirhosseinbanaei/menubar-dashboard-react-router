import React from "react";
import { Button } from "./button";
import clsx from "clsx";

interface ButtonType {
  buttonTitle: string;
  icon?: JSX.Element;
  isActive?: boolean;
  variant?: string;
  onClick?: any;
}

export default function SidebarButton({
  buttonTitle,
  icon,
  isActive,
  variant,
  onClick,
}: ButtonType) {
  return (
    <Button
      variant="pure"
      onClick={onClick}
      className={clsx(
        "flex h-14 w-full items-center justify-start gap-x-2 rounded-sm px-5 text-sm font-medium text-text",
        { "bg-primary/10 text-primary": isActive === true },
        { "hover:bg-primary/10 hover:text-primary": variant === undefined },
        { "text-destructive hover:bg-destructive/20": variant === "logout" },
      )}
    >
      <span className="mb-1 h-5 w-5 text-inherit">{icon}</span>
      {buttonTitle}
    </Button>
  );
}
