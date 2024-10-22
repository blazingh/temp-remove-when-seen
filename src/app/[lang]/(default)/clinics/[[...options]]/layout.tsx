import { BreadCrumbs } from "@/components/layout/breadCrumb";
import { ROUTES } from "@/constants/routes";
import { Locale } from "@/i18n";
import { ClinicBasicFilterSkeleton } from "@/components/pages/clinics/selectTreatmentclinic";
import { Suspense } from "react";
import CitiesTreatmentFilters from "@/server-components/cities-treatment-filters";
import ClinicsFiltersSheetTrigger from "@/components/sheets/clinicsFilters";
import IconFilter from "@/icons/filter";
import IconLocation from "@/icons/location";
import QandAList from "@/components/q_and_a_list";
import { getTranslations } from "next-intl/server";
import { Link, getPathname } from "@/navigation";
import SITEROUTES from "@/constants/site_routes";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";
import ClinicsFiltersSheetContent from "@/components/sheets/clinicsFilters";
import AllClinicButton from "@/components/all-clinics-button";

export async function generateMetadata({ params }: PageProps) {
  return {
    title: ROUTES.clinicList.title[params.lang],
    description: ROUTES.clinicList.description[params.lang],
    alternates: {
      canonical: getPathname({
        href: {
          pathname: SITEROUTES.clinicsList,
          params: { options: params.options || [] },
        },
        locale: params.lang,
      }),
      languages: {
        en: getPathname({
          href: {
            pathname: SITEROUTES.clinicsList,
            params: { options: params.options || [] },
          },
          locale: "en",
        }),
        tr: getPathname({
          href: {
            pathname: SITEROUTES.clinicsList,
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
  const t2 = await getTranslations("messages.List_page");

  return (
    <div>
      <BreadCrumbs pageTile={ROUTES.clinicList.title[lang]} lang={lang} />
      <div className="flex flex-col gap-6 mt-4">
        {/* basic filters */}
        <Suspense fallback={<ClinicBasicFilterSkeleton />}>
          <CitiesTreatmentFilters />
        </Suspense>

        {/* list of clinics */}
        {children}

        {/* rest of the filters */}
        <div
          className="bg-[#212121] rounded-full px-6 py-3 flex items-center justify-around gap-4 fixed bottom-[76px] left-1/2 -translate-x-1/2 z-10 text-background"
          data-cls="clinic-filter-btn"
        >
          <SheetContentTrigger
            className="flex gap-2 items-center"
            sheetProps={{
              side: "bottom",
              content: <ClinicsFiltersSheetContent />,
            }}
          >
            <IconFilter className="w-6 h-6 flex-shrink-0" />
            <span className="text-sm font-medium items-center white-space-nowrap">
              {t2("filter")}
            </span>
          </SheetContentTrigger>
          <AllClinicButton
            variant={"child"}
            className="flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 32 32"
            >
              <path
                stroke="#fff"
                strokeWidth="2.3"
                d="M15.55 29.773c-1.5-1.953-2.835-3.624-3.989-5.068-4.336-5.43-6.182-7.74-6.182-11.707 0-3.037 1.189-5.787 3.11-7.777l.034-.032C10.443 3.219 13.084 2 16 2c2.932 0 5.587 1.231 7.509 3.221 1.923 1.99 3.112 4.74 3.112 7.777 0 3.967-1.845 6.277-6.182 11.707-1.154 1.445-2.49 3.118-3.993 5.073a.557.557 0 01-.895-.005zm3.666-20.105A4.459 4.459 0 0016 8.29a4.459 4.459 0 00-3.216 1.378 4.782 4.782 0 00-1.33 3.33c0 1.3.509 2.478 1.331 3.329a4.447 4.447 0 003.214 1.38c1.244 0 2.37-.516 3.188-1.35l.027-.03a4.78 4.78 0 001.332-3.329c0-1.3-.508-2.478-1.33-3.33z"
              ></path>
            </svg>
            <span className="text-sm font-medium whitespace-nowrap">
              {t2("show_maps")}
            </span>
          </AllClinicButton>
        </div>

        {/* frequently asked questions */}
        <QandAList
          title={t("q_and_a_title")}
          description={t("q_and_a_description")}
          list={Array(5)
            .fill("")
            .map((_, index) => ({
              question: t(`clinics_q${index + 1}.question` as any),
              answer: t(`clinics_q${index + 1}.answer` as any),
            }))}
        />
      </div>
    </div>
  );
}
