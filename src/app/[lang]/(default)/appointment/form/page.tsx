import AppointmentData from "@/components/pages/appointment/appointmentData";
import { Locale } from "@/i18n";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { getDentistDetailWithId } from "../verify/actions";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { Suspense } from "react";
import { pick } from "lodash";
import { AppointmentBasicForm } from "@/components/forms/appointment-basic-form";
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

  if (
    !searchParams.id ||
    !searchParams.date ||
    !searchParams["started-minute"] ||
    !searchParams["reserve-id"]
  )
    return notFound();

  const messages = await getMessages();

  const dentistData = await getDentistDetailWithId({ id: searchParams.id });

  return (
    <div>
      <BreadCrumbs pageTile={ROUTES.appointmentsForm.title[lang]} lang={lang} />

      <NextIntlClientProvider
        locale={lang}
        messages={pick(messages, ["forms.AppointmentConfirmation"])}
      >
        <Suspense fallback={<p>...</p>}>
          <AppointmentBasicForm
            id={searchParams.id}
            date={searchParams.date}
            startedMinute={searchParams["started-minute"]}
            reserve_id={searchParams["reserve-id"]}
            appointment_type={searchParams.appointment_type}
          />
        </Suspense>
      </NextIntlClientProvider>

      <div className="mt-4">
        <AppointmentData
          dentistData={dentistData}
          date={searchParams.date}
          startedMinute={searchParams["started-minute"]}
          appointment_type={searchParams.appointment_type}
        />
      </div>
    </div>
  );
}
