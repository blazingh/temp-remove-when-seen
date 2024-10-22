import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonGuideCard() {
  return (
    <div className="min-w-[343px] w-full h-[116px] border rounded-md overflow-hidden flex">
      {/* image */}
      <Skeleton className="relative min-w-[96px] w-[96px] h-full" />
      <div className="flex flex-col gap-2 p-3 w-full">
        {/* title */}
        <Skeleton className="relative w-1/2 h-8" />
        {/* subtitle */}
        <Skeleton className="relative w-1/3 h-8" />
      </div>
    </div>
  );
}
