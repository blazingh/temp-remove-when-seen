import IconStarEmpty from "@/icons/starEmpty";
import IconStarFilled from "@/icons/starFilled";
import { cn } from "@/lib/utils";

export function StarsRatingReadOnly({ reviewScore }: { reviewScore: number }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <IconStarEmpty key={index} className="w-3 h-3" />
        ))}
      </div>
      <div
        className={cn("absolute top-0 left-0 flex items-center gap-1 overflow-hidden")}
        style={{ width: `${(reviewScore / 5) * 100}%` }}
      >
        {[...Array(5)].map((_, index) => (
          <IconStarFilled key={index} className="w-3 h-3 flex-shrink-0" />
        ))}
      </div>
    </div >
  );
}
