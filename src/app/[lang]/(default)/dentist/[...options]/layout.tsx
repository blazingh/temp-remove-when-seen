import { BreadCrumbs } from "@/components/layout/breadCrumb";
import { ROUTES } from "@/constants/routes";
import { Locale } from "@/i18n";
import { notFound } from "next/navigation";
import { getDentistDetail } from "./actions";
import { Link, getPathname } from "@/navigation";

import {
  getLocale,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import SITEROUTES from "@/constants/site_routes";

type PageProps = {
  params: {
    lang: Locale;
    options: string[];
  };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: PageProps) {
  const dentistData = await getDentistDetail({ url: params.options.join("/") });
  return {
    title: `${dentistData.dentist.degree[params.lang]}${dentistData.dentist.name} ${dentistData.dentist.last_name} ${ROUTES.dentistList.title[params.lang]}`,
    description: `${dentistData.dentist.name} ${dentistData.dentist.last_name} ${ROUTES.dentistList.description[params.lang]}`,
    alternates: {
      canonical: getPathname({
        href: {
          pathname: SITEROUTES.dentistPage,
          params: { options: params.options || [] },
        },
        locale: params.lang,
      }),
      languages: {
        en: getPathname({
          href: {
            pathname: SITEROUTES.dentistPage,
            params: { options: params.options || [] },
          },
          locale: "en",
        }),
        tr: getPathname({
          href: {
            pathname: SITEROUTES.dentistPage,
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
  const dentistData = await getDentistDetail({ url: options.join("/") });

  if (!dentistData) notFound();

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div>
          <BreadCrumbs
            pageTile={`${dentistData.dentist.degree[lang]} ${dentistData.dentist.name} ${dentistData.dentist.last_name}`}
            lang={lang}
            breadCrumbsList={[
              {
                title: ROUTES.dentistList.title[lang],
                pathname: SITEROUTES.dentistsList,
                params: { options: [] },
              },
            ]}
          />
          <h2>
            {dentistData.dentist.branches[lang]} -{" "}
            {/* {dentistData.dentist.clinics_name} */}
            {dentistData.dentist.clinics_url ? (
              <Link
                className="cursor-pointer underline"
                href={{
                  pathname: SITEROUTES.clinicPage,
                  params: {
                    options: dentistData.dentist.clinics_url.split("/"),
                  },
                }}
              >
                {dentistData.dentist.clinics_name}
              </Link>
            ) : (
              dentistData.dentist.clinics_name
            )}
          </h2>
        </div>

        {/* clinic detail */}
        {children}
      </div>
    </div>
  );
}
