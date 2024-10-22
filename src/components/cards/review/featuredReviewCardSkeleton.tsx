import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedReviewCardSkeleton(
) {
  return (
    <div className="w-[216px] h-[216px] border rounded-md flex flex-col p-4 gap-3 bg-card justify-between flex-shrink-0">
      <div className="h-[166px]">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4 mt-1" />
        <Skeleton className="w-1/2 h-4 mt-1" />
        <Skeleton className="w-full h-4 mt-1" />
      </div>
      <div className="flex gap-2 w-full">
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex flex-col flex-shrink-0 w-full">
          <Skeleton className="w-2/3 h-3" />
          <Skeleton className="w-1/2 h-3 mt-1" />
          <Skeleton className="w-2/3 h-3 mt-1" />
        </div>
      </div>
    </div>
  )
}
