import { Locale } from "@/i18n";
import { BreadCrumbs } from "@/components/layout/breadCrumb";
import { ROUTES } from "@/constants/routes";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: PageProps) {
  return {
    title: ROUTES.contact.title[params.lang],
    description: ROUTES.contact.description[params.lang],
    // alternates: {
    //   canonical: '/' + ROUTES.contact.src[params.lang],
    //   languages: {
    //     'tr-TR': '/' + ROUTES.contact.src["tr"],
    //     'en-EN': '/' + ROUTES.contact.src["en"],
    //   },
    // },
    // openGraph: {
    //   images: '/og-image.png',
    // },
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
      <BreadCrumbs pageTile={ROUTES.contact.title[lang]} lang={lang} />
      <div className="flex flex-col gap-6 mt-4">
        {/* clinics list */}
        {children}
      </div>
    </div>
  );
}
