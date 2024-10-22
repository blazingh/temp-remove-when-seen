import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import SITEROUTES from "@/constants/site_routes";
import { getStrapiData } from "@/lib/strapi";
import { Link } from "@/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import safeAwait from "safe-await";

export default async function BlogCategoryShortList({
  domain,
}: {
  domain: string;
}) {
  const lang = await getLocale();
  const t = await getTranslations("pages.home");

  const [error1, categories] = await safeAwait(
    getStrapiData(
      "/api/blogs-categories",
      {
        locale: lang,
        filters: {
          domain: domain,
        },
      },
      [`blog_cat_${domain}`],
    ),
  );

  if (error1 || !categories || categories.data.length === 0) return null;

  const [error2, blogs] = await safeAwait(
    getStrapiData(
      "/api/blogs",
      {
        locale: lang,
        filters: {
          blogs_categories: {
            domain: domain,
          },
        },
        populate: {
          cover_image: {
            fields: ["alternativeText", "width", "height", "url"],
          },
        },
        pagination: { page: 1, pageSize: 10 },
      },
      [`blog_cat_${domain}`],
    ),
  );

  if (error2 || !blogs || blogs.data.length === 0) return null;

  const category = categories.data[0];

  return (
    <div>
      <div className="flex items-center justify-between md:justify-start gap-4 mb-2">
        <h2 className="font-bold text-xl">{category.title}</h2>
        <Link
          className="underline font-semibold text-sm"
          href={{
            pathname: SITEROUTES.blogsCategoryPage,
            params: {
              category_domain: category.domain,
            },
          }}
        >
          {t("view_all_button")}
        </Link>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {blogs.data.map((item: any) => (
            <CarouselItem key={item.id} className="basis-[167px] mr-2">
              <Link
                href={{
                  pathname: SITEROUTES.blogPage,
                  params: {
                    category_domain: category.domain,
                    blog_domain: item.domain,
                  },
                }}
              >
                <div className="border rounded-md flex flex-col overflow-hidden w-[167px] h-[267px]">
                  <div className="w-full aspect-square bg-gray-200 shrink-0">
                    {item.cover_image && (
                      <Image
                        src={item.cover_image.url}
                        alt={
                          item.cover_image.alternativeText || "base alt text"
                        }
                        width={item.cover_image.width}
                        height={item.cover_image.height}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="px-2 py-3 pb-4 flex flex-col justify-between h-full">
                    <span className="font-semibold leading-[20px] line-clamp-2">
                      {item.title}
                    </span>
                    <p className="font-medium text-[11px] leading-[14px] text-[#757575] line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export function BlogCategoryShortListSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-[28px] w-[120px] mb-4" />
      <div className="flex overflow-hidden w-full gap-4">
        {Array.from({ length: 10 }, (_, index) => index).map((item) => (
          <Skeleton key={item} className="w-[167px] h-[267px] flex-shrink-0" />
        ))}
      </div>
    </div>
  );
}
