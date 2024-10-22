import { BreadCrumbs } from "@/components/layout/breadCrumb";
import { ROUTES } from "@/constants/routes";
import SlideButtonGroup from "@/components/slideButtonGroup";
import { Locale } from "@/i18n";
import { Suspense } from "react";
import { ClinicBasicFilterSkeleton } from "@/components/pages/clinics/selectTreatmentclinic";
import DentistFloatingFilters from "@/server-components/dentist-floating-filters";
import QandAList from "@/components/q_and_a_list";
import { getTranslations } from "next-intl/server";
import SITEROUTES from "@/constants/site_routes";
import CitiesBranchFilters from "@/server-components/cities-branch-filters";
import { getPathname } from "@/navigation";

export async function generateMetadata({ params }: PageProps) {
  return {
    title: ROUTES.dentistList.title[params.lang],
    description: ROUTES.dentistList.description[params.lang],
    alternates: {
      canonical: getPathname({
        href: {
          pathname: SITEROUTES.dentistsList,
          params: { options: params.options || [] },
        },
        locale: params.lang,
      }),
      languages: {
        en: getPathname({
          href: {
            pathname: SITEROUTES.dentistsList,
            params: { options: params.options || [] },
          },
          locale: "en",
        }),
        tr: getPathname({
          href: {
            pathname: SITEROUTES.dentistsList,
            params: { options: params.options || [] },
          },
          locale: "tr",
        }),
      },
    },
  };
}

type PageProps = {
  params: {
    lang: Locale;
    options: string[];
  };
  children: React.ReactNode;
};

export default async function Layout({
  children,
  params: { lang, options },
}: PageProps) {
  const t = await getTranslations("messages.QandA");

  return (
    <div>
      <BreadCrumbs pageTile={ROUTES.dentistList.title[lang]} lang={lang} />
      <div className="flex flex-col gap-6 mt-4">
        <Suspense fallback={<ClinicBasicFilterSkeleton />}>
          <CitiesBranchFilters basePath={SITEROUTES.dentistsList} />
        </Suspense>

        {/* list of dentist */}
        {children}

        {/* rest of filters */}
        <Suspense fallback={null}>
          <DentistFloatingFilters />
        </Suspense>

        {/* slide button group */}
        <SlideButtonGroup />

        {/* frequently asked questions */}
        <QandAList
          title={t("q_and_a_title")}
          description={t("q_and_a_description")}
          list={Array(3)
            .fill("")
            .map((_, index) => ({
              question: t(`dentists_q${index + 1}.question` as any),
              answer: t(`dentists_q${index + 1}.answer` as any),
            }))}
        />
      </div>
    </div>
  );
}
