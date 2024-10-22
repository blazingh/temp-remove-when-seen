import { Skeleton } from "@/components/ui/skeleton"

export default function DoctorCardSkeleton() {
  return (
    <div className="w-full h-[140px] border rounded-md overflow-hidden flex bg-white">
      <Skeleton className="relative w-[96px] max-w-[96px] h-full" />
      <div className="flex flex-col gap-2 p-2 w-full">
        <Skeleton className="w-32 h-5" />
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-20 h-4 mt-6" />
        <Skeleton className="w-20 h-4" />
      </div>
    </div>
  )
}
