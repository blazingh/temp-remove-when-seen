import { BreadCrumbs } from "@/components/layout/breadCrumb";
import { ROUTES } from "@/constants/routes";
import { Locale } from "@/i18n";

export default function _({
  params: { lang },
  children,
}: {
  params: { lang: Locale };
  children: any;
}) {
  return (
    <div>
      <BreadCrumbs lang={lang} pageTile={ROUTES.guidesPage.title[lang]} />
      {children}
    </div>
  );
}
