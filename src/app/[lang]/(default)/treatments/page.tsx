import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { getStrapiData } from "@/lib/strapi";
import safeAwait from "safe-await";
import { notFound } from "next/navigation";
import TreatmentCategoryShortList, {
  TreatmentCategoryShortListSkeleton,
} from "@/server-components/treatment-category-short-list";

type PageProps = {
  params: {
    lang: Locale;
  };
};

export default async function Page({ params: { lang } }: PageProps) {
  unstable_setRequestLocale(lang);

  const [error, categories] = await safeAwait(
    getStrapiData(
      "/api/distedavim-guides-categories",
      {
        locale: lang,
      },
      ["treatments_list"],
    ),
  );

  if (error || !categories) throw new Error();

  if (categories.data.length === 0) notFound();

  return (
    <div className="flex flex-col gap-6">
      {categories.data.map((category: any) => (
        <Suspense
          fallback={<TreatmentCategoryShortListSkeleton />}
          key={category.documentId}
        >
          <TreatmentCategoryShortList domain={category.domain} />
        </Suspense>
      ))}
    </div>
  );
}
