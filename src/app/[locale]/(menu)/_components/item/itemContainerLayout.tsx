import { ReactNode } from "react";

export default function ItemContainerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="sm-custom:grid-cols-2 2xl-custom:grid-cols-3 3xl-custom:grid-cols-4 grid w-full grid-cols-1 gap-5 md:grid-cols-2">
      {children}
    </div>
  );
}
