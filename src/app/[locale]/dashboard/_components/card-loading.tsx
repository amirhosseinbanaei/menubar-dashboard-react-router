import { Skeleton } from "@/components/ui/skeleton";

export default function CardLoading() {
  return (
    <div className="flex h-20 w-auto items-center justify-start gap-x-4 rounded-sm px-3 shadow-c-xl md:w-full">
      {/* Card Index Layer */}
      <div className="flex h-full w-10 items-center justify-center">
        <Skeleton className="rounded-xss h-10 w-10" />
      </div>
      {/* Card Image Layer */}
      <div className="h-14 w-14">
        <Skeleton className="rounded-xs h-14 w-14" />
      </div>
      {/* Card Title Layer */}
      <div className="flex w-40 items-center justify-center">
        <Skeleton className="rounded-xss h-5 w-full" />
      </div>
      {/* Card Description Layer */}
      <div className="w-80 md:w-[calc(100%-400px)] flex flex-col gap-y-2">
        <Skeleton className="rounded-xss h-5 w-full" />
      </div>
      {/* Card Footer Layer */}
      <div className="flex h-full w-28 items-center justify-center gap-x-3">
      <Skeleton className="rounded-xss w-10 h-10" />
      <Skeleton className="rounded-xss w-10 h-10" />
      </div>
    </div>
  );
}
