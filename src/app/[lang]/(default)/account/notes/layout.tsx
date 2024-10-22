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

const Layout: React.FC<PageProps> = async ({ children, params: { lang } }) => {
  unstable_setRequestLocale(lang);

  return (
    <div>
      <BreadCrumbs
        pageTile={ROUTES.profileNotes.title[lang]}
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
};

export default Layout;
