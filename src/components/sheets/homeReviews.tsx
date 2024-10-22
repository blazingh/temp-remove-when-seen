"use client";
import HomeReviewCard2 from "@/components/cards/review/homeReviewCard2";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedReviews } from "@/app/[lang]/(default)/actions";
import { useLocale, useTranslations } from "next-intl";

export default function ReviewsSheetContent() {
  const reviews = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      return await getFeaturedReviews();
    },
  });
  const lang = useLocale();
  const t = useTranslations("layout.right_menu") as any;
  return (
    <ScrollArea className="p-0 h-[80svh]">
      {/* review list */}
      <div className="flex flex-col items-center gap-4 w-full">
        {reviews.data?.rows.map((item: any) => (
          <HomeReviewCard2
            key={item}
            reviewAvatar={item.avatar}
            // reviewType={item.title}
            // reviewComment={item.comment}
            reviewComment={lang === "en" ? item.comment_en : item.comment}
            reviewTitle={lang === "en" ? item.title_en : item.title}
            reviewUserName={`${item.name} ${item.surname}`}
            reviewScore={item.rating.toFixed(1)}
            reviewType={""}
          />
        ))}
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
