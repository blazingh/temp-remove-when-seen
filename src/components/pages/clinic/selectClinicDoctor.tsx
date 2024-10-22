"use client";
import Image from "next/image";
import { StarsRatingReadOnly } from "@/components/starsRating";
import imageUrlHelper from "@/lib/image/url-helper";
import { Locale } from "@/i18n";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import SITEROUTES from "@/constants/site_routes";
import QuickAppointmentSheetContent from "@/components/sheets/AppointmentBooking";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";

export default function SelectClinicDoctor({
  clinicDentist,
}: {
  clinicDentist: any[];
}) {
  const t = useTranslations("layout.clinicPage") as any;
  const lang = useLocale() as Locale;

  return (
    <div className=" w-full z-9">
      <div className="text-2xl font-extrabold font-poppins">
        {t("choose_dentist")}
      </div>
      <div className="block items-center justify-between w-full">
        {clinicDentist.map((item: any, index: number) => (
          <div
            key={item}
            className="w-full relative h-[150px] bg-white border rounded-md overflow-hidden flex mt-3 cursor-pointer"
          >
            <Link
              href={{
                pathname: SITEROUTES.dentistPage,
                params: { options: item.url?.split("/") },
              }}
            >
              {/* image */}
              <div className="relative w-[96px] max-w-[96px] h-full flex-shrink-0">
                <Image
                  src={imageUrlHelper(item.cover_images, {
                    w: 96 * 2,
                    h: 150 * 2,
                    q: 75,
                    fallBackImage: "/dentist-cover-placeholder.webp",
                  })}
                  alt={item.name + " " + item.last_name}
                  className="object-contain"
                  width={96}
                  height={150}
                />
              </div>
            </Link>
            <div className="flex flex-col gap-1 relative p-2 w-full items-start h-full justify-between">
              <Link
                href={{
                  pathname: SITEROUTES.dentistPage,
                  params: { options: item.url?.split("/") },
                }}
              >
                <div className="flex flex-col gap-1 relative w-full h-full items-start">
                  {/* title */}
                  <p className="text-base font-medium ">
                    {item.degree?.[lang]} {item.name} {item.last_name}
                  </p>
                  {/* type */}
                  <p className="text-xs font-medium text-[#757575]">
                    {item.branches?.[lang]}
                  </p>

                  <p className="text-xs font-medium text-[#333] line-clamp-1">
                    {item.clinic_name}
                  </p>
                  {/* score */}
                  {item.review_count !== 0 && (
                    <div className="flex gap-1 items-center event-none align-middle">
                      <span className="font-bold text-xs text-foreground">
                        {item.review_rating?.slice(0, 3)}
                      </span>
                      <StarsRatingReadOnly
                        reviewScore={parseFloat(item.review_score)}
                      />
                      <span className="font-medium text-xs text-[#757575]">
                        ({item.review_count})
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <SheetContentTrigger
                variant={"default"}
                className="w-full"
                size="sm"
                sheetProps={{
                  side: "bottom",
                  title: `${item.degree[lang]} ${item.name} ${item.last_name}`,
                  subtitle: `${lang === "en" ? "Select Appointment" : "Randevu Seç"}`,
                  content: <QuickAppointmentSheetContent doctor_id={item.id} />,
                }}
              >
                {t("get_appointment")}
              </SheetContentTrigger>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
