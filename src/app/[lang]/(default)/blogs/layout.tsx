import { ROUTES } from "@/constants/routes";
import { Locale } from "@/i18n";
import SlideButtonGroup from "@/components/slideButtonGroup";
import {
  CrustyBreadCrumbBase,
  CrustyBreadCrumbSetter,
} from "@/components/crusty-bread-crumb";
import SITEROUTES from "@/constants/site_routes";
import { unstable_setRequestLocale } from "next-intl/server";
import { getPathname } from "@/navigation";

type PageProps = {
  params: {
    lang: Locale;
  };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: PageProps) {
  return {
    title: ROUTES.blogsList.title[params.lang],
    description: ROUTES.blogsList.description[params.lang],
    alternates: {
      canonical: getPathname({
        href: {
          pathname: SITEROUTES.blogsList,
        },
        locale: params.lang,
      }),
      languages: {
        en: getPathname({
          href: {
            pathname: SITEROUTES.blogsList,
          },
          locale: "en",
        }),
        tr: getPathname({
          href: {
            pathname: SITEROUTES.blogsList,
          },
          locale: "tr",
        }),
      },
    },
  };
}

export default function Layout({ children, params: { lang } }: PageProps) {
  unstable_setRequestLocale(lang);
  return (
    <div>
      <CrustyBreadCrumbBase />
      <CrustyBreadCrumbSetter
        crumb={{
          label: ROUTES.blogsList.title[lang],
          href: SITEROUTES.blogsList,
        }}
        index={1}
      />

      <div className="flex flex-col gap-6 mt-6">
        {/* page content */}
        {children}

        <SlideButtonGroup />
      </div>
    </div>
  );
}
