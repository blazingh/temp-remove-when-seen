import { Locale } from "@/i18n";
import { CrustyBreadCrumbSetter } from "@/components/crusty-bread-crumb";
import safeAwait from "safe-await";
import { getStrapiData } from "@/lib/strapi";
import { notFound } from "next/navigation";
import SITEROUTES from "@/constants/site_routes";
import { unstable_setRequestLocale } from "next-intl/server";
import { ROUTES } from "@/constants/routes";
import { getPathname } from "@/navigation";
import ld from "lodash";

type PageProps = {
  params: {
    lang: Locale;
    treatment_domain: string;
    category_domain: string;
  };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: PageProps) {
  return {
    title: ROUTES.treatmentPage.title[params.lang],
    description: ROUTES.treatmentPage.description[params.lang],
    alternates: {
      canonical: getPathname({
        href: {
          pathname: SITEROUTES.treatmentPage,
          params: {
            ...ld.pick(params, ["treatment_domain", "category_domain"]),
          },
        },
        locale: params.lang,
      }),
      languages: {
        en: getPathname({
          href: {
            pathname: SITEROUTES.treatmentPage,
            params: {
              ...ld.pick(params, ["treatment_domain", "category_domain"]),
            },
          },
          locale: "en",
        }),
        tr: getPathname({
          href: {
            pathname: SITEROUTES.treatmentPage,
            params: {
              ...ld.pick(params, ["treatment_domain", "category_domain"]),
            },
          },
          locale: "tr",
        }),
      },
    },
  };
}

export async function generateStaticParams({
  params: { lang, category_domain },
}: any) {
  const [error, treatments] = await safeAwait(
    getStrapiData("/api/distedavim-guides", {
      locale: lang,
      filters: {
        category: {
          domain: category_domain,
        },
      },
    }),
  );
  if (error || !treatments) throw new Error();

  return treatments.data.map((treatment: any) => ({
    treatment_domain: treatment.domain,
  }));
}

export default async function Layout({
  children,
  params: { lang, treatment_domain },
}: PageProps) {
  unstable_setRequestLocale(lang);

  const [error, treatments] = await safeAwait(
    getStrapiData(
      "/api/distedavim-guides",
      {
        locale: lang,
        filters: {
          domain: treatment_domain,
        },
      },
      [`treatment_${treatment_domain}`],
    ),
  );

  if (error || !treatments) throw new Error();

  if (treatments.data.length === 0) notFound();

  const treatment = treatments.data[0];

  return (
    <div>
      <CrustyBreadCrumbSetter
        crumb={{
          label: treatment.title,
          href: {
            pathname: SITEROUTES.treatmentPage,
            params: { treatment_domain },
          },
        }}
        index={3}
      />

      {children}
    </div>
  );
}
