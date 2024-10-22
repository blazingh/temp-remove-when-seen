import { Locale } from "@/i18n";
import { CrustyBreadCrumbSetter } from "@/components/crusty-bread-crumb";
import safeAwait from "safe-await";
import { getStrapiData } from "@/lib/strapi";
import { notFound } from "next/navigation";
import SITEROUTES from "@/constants/site_routes";
import { unstable_setRequestLocale } from "next-intl/server";
import { ROUTES } from "@/constants/routes";
import { getPathname } from "@/navigation";

type PageProps = {
  params: {
    lang: Locale;
    category_domain: string;
  };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: PageProps) {
  return {
    title: ROUTES.treatmentList.title[params.lang],
    description: ROUTES.treatmentList.description[params.lang],
    alternates: {
      canonical: getPathname({
        href: {
          pathname: SITEROUTES.treatmentsCategoryPage,
          params: { category_domain: params.category_domain },
        },
        locale: params.lang,
      }),
      languages: {
        en: getPathname({
          href: {
            pathname: SITEROUTES.treatmentsCategoryPage,
            params: { category_domain: params.category_domain },
          },
          locale: "en",
        }),
        tr: getPathname({
          href: {
            pathname: SITEROUTES.treatmentsCategoryPage,
            params: { category_domain: params.category_domain },
          },
          locale: "tr",
        }),
      },
    },
  };
}

export async function generateStaticParams({
  params: { lang },
}: Pick<PageProps, "params">) {
  const [error, categories] = await safeAwait(
    getStrapiData("/api/distedavim-guides-categories", {
      locale: lang,
    }),
  );
  if (error || !categories) return [];

  return categories.data.map((category: any) => ({
    category_domain: category.domain,
  }));
}

export default async function Layout({
  children,
  params: { lang, category_domain },
}: PageProps) {
  unstable_setRequestLocale(lang);
  const [error, categories] = await safeAwait(
    getStrapiData(
      "/api/distedavim-guides-categories",
      {
        locale: lang,
        filters: {
          domain: category_domain,
        },
      },
      [`treatment_cat_${category_domain}`],
    ),
  );

  if (error || !categories) throw new Error();

  if (categories.data.length === 0) notFound();

  const category = categories.data[0];

  return (
    <div>
      <CrustyBreadCrumbSetter
        crumb={{
          label: category.title,
          href: {
            pathname: SITEROUTES.treatmentsCategoryPage,
            params: { category_domain },
          },
        }}
        index={2}
      />
      {children}
    </div>
  );
}
