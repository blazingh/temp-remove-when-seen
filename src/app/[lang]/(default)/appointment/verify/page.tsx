import AppointmentData from "@/components/pages/appointment/appointmentData";
import { Locale } from "@/i18n";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { getDentistDetailWithId } from "@/app/[lang]/(default)/appointment/verify/actions";
import { notFound } from "next/navigation";
import { AppointmentConfirmationForm } from "@/components/forms/appointment-comfirmation";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
import { BreadCrumbs } from "@/components/layout/breadCrumb";
import { ROUTES } from "@/constants/routes";

export default async function Page({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { [key: string]: string };
}) {
  unstable_setRequestLocale(lang);

  if (!searchParams.id || !searchParams.date || !searchParams["started-minute"])
    return notFound();

  const messages = await getMessages();

  const dentistData = await getDentistDetailWithId({ id: searchParams.id });

  return (
    <NextIntlClientProvider
      locale={lang}
      messages={pick(messages, ["forms.AppointmentConfirmation"])}
    >
      <div className="flex flex-col gap-4">
        {/* <h1 className="font-bold text-xl">
          {ROUTES.appointmentsVerify.title[lang]}
        </h1> */}
        <BreadCrumbs lang={lang} pageTile={ROUTES.appointmentsVerify.title[lang]} />

        <Suspense fallback={<p>...</p>}>
          <AppointmentConfirmationForm
            id={searchParams.id}
            date={searchParams.date}
            startedMinute={searchParams["started-minute"]}
            appointment_type={searchParams.appointment_type}
          />
        </Suspense>

        <Suspense fallback={null}>
          <AppointmentData
            dentistData={dentistData}
            date={searchParams.date}
            startedMinute={searchParams["started-minute"]}
            appointment_type={searchParams.appointment_type}
          />
        </Suspense>
      </div>
    </NextIntlClientProvider>
  );
}
