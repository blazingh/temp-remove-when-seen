import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconChevron from "@/icons/chevron";
import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { getServerSession } from "next-auth";
import { getMyAppointments } from "./actions";
import { notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";
import FutureAppointmentInfoSheetContent from "@/components/sheets/futureAppointentInfo";
import PastAppointmentInfoSheetContent from "@/components/sheets/pastAppointentInfo";

interface DentistInfo {
  id: number;
  name: string;
  last_name: string;
  url: string;
  degree: any;
  branch: any;
}

interface ClinicInfo {
  id: number;
  url: string;
  name: string;
  type: any;
}

interface AppointmentData {
  appointment_type: string;
  day: string;
  start_min: string;
  end_min: string;
  dentist: DentistInfo;
  clinic: ClinicInfo;
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const session = await getServerSession(authOptions);

  const id = session?.user?.id;
  const token = session?.user?.tokens?.accessToken;
  unstable_setRequestLocale(lang);

  if (!token) return;
  const futureStatus = "active";
  const pastStatus = "past";

  const futureAppointments = await getMyAppointments(
    String(id),
    futureStatus,
    token,
  );

  const pastAppointments = await getMyAppointments(
    String(id),
    pastStatus,
    token,
  );

  if (
    (!futureAppointments || futureAppointments.rows?.length === 0) &&
    (!pastAppointments || pastAppointments.rows?.length === 0)
  ) {
    notFound();
  }

  // function isAfterToday(dateString: string, end_min: number ) {
  //   const today = new Date();
  //   const compareDate = new Date(dateString)

  //   if (compareDate.toISOString().split('T')[0] == today.toISOString().split('T')[0]) {
  //     const currentHours = today.getHours()
  //     const currentMinute = compareDate.getHours()
  //     return (end_min > ((currentHours * 60) + currentMinute) ) ? true : false
  //   }
  //   if (compareDate > today) {
  //     return true
  //   }else if (compareDate < today) {
  //     return false
  //   }{

  //   }
  // }

  const monthNamesArr = [
    {
      tr: "Ocak",
      en: "January",
    },
    {
      tr: "Şubat",
      en: "February",
    },
    {
      tr: "Mart",
      en: "March",
    },
    {
      tr: "Nisan",
      en: "April",
    },
    {
      tr: "Mayıs",
      en: "May",
    },
    {
      tr: "Haziran",
      en: "June",
    },
    {
      tr: "Temmuz",
      en: "July",
    },
    {
      tr: "Ağustos",
      en: "August",
    },
    {
      tr: "Eylül",
      en: "September",
    },
    {
      tr: "Ekim",
      en: "October",
    },
    {
      tr: "Kasım",
      en: "November",
    },
    {
      tr: "Aralık",
      en: "December",
    },
  ];
  const daysNamesArr = [
    {
      tr: "Pazartesi",
      en: "Monday",
    },
    {
      tr: "Salı",
      en: "Tuesday",
    },
    {
      tr: "Çarşamba",
      en: "Wednesday",
    },
    {
      tr: "Perşembe",
      en: "Thursday",
    },
    {
      tr: "Cuma",
      en: "Friday",
    },
    {
      tr: "Cumartesi",
      en: "Saturday",
    },
    {
      tr: "Pazar",
      en: "Sunday",
    },
  ];

  return (
    <Tabs defaultValue="future" className="w-full">
      {/* tabs list */}
      <ScrollArea className="w-[calc(100%+14px)] p-0">
        <TabsList className="w-full p-0 bg-background gap-6 rounded-none flex justify-around pb-2 border-b relative">
          <TabsTrigger
            value="future"
            className="peer/future h-full bg-background font-semibold shadow-none rounded-none text-sm p-0 w-full"
          >
            {lang === "tr" ? "Gelecek Randevularım" : "My Future Appointments"}
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="peer/past h-full bg-background font-semibold shadow-none rounded-none text-sm p-0 w-full"
          >
            {lang === "tr" ? "Geçmiş Randevularım" : "My Past Appointments"}
          </TabsTrigger>
          <div
            className={`w-1/2 h-[4px] bg-primary absolute rounded-t bottom-0 left-0 peer-aria-selected/future:translate-x-0 peer-aria-selected/past:translate-x-full transition-all`}
          ></div>
        </TabsList>
        <ScrollBar orientation="horizontal" className="opacity-0" />
      </ScrollArea>

      {/* future appointments tab content */}
      <TabsContent value="future">
        <div className="flex flex-col gap-4 mt-5">
          {futureAppointments && futureAppointments.length > 0 ? (
            futureAppointments.map((items: any, index: any) => (
              <SheetContentTrigger
                key={index}
                sheetProps={{
                  side: "bottom",
                  content: <FutureAppointmentInfoSheetContent items={items} />,
                }}
              >
                <div className="w-full flex flex-col items-start border p-4 rounded-md text-left relative gap-2 text-[#484848]">
                  <span className="font-semibold text-inherit">
                    {items.clinic.name}
                  </span>
                  <span className="font-semibold text-inherit">
                    {items.dentist.degree[lang]} {items.dentist.name}{" "}
                    {items.dentist.last_name}
                  </span>
                  <span className="text-sm font-semibold text-inherit">
                    {`${items.day.split("-")[2]} ${monthNamesArr[parseInt(items.day.split("-")[1]) - 1][lang]} ${(() => {
                      const date = new Date(items.day);
                      const dayIndex = date.getDay();
                      return daysNamesArr[dayIndex - 1][lang];
                    })()}`}
                  </span>
                  <IconChevron
                    className={"absolute right-4 top-1/2 -translate-y-1/2"}
                  />
                </div>
              </SheetContentTrigger>
            ))
          ) : (
            <div className="flex align-center justify-center text-center items-center mb-10 pt-5">
              <div>
                <svg
                  className="mr-3"
                  width="34px"
                  height="34px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z"
                    fill="#9357f9"
                  />
                  <path
                    d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.11 18.2998 9 18.3698 8.88 18.4198C8.76 18.4698 8.63 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C8 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 8 16.6298 8.12 16.5798C8.36 16.4798 8.64 16.4798 8.88 16.5798C9 16.6298 9.11 16.6998 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.42 14.3798C9.37 14.4998 9.3 14.6098 9.21 14.7098C9.11 14.7998 9 14.8698 8.88 14.9198C8.76 14.9698 8.63 14.9998 8.5 14.9998C8.37 14.9998 8.24 14.9698 8.12 14.9198C8 14.8698 7.89 14.7998 7.79 14.7098C7.7 14.6098 7.63 14.4998 7.58 14.3798C7.53 14.2598 7.5 14.1298 7.5 13.9998C7.5 13.8698 7.53 13.7398 7.58 13.6198C7.63 13.4998 7.7 13.3898 7.79 13.2898C7.89 13.1998 8 13.1298 8.12 13.0798C8.36 12.9798 8.64 12.9798 8.88 13.0798C9 13.1298 9.11 13.1998 9.21 13.2898C9.3 13.3898 9.37 13.4998 9.42 13.6198C9.47 13.7398 9.5 13.8698 9.5 13.9998C9.5 14.1298 9.47 14.2598 9.42 14.3798ZM12.71 14.7098C12.61 14.7998 12.5 14.8698 12.38 14.9198C12.26 14.9698 12.13 14.9998 12 14.9998C11.87 14.9998 11.74 14.9698 11.62 14.9198C11.5 14.8698 11.39 14.7998 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.39 13.1998 11.5 13.1298 11.62 13.0798C11.86 12.9698 12.14 12.9698 12.38 13.0798C12.5 13.1298 12.61 13.1998 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098Z"
                    fill="#aa88e3"
                  />
                </svg>
              </div>
              <div className="text-[#757575] text-sm">
                {lang === "tr"
                  ? "Üzgünüz, henüz gelecek randevun yok!"
                  : "Sorry, you don't have any upcoming appointments yet!"}{" "}
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      {/* past appointments tab content */}
      <TabsContent value="past">
        <div className="flex flex-col gap-4 mt-5">
          {pastAppointments.map((items: any, index: any) => (
            <SheetContentTrigger
              key={index}
              sheetProps={{
                side: "bottom",
                content: <PastAppointmentInfoSheetContent items={items} />,
              }}
            >
              <div className="w-full flex flex-col items-start border p-4 rounded-md relative gap-2 text-left text-[#484848]">
                <span className="font-semibold text-inherit">
                  {items.clinic.name}
                </span>
                <span className="font-semibold text-inherit">
                  {items.dentist.degree[lang]} {items.dentist.name}{" "}
                  {items.dentist.last_name}
                </span>
                <span className="text-sm font-semibold text-inherit">
                  {`${items.day.split("-")[2]} ${monthNamesArr[parseInt(items.day.split("-")[1]) - 1][lang]} ${(() => {
                    const date = new Date(items.day);
                    const dayIndex = date.getDay();
                    return daysNamesArr[dayIndex - 1][lang];
                  })()}`}
                </span>
                <IconChevron
                  className={"absolute right-4 top-1/2 -translate-y-1/2"}
                />
              </div>
            </SheetContentTrigger>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
