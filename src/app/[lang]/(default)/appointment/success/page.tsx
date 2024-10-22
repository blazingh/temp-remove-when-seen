import { BreadCrumbs } from "@/components/layout/breadCrumb";
import AppointmentSuccessData from "@/components/pages/appointment/appointmentSuccessData";
import { ROUTES } from "@/constants/routes";
import { Locale } from "@/i18n";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { Suspense } from "react";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";


export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  unstable_setRequestLocale(lang);
  const messages = await getMessages();

  return (
    <div>
      <NextIntlClientProvider
        locale={lang}
        messages={pick(messages, ["forms.AppointmentSuccess"])}
      >
        <BreadCrumbs
          pageTile={ROUTES.appointmentsSuccess.title[lang]}
          lang={lang}
        />

        <div>
          <Suspense fallback={<p>...</p>}>
            <AppointmentSuccessData />
          </Suspense>
        </div>
      </NextIntlClientProvider>
    </div>
  );
}
