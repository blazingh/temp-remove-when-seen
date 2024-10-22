import { Locale } from "@/i18n";
import { BreadCrumbs } from "@/components/layout/breadCrumb";
import { ROUTES } from "@/constants/routes";
import { unstable_setRequestLocale } from "next-intl/server";
import SITEROUTES from "@/constants/site_routes";

type PageProps = {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
};

export default async function Layout({
  children,
  params: { lang },
}: PageProps) {
  unstable_setRequestLocale(lang);

  return (
    <div>
      <BreadCrumbs
        pageTile={ROUTES.myReviews.title[lang]}
        lang={lang}
        breadCrumbsList={[
          {
            pathname: SITEROUTES.userPage,
            title: ROUTES.userPage.title[lang],
          },
        ]}
      />
      <div className="flex flex-col gap-6 mt-4">{children}</div>
    </div>
  );
}
