import { getFeaturedClinics } from "@/app/[lang]/(default)/actions";
import FeaturedClinicCard from "@/components/cards/clinic/featuredClinicCard";
import FeaturedClinicCardSkeleton from "@/components/cards/clinic/skeletonFeaturedClinicCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import SITEROUTES from "@/constants/site_routes";

export const revalidate = 0;

export function FeaturedKidsClinicsListSkeleton() {
    return (
        <div className="flex items-between justify-start gap-2 overflow-hidden flex-shrink-0">
            {Array(10)
                .fill(0)
                .map((_, index) => (
                    <FeaturedClinicCardSkeleton key={index} />
                ))}
        </div>
    );
}
export default async function FeaturedKidsClinicsList({ }: {}) {
    const randomSeed = Math.floor(Math.random() * 100);

    const data = await getFeaturedClinics({ randomSeed: randomSeed, dentist_branch_id: 5 });

    if (!data || data.rows?.length === 0) {
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
                {data.rows?.map(
                    (item) =>
                        item.url !== "" && (
                            <CarouselItem key={item.id} className="basis-[167px] mr-2">
                                <FeaturedClinicCard
                                    item={item}
                                    href={{
                                        pathname: SITEROUTES.clinicPage,
                                        params: { options: item.url.split("/") },
                                    }}
                                />
                            </CarouselItem>
                        ),
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
