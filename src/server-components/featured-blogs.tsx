import { getFeaturedBlogs } from "@/app/[lang]/(default)/actions";
import { ROUTES } from "@/constants/routes";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n";
import FeaturedBlogCard from "@/components/cards/blog/featuredBlogCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import FeaturedTreatmentCardSkeleton from "@/components/cards/treatment/skeletonFeaturedTreatmentCard";
import SITEROUTES from "@/constants/site_routes";

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

export default async function FeaturedBlogsList({ }: {}) {

    const lang = (await getLocale()) as Locale;

    const data = await getFeaturedBlogs({ limit: "8" });

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
                        <FeaturedBlogCard
                            lang={lang}
                            item={item}
                            href={{
                                pathname: SITEROUTES.blogPage,
                                params: { options: item.domain?.split("/") },
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
