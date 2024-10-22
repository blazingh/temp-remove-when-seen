import HomeReviewCard from "@/components/cards/review/homeReviewCard";
import { getFeaturedReviews } from "@/app/[lang]/(default)/actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import FeaturedReviewCardSkeleton from "@/components/cards/review/featuredReviewCardSkeleton";

export const revalidate = 0

export function FeaturedReviewsListSkeleton() {
  return (
    <div className="flex items-between justify-start gap-2 overflow-hidden flex-shrink-0">
      {Array(10).fill(0).map((_, index) => <FeaturedReviewCardSkeleton key={index} />)}
    </div>
  )
}

export default async function FeaturedReviewsList({ lang }: { lang: any }) {

  const data = await getFeaturedReviews();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent showOverflow >
        {data.rows?.map((item: any) => (
          <CarouselItem key={item.id} className="basis-[250px] mr-2">
            <HomeReviewCard
              key={item.id}
              reviewAvatar={item.avatar}
              reviewComment={lang === "en" ? item.comment_en : item.comment}
              reviewTitle={lang === "en" ? item.title_en : item.title}
              reviewUserName={`${item.name} ${item.surname}`}
              reviewScore={(item.rating).toFixed(1)}
              lang={lang}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
