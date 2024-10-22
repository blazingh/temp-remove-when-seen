import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "@/navigation";
import SITEROUTES from "@/constants/site_routes";

export default function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  unstable_setRequestLocale(lang);
  redirect({ pathname: SITEROUTES.clinicsList, params: { options: [] } });
}
