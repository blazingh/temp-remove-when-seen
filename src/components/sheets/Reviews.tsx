"use client";
import { SheetContext } from "@/contextPorviders/sheetContext";
import ReviewCard from "../cards/review/reviewCard";
import { StarsRatingReadOnly } from "../starsRating";
import { Button, ButtonProps } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { SheetClose, SheetContent, SheetTitle } from "../ui/sheet";
import { useContext, useEffect, useState } from "react";

export default function ReviewsSheetContent({
  reviews,
  reviewRating,
  reviewScore,
}: {
  reviews: any[];
  reviewRating?: string;
  reviewScore?: number;
}) {
  const [sortedReviews, setSortedReviews] = useState<any>([]);

  useEffect(() => {
    const sorted = [...reviews].sort((a, b) => {
      if (a.body === null && b.body === null) return 0;
      if (a.body === null) return 1;
      if (b.body === null) return -1;

      return a.state - b.state || b.category_id - a.category_id;
    });
    setSortedReviews(sorted);
  }, [reviews]);

  return (
    <ScrollArea className="p-0 h-[80svh]">
      {/* review score header */}
      {/* { (reviewRating && reviewScore) && <div className="flex flex-col gap-2 items-center my-4"> */}
      {
        <div className="flex flex-col gap-2 items-center my-4">
          <span className="text-5xl font-poppins font-extrabold">
            {reviewRating?.slice(0, 3) || "---"}
          </span>

          <StarsRatingReadOnly reviewScore={Number(reviewRating)} />
          <p>{reviewScore} Değerlendirme</p>
        </div>
      }

      {/* review list */}
      <div className="flex flex-col items-center gap-3 w-full">
        {sortedReviews.map((item: any) => (
          <ReviewCard
            lang={"en"}
            isHeightAuto={true}
            key={item}
            reviewComment={item.body}
            reviewUserName={`${item.users_name} ${item.users_last_name}`}
            reviewScore={item.rate}
            paymentVerified={true}
            createdAt={item.created_at}
            reviews={reviews}
            reviewsRating={reviewRating}
            reviewsScore={reviewScore}
          />
        ))}
      </div>

      <ScrollBar />
    </ScrollArea>
  );
}
