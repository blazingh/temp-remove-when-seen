"use client";

import Image from "next/image";
import DoctorIcon from "@/icons/doctorIcon";
import EggHeadIcon from "@/icons/eggHead";
import TreatmentIcon from "@/icons/treatments";
import CalendarIcon from "@/icons/calendar";
import CreditCardBiggerIcon from "@/icons/creditCardBigger";
import IconCheck from "@/icons/greenCheck";
import { Button } from "@/components/ui/button";
import IconHeart from "@/icons/location";
import IconShare from "@/icons/share";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDentistDetailWithId } from "@/app/[lang]/(default)/appointment/verify/actions";
import ShareButton from "@/components/ui/shareButton";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n";
import { Link } from "@/navigation";
import { addMinutes, format, parse } from "date-fns";
import { enUS, tr } from "date-fns/locale";
import IconTreatment from "@/icons/treatments";
import IconLocation from "@/icons/location";

const imageArr = ["x", "y", "z", "t", "l"];

export default function AppointmentData() {
  const lang = useLocale() as Locale;
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const appointmentTypeParam = searchParams.get("appointment_type");

  const t = useTranslations("forms.AppointmentSuccess") as any;


  const date = searchParams.get("date") || "";
  const startedMinute = searchParams.get("started-minute") || "";
  const minutesPastMidnight = parseInt(startedMinute, 10); // Convert the string to an integer
  const parsedDate = parse(date, "yyyy-MM-dd", new Date()); // Parse the date
  const finalDate = addMinutes(parsedDate, minutesPastMidnight); // Add the minutes to the parsed date
  const formattedDate = format(finalDate, "d MMMM yyyy EEEE, HH:mm", {
    locale: lang === "tr" ? tr : enUS,
  });
  const id = searchParams.get("id");
  const path = typeof window !== "undefined" ? window.location.href : "";

  const [dentistData, setDentistData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== null) {
          const result = await getDentistDetailWithId({ id });
          setDentistData(result);
          setIsLoading(false);
        }
      } catch (error) {
        // console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full block overflow-hidden mt-4">
      {isLoading ? (
        <div role="status" className="max-w-full animate-pulse">
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
        </div>
      ) : (
        <div className="gap-4 flex flex-col">

          <div className="flex flex-row gap-4 items-center justify-center">
            <div className="block">
              <div className="flex flex-row gap-2 items-center justify-center">
                <div className="flex justify-center items-center">
                  <IconCheck className="w-[24px] h-[24px]" color="green" />
                </div>
                <span className="text-[#099832] font-bold text-xl">
                  {/* {lang === "en" ? "Congratulations" : "Tebrikler"} */}
                  {t("congratulations")}
                </span>
              </div>
              <div className="flex flex-row items-center justify-center">
                <span className="text-[#099832] font-bold text-xl text-center">
                  {t("appointment_created")}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#F2EEFF] text-center px-3 py-4 rounded-2xl">
            <p className="text-xl font-semibold text-[#7626FF]">
              {/* {lang === "en"
                ? "Muayenen Ücretsiz"
                : "Muayenen Ücretsiz"} */}
              {t("free_appointment")}
            </p>
            <p className="text-sm text-black font-semibold leading-5">
              {/* {lang === "en"
                ? "If you decide to have treatment, you can pay in installments up to 12 months."
                : "Tedavi yaptırmaya karar verirsen ödemeni 12 aya kadar taksitlendirebilirsin."} */}
              {t("free_appointment_description")}
            </p>
          </div>

          <div className="flex flex-col bg-[#F4F4F4] p-4 rounded-2xl gap-4">


            <div className="flex flex-col gap">
              <div className="flex">
                <IconTreatment className="w-[24px] h-[24px]" />
                <p className="text-lg font-semibold text-black-700 ml-4">
                  {dentistData?.dentist.clinics.name}
                </p>
              </div>
              <div className="flex">
                <p className="text-base font-semibold text-[#757575] ml-10">
                  {dentistData?.dentist.clinic_type[lang]}
                </p>
              </div>
              <div className="flex">
                <p className="ml-10 text-semibold text-black-700 text-sm">
                  {appointmentTypeParam === "online"
                    ? t("online_or_in_person_appointment")
                    : t("in_person_appointment")
                  }
                </p>
              </div>
            </div>



            <div>
              <div className="flex">
                <DoctorIcon className="w-[24px] h-[24px]" />
                <p className="text-base font-semibold ml-4">
                  {dentistData?.dentist.dentist_degrees[lang]}{" "}
                  {dentistData?.dentist?.name} {dentistData?.dentist?.last_name}
                </p>
              </div>
              <div className="flex">
                <p className="text-sm font-semibold ml-10 text-[#757575]">
                  {dentistData?.dentist.dentist_branches[lang]}
                </p>
              </div>
            </div>



            <div className="flex">
              <CalendarIcon />
              <p className="text-base font-semibold text-[#484848] ml-4">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="w-2/4 pl-0">
              <Link
                className=""
                href={
                  ("https://www.google.com/maps/dir//" +
                    dentistData?.dentist?.clinics?.lat +
                    ",+" +
                    dentistData?.dentist?.clinics?.lng +
                    "/@" +
                    dentistData?.dentist?.clinics?.lat +
                    "," +
                    dentistData?.dentist?.clinics.clinic?.lng +
                    "z") as any
                }
              >
                <Button className="bg-white text-dark border-[#7626FF] font-semibold w-full flex text-sm border-[2px]">
                  <svg
                    className=""
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    stroke="#7626FF"
                    fill="none"
                    viewBox="0 0 32 32"
                  >
                    <path
                      stroke="#7626FF"
                      strokeWidth="2.3"
                      d="M15.55 29.773c-1.5-1.953-2.835-3.624-3.989-5.068-4.336-5.43-6.182-7.74-6.182-11.707 0-3.037 1.189-5.787 3.11-7.777l.034-.032C10.443 3.219 13.084 2 16 2c2.932 0 5.587 1.231 7.509 3.221 1.923 1.99 3.112 4.74 3.112 7.777 0 3.967-1.845 6.277-6.182 11.707-1.154 1.445-2.49 3.118-3.993 5.073a.557.557 0 01-.895-.005zm3.666-20.105A4.459 4.459 0 0016 8.29a4.459 4.459 0 00-3.216 1.378 4.782 4.782 0 00-1.33 3.33c0 1.3.509 2.478 1.331 3.329a4.447 4.447 0 003.214 1.38c1.244 0 2.37-.516 3.188-1.35l.027-.03a4.78 4.78 0 001.332-3.329c0-1.3-.508-2.478-1.33-3.33z"
                    ></path>
                  </svg>
                  <div className="pl-3 text-[#7626FF]">
                    {" "}
                    {/* {lang === "en" ? "Directions" : "Yol Tarifi Al"}{" "} */}
                    {t("directions")}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="w-2/4 pl-2">
              <ShareButton
                lang={lang}
                title={lang === "en" ? "Share" : "Paylaş"}
                text={t("share_text")}
                //   {
                //   lang === "en"
                //     ? "Book your dental appointment online: "
                //     : "Sende diş randevunu online al: "
                // }
                url={path}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
