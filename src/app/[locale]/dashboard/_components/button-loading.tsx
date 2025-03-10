import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/shadcn/utils";
export default function ButtonLoading({ className }: { className?: string }) {
  return <Skeleton className={cn("h-10", className)} />;
}
