import DoctorIcon from "@/icons/doctorIcon";
import CalendarIcon from "@/icons/calendar";
import CreditCardBiggerIcon from "@/icons/creditCardBigger";
import { Locale } from "@/i18n";
import IconTreatment from "@/icons/treatments";
import { addMinutes, format, parse } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { getLocale, getTranslations } from "next-intl/server";

export default async function AppointmentData({
  dentistData,
  appointment_type,
  date,
  startedMinute,
}: {
  dentistData: any;
  appointment_type: string;
  date: string;
  startedMinute: string;
}) {
  const lang = (await getLocale()) as Locale;

  const minutesPastMidnight = parseInt(startedMinute, 10); // Convert the string to an integer
  const parsedDate = parse(date, "yyyy-MM-dd", new Date()); // Parse the date
  const finalDate = addMinutes(parsedDate, minutesPastMidnight); // Add the minutes to the parsed date
  const formattedDate = format(finalDate, "d MMMM yyyy EEEE, HH:mm", {
    locale: lang === "tr" ? tr : enUS,
  });

  return (
    <div className="w-full bg-[#f4f4f4] rounded-lg p-4 flex flex-col gap-4">
      {/* clinic details */}
      <div className="flex items-start gap-4">
        <IconTreatment className="flex-shrink-0 w-6 h-6" />
        <div>
          <p className="font-semibold text-[##484848]">
            {dentistData?.dentist.clinics.name}
          </p>
          <p className="text-sm font-semibold text-[#757575] mt-1">
            {dentistData?.dentist?.clinic_type?.[lang]}
          </p>
        </div>
      </div>

      {/* dentist details */}
      <div className="flex items-start gap-4">
        <DoctorIcon className="flex-shrink-0 w-6 h-6" />
        <div>
          <p className="font-semibold text-[##484848]">
            {dentistData?.dentist.dentist_degrees[lang]}{" "}
            {dentistData?.dentist?.name} {dentistData?.dentist?.last_name}
          </p>
          <p className="text-sm font-semibold text-[#757575] mt-1">
            {dentistData?.dentist?.dentist_branches?.[lang]}
          </p>
        </div>
      </div>

      {/* appointment date and time */}
      <div className="flex items-start gap-4">
        <CalendarIcon className="flex-shrink-0 w-6 h-6" />
        <p className="font-semibold text-[##484848]">{formattedDate}</p>
      </div>

      {/* appointment details */}
      <div className="flex items-start gap-4">
        <CreditCardBiggerIcon className="flex-shrink-0 w-6 h-6" />
        <div>
          <p className="font-semibold text-[##484848]">
            {appointment_type === "online"
              ? lang === "en"
                ? "Online Appointment"
                : "Online Görüş"
              : lang === "en"
                ? "In-person Appointment"
                : "Klinikte Muayene"}
          </p>
          <p className="text-sm font-semibold text-[#757575] mt-1">
            {lang === "en"
              ? "You will make your payment after your appointment."
              : "Muayenen ücretsiz olacak. Tedavi yaptırmaya karar verirsen ödemeni 12 aya kadar taksitlendirebilirsin"}
          </p>
        </div>
      </div>
    </div>
  );
}
