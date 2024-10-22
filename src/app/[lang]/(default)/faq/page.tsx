import NotFoundComponent from "@/components/notFoundComponent";
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n";
import type { Metadata } from "next";
import QandAList from "@/components/q_and_a_list";
import { getTranslations } from "next-intl/server";
export const metadata: Metadata = {
  title: "SSS",
};
{
  /* just test meta data */
}
export default async function Page({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  unstable_setRequestLocale(lang);
  const t = await getTranslations("messages.QandA");
  return (
    <div>
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
  );
}
