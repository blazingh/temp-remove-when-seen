import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import BlogCategoryShortList, {
  BlogCategoryShortListSkeleton,
} from "@/server-components/blog-category-short-list";
import { getStrapiData } from "@/lib/strapi";
import safeAwait from "safe-await";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    lang: Locale;
  };
};

export default async function Page({ params: { lang } }: PageProps) {
  unstable_setRequestLocale(lang);

  const [error, categories] = await safeAwait(
    getStrapiData(
      "/api/blogs-categories",
      {
        locale: lang,
      },
      ["blogs_list"],
    ),
  );

  if (error || !categories) throw new Error();

  if (categories.data.length === 0) notFound();

  return (
    <div className="flex flex-col gap-6">
      {categories.data.map((category: any) => (
        <Suspense
          fallback={<BlogCategoryShortListSkeleton />}
          key={category.documentId}
        >
          <BlogCategoryShortList domain={category.domain} />
        </Suspense>
      ))}
    </div>
  );
}
