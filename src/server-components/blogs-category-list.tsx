import { Locale } from "@/i18n";
import { getLocale } from "next-intl/server";
import safeAwait from "safe-await";
import { notFound } from "next/navigation";
import PaginationButtonBar from "@/components/ui/paginationButtonGroup";
import BlogCard from "@/components/cards/blog/blogCard";
import SITEROUTES from "@/constants/site_routes";
import { getStrapiData } from "@/lib/strapi";
import { pick } from "lodash";

type ListProps = {
  domain: string;
  searchParams: {
    [key: string]: string;
  };
};

const pageSize = 10;

export default async function BlogsCategoryList({
  domain,
  searchParams,
}: ListProps) {
  const lang = (await getLocale()) as Locale;

  const [error, blogs] = await safeAwait(
    getStrapiData("/api/blogs", {
      locale: lang,
      filters: {
        blogs_categories: {
          domain: domain,
        },
      },
      populate: {
        blogs_categories: { fields: ["title", "description", "domain"] },
        cover_image: { fields: ["alternativeText", "width", "height", "url"] },
      },
      pagination: { page: searchParams.page, pageSize },
    }),
  );

  /* will render the error.tsx file */
  if (error || !blogs) throw new Error();

  /* will render the not-found.tsx file */
  if (blogs.length === 0) notFound();

  return (
    <div className="flex flex-col gap-8">
      {/* blogs list */}
      <div className="flex flex-col gap-4">
        {blogs.data.map((item: any) => (
          <BlogCard
            key={String(item.documentId)}
            href={{
              pathname: SITEROUTES.blogPage,
              params: {
                category_domain: item.blogs_categories.domain,
                blog_domain: item.domain,
              },
            }}
            title={item.title}
            description={item.description}
            category={item.blogs_categories.title}
            image={
              {
                ...pick(item.cover_image, [
                  "alternativeText",
                  "width",
                  "height",
                  "url",
                ]),
              } as ImageBaseType
            }
          />
        ))}
      </div>

      {/* will only be visible if there is more than one page */}
      {blogs.meta.pagination.pageCount > 1 && (
        <PaginationButtonBar
          totalPages={blogs.meta.pagination.pageCount}
          lang={lang}
        />
      )}
    </div>
  );
}
