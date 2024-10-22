import { Locale } from "@/i18n";
import { getLocale } from "next-intl/server";
import safeAwait from "safe-await";
import { notFound } from "next/navigation";
import PaginationButtonBar from "@/components/ui/paginationButtonGroup";
import BlogCard from "@/components/cards/blog/blogCard";
import SITEROUTES from "@/constants/site_routes";
import { getStrapiData } from "@/lib/strapi";
import { pick } from "lodash";
import GuideCard from "@/components/cards/guide/guideCard";

type ListProps = {
  domain: string;
  searchParams: {
    [key: string]: string;
  };
};

const pageSize = 10;

export default async function TreatmentsCategoryList({
  domain,
  searchParams,
}: ListProps) {
  const lang = (await getLocale()) as Locale;

  const [error, treatments] = await safeAwait(
    getStrapiData(
      "/api/distedavim-guides",
      {
        locale: lang,
        filters: {
          category: {
            domain: domain,
          },
        },
        populate: {
          category: { fields: ["title", "description", "domain"] },
          cover_image: {
            fields: ["alternativeText", "width", "height", "url"],
          },
        },
        pagination: { page: searchParams.page, pageSize },
      },
      [`treatment_cat_${domain}`],
    ),
  );
  console.log(error);

  /* will render the error.tsx file */
  if (error || !treatments) throw new Error();

  /* will render the not-found.tsx file */
  if (treatments.length === 0) notFound();

  return (
    <div className="flex flex-col gap-8">
      {/* blogs list */}
      <div className="flex flex-col gap-4">
        {treatments.data.map((item: any) => (
          <GuideCard
            key={item.documentId}
            title={item.title}
            description={item.description}
            category={item.category.title}
            href={{
              pathname: SITEROUTES.treatmentPage,
              params: {
                category_domain: item.category.domain,
                treatment_domain: item.domain,
              },
            }}
            image={{
              url: item.cover_image.url,
              width: item.cover_image.width,
              height: item.cover_image.height,
              alternativeText: item.cover_image.alternativeText,
            }}
          />
        ))}
      </div>

      {/* will only be visible if there is more than one page */}
      {treatments.meta.pagination.pageCount > 1 && (
        <PaginationButtonBar
          totalPages={treatments.meta.pagination.pageCount}
          lang={lang}
        />
      )}
    </div>
  );
}
