import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { getStrapiData } from "@/lib/strapi";
import safeAwait from "safe-await";
import { notFound } from "next/navigation";
import Loading from "./loading";
import BlogsCategoryList from "@/server-components/blogs-category-list";

type PageProps = {
  params: {
    category_domain: string;
    lang: Locale;
  };
  searchParams: {
    [key: string]: string;
  };
};

export default async function Page({
  params: { lang, category_domain },
  searchParams,
}: PageProps) {
  unstable_setRequestLocale(lang);

  const [error, categories] = await safeAwait(
    getStrapiData(
      "/api/blogs-categories",
      {
        locale: lang,
        filters: {
          domain: category_domain,
        },
      },
      [`blog_cat_${category_domain}`],
    ),
  );

  if (error || !categories) throw new Error();

  if (categories.data.length === 0) notFound();

  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
      <BlogsCategoryList domain={category_domain} searchParams={searchParams} />
    </Suspense>
  );
}
