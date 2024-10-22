"use client";
import IconLocation from "@/icons/location";
import IconGlobal from "@/icons/global";
import { StarsRatingReadOnly } from "@/components/starsRating";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import imageUrlHelper from "@/lib/image/url-helper";

export default function DoctorCardDetail({
  item,
  lang,
}: {
  item: any;
  lang: any;
}) {
  const eLanguages: any = {
    tr: "Türkçe",
    en: "English",
  };

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // formated nearestdate start
  const nearestAvailableDate = item.nearest_available_date;
  const formattedDateNearestAvailableDate = new Date(
    nearestAvailableDate,
  ).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }); // bu kod safari tarayıcıda invalid date hatası veriyor
  // formated nearestdate finish

  const availabilityText =
    lang === "en" ? "Nearest availability" : "En yakın müsaitlik";
  const notSpecifiedText = lang === "en" ? "not specified" : "belirtilmedi";
  const adressText = lang === "en" ? "Address details" : "Adres detayları";
  const reviewsText = lang === "en" ? "reviews" : "değerlendirme";

  return (
    <div className="w-full min-h-[140px]  overflow-hidden flex gap-4">
      {/* image */}
      <div
        className="relative h-[150px] min-w-[150px] border rounded-md flex-shrink-0"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        <Image
          src={imageUrlHelper(item.cover_images, {
            w: 150 * 2,
            h: 150 * 2,
            q: 75,
            fallBackImage: "/dentist-cover-placeholder.webp",
          })}
          alt={item.name + item.last_name}
          className="object-contain rounded-md"
          fill={true}
        />
      </div>

      <div className="flex flex-col w-full">
        {/* score */}
        {item.review_count != 0 && (
          <div className="flex items-center align-middle event-none gap-2">
            <span className="font-extrabold text-sm">
              {item.review_rating.slice(0, 3)}
            </span>
            <StarsRatingReadOnly reviewScore={parseFloat(item.review_rating)} />
          </div>
        )}

        <div className="relative">
          <a href="#reviews">
            <span className="font-medium text-xs underline">
              {item.review_count} {reviewsText}
            </span>
          </a>
        </div>
        {/* treatmen price */}
        {/*
        <p className="text-sm text-gray-700">
          Muayene Ücreti
          <span className="text-sm font-bold">: 500 TL</span>
        </p>
        */}

        {/* nearest appointment */}

        <div className="text-xs text-gray-700 relative mt-2">
          {availabilityText}
          <div className="text-xs text-black font-medium">
            {item.nearest_available_date != null &&
            item.nearest_available_date !== ""
              ? nearestAvailableDate
              : notSpecifiedText}
          </div>
        </div>

        {/* spoken languages */}
        {item.spoken_languages && item.spoken_languages.length > 0 && (
          <div className="flex items-center relative mt-2">
            <div className="w-[15px] h-[15px] mr-2">
              <IconGlobal className="w-[15px] h-[15px] mr-2 text-lg" />
            </div>
            {item.spoken_languages.map((item: any, index: any) => (
              <p className="text-xs text-black-700 mr-2" key={index}>
                {eLanguages[item]}
              </p>
            ))}
          </div>
        )}

        {/* clinic address */}
        <div className="flex items-center box-sizing-border mt-2">
          <div className="w-[15px] h-[15px] mr-2">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="4 0 32 32"
            >
              <path
                stroke="currentColor"
                strokeWidth="2.3"
                d="M15.55 29.773c-1.5-1.953-2.835-3.624-3.989-5.068-4.336-5.43-6.182-7.74-6.182-11.707 0-3.037 1.189-5.787 3.11-7.777l.034-.032C10.443 3.219 13.084 2 16 2c2.932 0 5.587 1.231 7.509 3.221 1.923 1.99 3.112 4.74 3.112 7.777 0 3.967-1.845 6.277-6.182 11.707-1.154 1.445-2.49 3.118-3.993 5.073a.557.557 0 01-.895-.005zm3.666-20.105A4.459 4.459 0 0016 8.29a4.459 4.459 0 00-3.216 1.378 4.782 4.782 0 00-1.33 3.33c0 1.3.509 2.478 1.331 3.329a4.447 4.447 0 003.214 1.38c1.244 0 2.37-.516 3.188-1.35l.027-.03a4.78 4.78 0 001.332-3.329c0-1.3-.508-2.478-1.33-3.33z"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-[#212121] w-full line-clamp-1">
              {item.clinics_address}
            </div>
            <div className="text-xs text-[#212121]">
              <a
                href="#map-address"
                className="text-xs text-[#212121] underline white-space-nowrap flex-shrink-0"
              >
                {adressText}
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-full">
          <Dialog open={isDialogOpen} onOpenChange={(o) => setIsDialogOpen(o)}>
            <DialogContent className="">
              <div className="">
                <Image
                  src={imageUrlHelper(item.cover_images, {
                    w: 2000,
                    h: 0,
                    q: 100,
                    fallBackImage: "/dentist-cover-placeholder.webp",
                  })}
                  alt={item.name + item.last_name}
                  width={1000}
                  height={1000}
                  style={{ objectFit: "contain", objectPosition: "middle" }}
                  className="aspect-square"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
