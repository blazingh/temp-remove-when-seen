import { getFeaturedDentists } from "@/app/[lang]/(default)/actions";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n";
import FeaturedDoctorCard from "@/components/cards/doctor/featuredDoctorCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeaturedDentistCardSkeleton from "@/components/cards/doctor/skeletonFeaturedDentistCard";
import SITEROUTES from "@/constants/site_routes";

export const revalidate = 0;

export function FeaturedDentistsListSkeleton() {
  return (
    <div className="flex items-between justify-start gap-2 overflow-hidden flex-shrink-0">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <FeaturedDentistCardSkeleton key={index} />
        ))}
    </div>
  );
}

export default async function FeaturedDentistsList({}: {}) {
  const lang = (await getLocale()) as Locale;

  const randomSeed = Math.floor(Math.random() * 100);

  const data = await getFeaturedDentists({ randomSeed: randomSeed });
  // 21-6-4-12-10-5 5-4-12-12-4-9
  if (!data || data.rows.length === 0) {
    return null;
  }
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {data.rows?.map((item) => (
          <CarouselItem key={item.id} className="basis-[167px] mr-2">
            <FeaturedDoctorCard
              lang={lang}
              item={item}
              href={{
                pathname: SITEROUTES.dentistPage,
                params: { options: item.url?.split("/") },
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
