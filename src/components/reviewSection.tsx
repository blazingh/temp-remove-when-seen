import ReviewCard from "@/components/cards/review/reviewCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ReviewsSheetTrigger from "./sheets/Reviews";
import { pick } from "lodash";
import { getMessages, getTranslations } from "next-intl/server";
import SheetContentTrigger from "./sheets/sheet-content-trigger";
import ReviewsSheetContent from "./sheets/Reviews";
import { StarsRatingReadOnly } from "./starsRating";

export default async function ReviewSection({
  lang,
  reviews,
  reviewRating,
  reviewScore,
}: {
  lang: any;
  reviews: any[];
  reviewRating?: string;
  reviewScore?: number;
}) {
  const t = (await getTranslations("layout.clinicPage")) as any;
  const messages = await getMessages();

  const sorted = [...reviews].sort((a, b) => {
    if (a.body === null && b.body === null) return 0;
    if (a.body === null) return 1;
    if (b.body === null) return -1;

    return a.state - b.state || b.category_id - a.category_id;
  });

  return (
    <div
      className="w-full border rounded-md pt-4 pb-6 flex flex-col gap-4"
      id="reviews"
    >
      <h3 className="px-4 text-2xl font-bold font-poppins">{t("comments")}</h3>
      {reviewRating && <div className="flex flex-row items-center justify-between px-4">

        <div className="flex justify-center items-center">
          <span className="font-extrabold text-xl">
            {reviewRating.slice(0, 3)}
          </span>
          <div className="ml-1 mb-1">
            <StarsRatingReadOnly reviewScore={parseFloat(reviewRating)} />
          </div>
        </div>
        <span className="text-sm font-medium">{reviewScore} {t("review")}</span>
      </div>}

      {/* <div className="flex items-center event-none gap-2 ">

        <a href={`#reviews`}>
          <span className="font-medium text-xs underline">
            ({item.review_count}) {t("review")}
          </span>
        </a>
      </div> */}

      <div className="pl-4 flex items-center justify-between">
        <ScrollArea className="px-0 w-full whitespace-no-wrap">
          <div className="flex items-center gap-2 w-full">
            {sorted.map((item: any) => (
              <ReviewCard
                lang={lang}
                isHeightAuto={false}
                key={item.id}
                reviewComment={item.body}
                lineClamp={2}
                reviewUserName={`${item.users_name} ${item.users_last_name}`}
                reviewScore={Number(item.rate)}
                createdAt={item.created_at}
                paymentVerified={true}
                reviews={reviews}
                reviewsRating={reviewRating}
                reviewsScore={reviewScore}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* popup SheetTrigger */}
      <div className="w-full px-4">
        <SheetContentTrigger
          variant={"outline"}
          className="w-full font-bold text-sm rounded-md"
          sheetProps={{
            side: "bottom",
            title: t("comments"),
            content: (
              <ReviewsSheetContent
                reviews={reviews}
                reviewRating={reviewRating}
                reviewScore={reviewScore}
              />
            ),
          }}
        >
          {t("more")}
        </SheetContentTrigger>
      </div>
    </div>
  );
}
