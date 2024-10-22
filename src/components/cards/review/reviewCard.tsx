'use client'
import IconStarEmpty from "@/icons/starEmpty";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from 'react-simple-star-rating';
import IconStarFilled from "@/icons/starFilled";
import IconCheck from "@/icons/check";
import { cn, formatDate } from "@/lib/utils";
import { useTranslations } from "next-intl";
import ReviewsSheetContent from "@/components/sheets/Reviews";
import Reviews from "@/types/public/Reviews";
import { useContext } from "react";
import { SheetContext } from "@/contextPorviders/sheetContext";

type ReviewCardProps = {
  reviewComment: string;
  reviewUserName: string;
  reviewScore?: number | string;
  lineClamp?: number;
  paymentVerified: boolean;
  isHeightAuto: boolean;
  lang: any;
  createdAt: string
  reviews: Reviews[]
  reviewsScore: number | undefined
  reviewsRating: string | undefined
};

export default function ReviewCard({
  reviewComment,
  reviewUserName,
  reviewScore,
  lineClamp,
  paymentVerified,
  isHeightAuto,
  createdAt,
  lang,
  reviews,
  reviewsRating,
  reviewsScore
}: ReviewCardProps) {

  const t = useTranslations('layout.clinicPage') as any
  const characterLimit = 120;

  const sheet = useContext(SheetContext);


  const truncatedComment = reviewComment?.length > 0
    ? reviewComment.length > characterLimit
      ? `${reviewComment.slice(0, characterLimit - 10)}...`
      : reviewComment
    : '';




  const formattedScore = typeof reviewScore === 'string'
    ? reviewScore.slice(0, 3) || '---'
    : reviewScore || 0;

  function openReviewsPopup() {
    const updatedReviews = reviews.map((item, index) =>
      index === 0 ? reviews.find(item => item.body === reviewComment) || item : item
    );

    sheet?.setSheetContent({
      side: "bottom",
      title: t("comments"),
      content: (
        <ReviewsSheetContent
          reviews={updatedReviews}
          reviewRating={reviewsRating}
          reviewScore={Number(reviewsScore)}

        />
      ),
    });
  }



  return (
    <div
      className={cn(
        'w-[311px] border rounded-md flex flex-col p-4 gap-3 bg-card h-[192px]',
        reviewComment != null && (isHeightAuto ? 'h-[192px]' : 'h-[192px]')
      )}
    >
      <div>
        <div className="flex flex-row justify-between event-none">
          <div className="flex justify-center items-center mt-[-2px]">
            <Rating
              allowFraction
              initialValue={typeof reviewScore === 'string' ? parseFloat(reviewScore) : reviewScore || 0}
              emptyIcon={<IconStarEmpty className="w-2 h-2 inline" />}
              fillIcon={<IconStarFilled className="w-2 h-2 inline" />}
              onClick={function noRefCheck() { }}
              readonly
            />
          </div>
          <div className="flex items-center justify-center">
            <span className="font-medium text-[11px] text-gray-500 whitespace-nowrap text-center">
              {formatDate(createdAt)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <Avatar className="w-[20px] h-[20px] bg-white">
            <AvatarFallback className="bg-white">{(reviewUserName[0].toUpperCase())}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">
            {reviewUserName.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </p>
        </div>
      </div>
      {reviewComment != null && (
        <div className="h-auto w-[300px] relative" >
          <p className="text-foreground text-xs">
            {
              !isHeightAuto ? (
                <>
                  {truncatedComment}
                  {reviewComment.length > characterLimit && (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={openReviewsPopup}
                    >
                      {t('see_all')}
                    </span>
                  )}
                </>
              ) : (
                <>
                  {reviewComment}
                </>
              )
            }

          </p>
        </div>
      )}



      {paymentVerified && (
        <div className="leading-3 flex flex-col h-[40px]">
          <span className="font-semibold text-[13px] text-success-foreground whitespace-nowrap">
            <IconCheck className="w-3 h-3 inline mr-1" />
            {t('payDistedavim')}
          </span>
          <span className="font-medium text-sm ml-4">
            {t('verifyDistedavim')}
          </span></div>
      )}

    </div>
  );
}