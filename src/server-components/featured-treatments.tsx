import { getFeaturedtreatments } from "@/app/[lang]/(default)/actions";
import { ROUTES } from "@/constants/routes";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n";
import FeaturedTreatmentCard from "@/components/cards/treatment/featuredTreatmentCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeaturedTreatmentCardSkeleton from "@/components/cards/treatment/skeletonFeaturedTreatmentCard";
import SITEROUTES from "@/constants/site_routes";
import safeAwait from "safe-await";
import { getStrapiData } from "@/lib/strapi";
import { pick } from "lodash";

export const revalidate = 0;

export function FeaturedTreatmentsListSkeleton() {
  return (
    <div className="flex items-between justify-start gap-2 overflow-hidden flex-shrink-0">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <FeaturedTreatmentCardSkeleton key={index} />
        ))}
    </div>
  );
}

export default async function FeaturedTreatmentsList({}: {}) {
  const lang = (await getLocale()) as Locale;

  const [error, treatments] = await safeAwait(
    getStrapiData(
      "/api/distedavim-guides",
      {
        locale: lang,
        populate: {
          category: { fields: ["domain"] },
          cover_image: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
      ["treatments_list"],
    ),
  );

  if (error || !treatments || treatments.data.length === 0) {
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
        {treatments.data?.map((item: any) => (
          <CarouselItem key={item.id} className="basis-[167px] mr-2">
            <FeaturedTreatmentCard
              image={{
                ...pick(item.cover_image, [
                  "url",
                  "alternativeText",
                  "width",
                  "height",
                ]),
              }}
              href={{
                pathname: SITEROUTES.treatmentPage,
                params: {
                  category_domain: item.category.domain,
                  treatment_domain: item.domain,
                },
              }}
              title={item.title}
              description={item.description}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
