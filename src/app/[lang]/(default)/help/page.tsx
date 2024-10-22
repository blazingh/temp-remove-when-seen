import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import Content from "@/components/layout/help_Content";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  unstable_setRequestLocale(lang);

  return (
    <div>
      <Content lang={lang} />
    </div>
  );
}
