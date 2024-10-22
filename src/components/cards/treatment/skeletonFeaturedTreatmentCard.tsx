import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedTreatmentCardSkeleton() {

  return (
    <div data-id="img-lst-tw" className="w-[167px] h-[253px] flex flex-col justify-between gap-2 pb-4 border rounded-md overflow-hidden flex-shrink-0">
      <div data-id="ftcc-img">
        <Skeleton className="relative w-full h-32 rounded-none" />
        <Skeleton className="mt-2 mx-2 h-4 w-20" />
      </div>
      <div className="px-2">
        <Skeleton className="mt-2 px-2 h-4 w-24" />
        <Skeleton className="mt-2 px-2 h-4" />
      </div>
    </div>
  )
}
