import * as React from "react";

import { cn } from "@/lib/shadcn/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "text-typography-700 placeholder:text-typography-500 mt-2 block w-full rounded-sm border border-gray-200 bg-white px-5 py-3 text-sm placeholder:text-sm focus:outline-primary focus:ring-0",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
