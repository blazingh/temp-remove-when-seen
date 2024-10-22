import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Reviews from "@/types/public/Reviews";
import { StarsRatingReadOnly } from "@/components/starsRating";

export default function FeaturedReviewCard(
  {
    item
  }: {
    item: Reviews
  }
) {
  return (
    <div className="w-[216px] h-[216px] border rounded-md flex flex-col px-4 pt-4 gap-3 bg-card mr-4">
      <div className="h-[166px]">
        <p className="text-foreground text-sm">{item.body}</p>
      </div>
      <div className="flex gap-2 h-[50px]">
        <Avatar className="w-8 h-8">
          <AvatarFallback>{"null".charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{item.rate}</p>
          <div className="flex gap-1 items-center event-none h-min max-h-4">
            <span className="font-bold text-sm text-foreground font-nunito">{item.rate}</span>
            <StarsRatingReadOnly
              reviewScore={parseFloat(item.rate || '0')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
