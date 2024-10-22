import { BreadCrumbs } from "@/components/layout/breadCrumb";
import { ROUTES } from "@/constants/routes";
import { Locale } from "@/i18n";
import { getClinicsDetail } from "./actions";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import SITEROUTES from "@/constants/site_routes";
import { getPathname } from "@/navigation";

type PageProps = {
  params: {
    lang: Locale;
    options: string[];
  };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: PageProps) {
  return {
    title: ROUTES.clinicList.title[params.lang],
    description: ROUTES.clinicList.description[params.lang],
    alternates: {
      canonical: getPathname({
        href: {
          pathname: SITEROUTES.clinicPage,
          params: { options: params.options || [] },
        },
        locale: params.lang,
      }),
      languages: {
        en: getPathname({
          href: {
            pathname: SITEROUTES.clinicPage,
            params: { options: params.options || [] },
          },
          locale: "en",
        }),
        tr: getPathname({
          href: {
            pathname: SITEROUTES.clinicPage,
            params: { options: params.options || [] },
          },
          locale: "tr",
        }),
      },
    },
  };
}

export async function generateStaticParams() {
  return [
    /*
    { options: ['treatment', 'city', 'district'] },
    { options: ['treatment1', 'city1', 'district1'] },
    */
  ];
}

export default async function Layout({
  children,
  params: { lang, options },
}: PageProps) {
  unstable_setRequestLocale(lang);

  const clinicData = await getClinicsDetail({ url: options.join("/") });
  if (!clinicData) notFound();

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div>
          <BreadCrumbs
            pageTile={clinicData.clinic.name}
            lang={lang}
            breadCrumbsList={[
              {
                pathname: SITEROUTES.clinicsList,
                params: { options: [] },
                title: ROUTES.clinicList.title[lang],
              },
            ]}
          />
          <div>{clinicData.clinic.clinic_types_tr}</div>
        </div>

        {/* clinic detail */}
        {children}
      </div>
    </div>
  );
}
