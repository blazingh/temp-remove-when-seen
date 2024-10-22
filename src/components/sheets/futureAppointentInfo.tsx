"use client";
import { Button } from "../ui/button";
import { useState } from "react";
import CalendarIcon from "@/icons/calendar";
import { timeMinuteConverter } from "@/lib/utils";
import ShareButton from "@/components/ui/shareButton";
import AskCancelOrDelete from "../pages/account/askCancelOrDeleteAppointment";
import path from "path";
import CreditCardBiggerIcon from "@/icons/creditCardBigger";
import { Link } from "@/navigation";
import ClickIcon from "@/icons/clickIcon";

export default function FutureAppointmentInfoSheetContent({
  items,
}: {
  items: any;
}) {
  const lang = "tr";
  const monthNamesArr = [
    { tr: "Ocak", en: "January" },
    { tr: "Şubat", en: "February" },
    { tr: "Mart", en: "March" },
    { tr: "Nisan", en: "April" },
    { tr: "Mayıs", en: "May" },
    { tr: "Haziran", en: "June" },
    { tr: "Temmuz", en: "July" },
    { tr: "Ağustos", en: "August" },
    { tr: "Eylül", en: "September" },
    { tr: "Ekim", en: "October" },
    { tr: "Kasım", en: "November" },
    { tr: "Aralık", en: "December" },
  ];
  const daysNamesArr = [
    { tr: "Pazartesi", en: "Monday" },
    { tr: "Salı", en: "Tuesday" },
    { tr: "Çarşamba", en: "Wednesday" },
    { tr: "Perşembe", en: "Thursday" },
    { tr: "Cuma", en: "Friday" },
    { tr: "Cumartesi", en: "Saturday" },
    { tr: "Pazar", en: "Sunday" },
  ];

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
    setTimeout(() => setOpen(true), 100);
  };

  const staticParams = items.status;

  let translation;
  let textColor;

  if (staticParams === "passive") {
    translation = "İptal Edildi";
    textColor = "text-red-500";
  } else if (staticParams === "active") {
    translation = "Aktif";
    textColor = "text-green-500";
  } else if (staticParams === "completed") {
    translation = "Tamamlandı";
    textColor = "text-green-500";
  } else {
    translation = "bilinmiyor";
    textColor = "text-black";
  }

  return (
    <div>
      <div className="flex mt-4">
        <svg
          width={26}
          height={24}
          viewBox="0 0 26 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.42 15.0696L20.8879 11.5138C20.7598 11.3849 20.586 11.3124 20.4049 11.3124H16.4244V1.68758C16.4244 1.50527 16.3526 1.33032 16.2245 1.20142C16.0963 1.07251 15.9227 1 15.7416 1H10.2777C9.90058 1 9.59484 1.308 9.59484 1.68758V3.06251H8.91179C8.53471 3.06251 8.22875 3.3705 8.22875 3.75009C8.22875 4.12967 8.53471 4.43767 8.91179 4.43767H11.6438C12.0208 4.43767 12.3266 4.12967 12.3266 3.75009C12.3266 3.3705 12.0208 3.06251 11.6438 3.06251H10.9607V2.37516H15.0585V11.3123H9.07746L4.49668 6.70112C4.1061 6.32614 3.58725 6.11712 3.0478 6.11712C2.50813 6.11712 1.98927 6.32637 1.59869 6.70135C1.21543 7.08853 1 7.61292 1 8.1596C1 8.7063 1.21541 9.23069 1.59869 9.61785L5.8136 13.861C6.08161 14.1215 6.5076 14.1178 6.77103 13.8527C7.03446 13.5873 7.03812 13.1587 6.77926 12.8889L2.56506 8.64555C2.29911 8.37691 2.29911 7.94206 2.56506 7.67346C2.83489 7.41288 3.26093 7.41288 3.5305 7.67346L8.31162 12.486C8.43945 12.615 8.61346 12.6872 8.79457 12.6875H20.1221L23.4544 16.0418C23.7206 16.3107 23.7206 16.7451 23.4544 17.0139C23.1839 17.2729 22.759 17.2729 22.4887 17.0139L19.7567 14.2638C19.6287 14.1349 19.4551 14.0624 19.2738 14.0624H8.22896C7.85187 14.0624 7.54614 14.3702 7.54614 14.75C7.54614 15.1296 7.85188 15.4373 8.22896 15.4373H9.59482V21.6248H8.22896C7.85187 21.6248 7.54614 21.9328 7.54614 22.3124C7.54614 22.692 7.85188 23 8.22896 23H17.7909C18.168 23 18.4738 22.692 18.4738 22.3124C18.4738 21.9328 18.168 21.6248 17.7909 21.6248H16.4248V17.4998C16.4248 17.1202 16.1191 16.8125 15.742 16.8125C15.3647 16.8125 15.059 17.1203 15.059 17.4998V21.6248H10.9612V15.4373H18.9917L21.5236 17.986C22.0436 18.4945 22.7916 18.6885 23.4909 18.4963C24.1904 18.3041 24.7367 17.7542 24.9276 17.05C25.1188 16.3461 24.9251 15.593 24.42 15.0696Z"
            fill="#000"
            stroke="#000"
            strokeWidth={0.5}
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-base font-bold text-black-700 ml-4">
          Dt. {items.dentist.name} {items.dentist.last_name}
        </p>
      </div>
      <div className="flex">
        <p className="text-base text-gray-700 ml-10">
          {items.dentist.branch[lang]}
        </p>
      </div>
      <div className="flex mt-4">
        <CalendarIcon />
        <p className="text-base font-bold text-black-700 ml-4">
          {`${items.day.split("-")[2]} ${monthNamesArr[parseInt(items.day.split("-")[1]) - 1][lang]} ${(() => {
            const date = new Date(items.day);
            const dayIndex = date.getDay();
            return daysNamesArr[dayIndex - 1][lang];
          })()} ${timeMinuteConverter(items.start_min)}`}
        </p>
      </div>
      <div className="flex mt-4">
        <CreditCardBiggerIcon />
        {items.appointment_type == "online" ? (
          <Link href={items.meet_url.client} className="flex flex-row">
            <p className="text-base text-primary font-semibold ml-4 underline ">
              {"Online Görüş"}
            </p>
            <ClickIcon className={"w-5 h-5 text-primary"} />
          </Link>
        ) : (
          <p className="text-base text-black font-semibold ml-4 ">
            {"Klinikte Muayene"}
          </p>
        )}
      </div>
      <div className="flex mt-2">
        <p className="text-sm text-black font-semibold ml-10">
          Muayenen ücretsiz olacak. Tedavi yaptırmaya karar verirsen ödemeni 12
          aya kadar taksitlendirebilirsin.
        </p>{" "}
        <br />
      </div>
      <div className="flex mt-4">
        <svg
          fill="#000000"
          width="24px"
          height="24px"
          viewBox="0 0 52 52"
          data-name="Layer 1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            height="6"
            rx="3"
            transform="translate(52 27.52) rotate(180)"
            width="6"
            x="23"
            y="10.76"
          />
          <path d="M27,41.24a2,2,0,0,1-2-2v-13H23a2,2,0,0,1,0-4h4a2,2,0,0,1,2,2v15A2,2,0,0,1,27,41.24Z" />
          <path d="M26,52A26,26,0,1,1,52,26,26,26,0,0,1,26,52ZM26,4A22,22,0,1,0,48,26,22,22,0,0,0,26,4Z" />
        </svg>
        <p className="text-base text-black-700 font-semibold ml-4">
          Randevu Durumu
        </p>
      </div>
      <div className="flex mt-2">
        <p className={`text-sm font-medium ml-10 ${textColor}`}>
          {translation}
        </p>
      </div>
      <div className="flex items-center justify-between w-full mt-4">
        <div className="w-2/4 pl-0">
          <Link
            href={
              ("https://www.google.com/maps/dir//" +
                items?.clinic?.lat +
                ",+" +
                items?.clinic?.lng +
                "/@" +
                items?.clinic?.lat +
                "," +
                items?.clinic?.lng +
                "z") as any
            }
          >
            <Button className="bg-white text-dark border font-semibold w-full flex text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="none"
                viewBox="0 0 32 32"
              >
                <path
                  stroke="#000"
                  strokeWidth="2.3"
                  d="M15.55 29.773c-1.5-1.953-2.835-3.624-3.989-5.068-4.336-5.43-6.182-7.74-6.182-11.707 0-3.037 1.189-5.787 3.11-7.777l.034-.032C10.443 3.219 13.084 2 16 2c2.932 0 5.587 1.231 7.509 3.221 1.923 1.99 3.112 4.74 3.112 7.777 0 3.967-1.845 6.277-6.182 11.707-1.154 1.445-2.49 3.118-3.993 5.073a.557.557 0 01-.895-.005zm3.666-20.105A4.459 4.459 0 0016 8.29a4.459 4.459 0 00-3.216 1.378 4.782 4.782 0 00-1.33 3.33c0 1.3.509 2.478 1.331 3.329a4.447 4.447 0 003.214 1.38c1.244 0 2.37-.516 3.188-1.35l.027-.03a4.78 4.78 0 001.332-3.329c0-1.3-.508-2.478-1.33-3.33z"
                />
              </svg>
              <div className="pl-3">Yol Tarifi Al</div>
            </Button>
          </Link>
        </div>
        <div className="w-2/4 pl-2">
          <ShareButton
            lang={lang}
            title={"Paylaş"}
            text={"Sende diş randevunu online al: "}
            url={path}
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full py-6">
        <div className="w-full">
          <Button
            className={`bg-white text-dark flex border border-black w-full text-base`}
            onClick={toggleOpen}
          >
            Randevu İptal
          </Button>
        </div>
      </div>
      {open && <AskCancelOrDelete items={items} />}
    </div>
  );
}
