"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { StarsRatingReadOnly } from "@/components/starsRating";
import { useState } from "react";

export default function HomeReviewCard({
  reviewComment,
  reviewUserName,
  reviewScore,
  reviewTitle,
  reviewAvatar,
  lang,
}: {
  reviewComment: string;
  reviewUserName: string;
  reviewScore: number;
  reviewTitle: string;
  reviewAvatar: string;
  lang: string;
}) {
  const [reviewCommentIsExpanded, setReviewCommentIsExpanded] = useState(false);

  const toggleButtonText = reviewCommentIsExpanded
    ? lang === "en"
      ? "Show less"
      : "Daha az göster"
    : lang === "en"
      ? "Show more"
      : "Daha fazla göster";

  return (
    <div
      className={cn(
        "w-[250px] h-[216px] justify-between border rounded-md flex flex-col p-4 bg-card relative",
      )}
    >
      <div
        onClick={() => setReviewCommentIsExpanded(!reviewCommentIsExpanded)}
        className={cn(
          "flex flex-col justify-between p-4",
          "bg-card border w-[250px] rounded-md transition-all ease-in-out z-10",
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          reviewCommentIsExpanded ? "h-[316px]" : "h-[216px]",
        )}
      >
        <div>
          <p
            className={cn(
              `text-foreground text-sm select-none`,
              reviewCommentIsExpanded ? "" : "line-clamp-[4]",
            )}
          >
            {reviewComment}
          </p>
          <button
            onClick={() => setReviewCommentIsExpanded((p) => !p)}
            className="text-sm text-left mb-0 text-gray-500"
          >
            {toggleButtonText}
          </button>
        </div>

        <div className="mt-3">
          <div className="flex gap-2">
            {reviewAvatar ? (
              <Image
                className="w-10 h-10 rounded-full"
                width={50}
                height={50}
                src={reviewAvatar}
                alt={reviewUserName}
              />
            ) : (
              <Avatar>
                <AvatarFallback>{reviewUserName[0]}</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              {/* user name */}
              <p className="text-sm font-bold">{reviewUserName}</p>
              {/*
              <p className="text-xs font-normal mb-1">{reviewTitle}</p>
              */}
              {/* review score */}
              <div className="flex gap-1 items-center event-none h-min max-h-4">
                <span className="font-bold text-sm text-foreground font-nunito">
                  {reviewScore}
                </span>
                <StarsRatingReadOnly reviewScore={reviewScore} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
