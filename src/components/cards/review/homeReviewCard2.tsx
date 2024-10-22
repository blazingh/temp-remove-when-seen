import IconStarEmpty from "@/icons/starEmpty";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from 'react-simple-star-rating'
import IconStarFilled from "@/icons/starFilled";
import IconCheck from "@/icons/check";
import { cn } from "@/lib/utils";
import Image from 'next/image';

export default function HomeReviewCard2(
  {
    reviewComment,
    reviewTitle,
    reviewUserName,
    reviewScore,
    reviewType,
    reviewAvatar
  }: {
    reviewComment: string
    reviewTitle: string
    reviewUserName: string
    reviewScore: number
    reviewType: string
    reviewAvatar: string
  }
) {

  return (
    <div>

      <div className={cn('w-[261px] rounded-md flex flex-col pb-3 pt-3 gap-2', reviewComment != null && '')}>
        {/* comment */}
        {reviewComment != null && <p className="text-foreground text-sm">{reviewComment}</p>}

        {/* Altta sabit kalan bölüm */}
        <div className="mt-auto">
          <div className="flex gap-2">

            {reviewAvatar ? (
              <Image className="w-10 h-10 rounded-full" width={50} height={50} src={reviewAvatar} alt={reviewUserName} />
            ) : (
              <Avatar>
                <AvatarFallback>{reviewUserName[0]}</AvatarFallback>
              </Avatar>
            )}

            <div className="flex flex-col">
              {/* user name*/}
              <p className="text-sm font-bold">{reviewUserName}</p>
              <p className="text-xs font-normal mb-1">{reviewType}</p>
              {/* review score*/}
              <div className="flex gap-1 items-end event-none h-min max-h-4">
                <span className="font-bold text-sm text-foreground font-nunito">{reviewScore}</span>
                <Rating
                  allowFraction
                  initialValue={reviewScore}
                  emptyIcon={<IconStarEmpty className="w-3 h-3 inline" />}
                  fillIcon={<IconStarFilled className="w-3 h-3 inline" />}
                  onClick={function noRefCheck() { }}
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>

  )
}
