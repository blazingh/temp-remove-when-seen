import { Locale } from "@/i18n";
import { BreadCrumbs } from "@/components/layout/breadCrumb";
import { ROUTES } from "@/constants/routes";
import { unstable_setRequestLocale } from "next-intl/server";
import SITEROUTES from "@/constants/site_routes";
import { getPathname } from "@/navigation";

export async function generateMetadata({ params }: PageProps) {
  return {
    title: ROUTES.about.title[params.lang],
    description: ROUTES.about.description[params.lang],
    alternates: {
      canonical: getPathname({ href: SITEROUTES.about, locale: params.lang }),
      languages: {
        en: getPathname({ href: SITEROUTES.about, locale: "en" }),
        tr: getPathname({ href: SITEROUTES.about, locale: "tr" }),
      },
    },
  };
}

type PageProps = {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
};

export default function Layout({ children, params: { lang } }: PageProps) {
  unstable_setRequestLocale(lang);

  return (
    <div>
      <BreadCrumbs pageTile={ROUTES.about.title[lang]} lang={lang} />
      <div className="flex flex-col gap-6 mt-4">
        {/* clinics list */}
        {children}
      </div>
    </div>
  );
}
