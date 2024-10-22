"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { timeMinuteConverter } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { SheetCloseTrigger } from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n";
import { Label } from "@/components/ui/label";
import { Link } from "@/navigation";
import SITEROUTES from "@/constants/site_routes";

export default function AppointmentPopup({ id }: { id: number }) {
  const lang = useLocale() as Locale;

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  ); // example: 2024-03-01
  const [selectedSlot, setSelectedSlot] = useState(""); // example: date,minutes => 2024-03-01,720

  const [firmMode, setFirmMode] = useState(true);

  const dates = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(new Date().setDate(new Date().getDate() + i)),
    value: new Date(new Date().setDate(new Date().getDate() + i))
      .toISOString()
      .split("T")[0],
    isToday: i === 0,
    isTomorrow: i === 1,
  }));

  const slots = useQuery({
    queryKey: ["slots", selectedDate],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          "/api-appointments/v2/calendar/employee/" +
          id +
          "?date_start=" +
          selectedDate +
          "&date_end=" +
          selectedDate,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const slotList = await response.json();
      return slotList.reverse();
    },
  });

  // check if the given date and minutes are in the past
  const isInPast = (givenDate: Date, givenMinutes: number) => {
    const now: Date = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const isToday = givenDate.toDateString() === now.toDateString();

    if (isToday) return currentMinutes >= givenMinutes;
    now.setHours(0, 0, 0, 0);

    return givenDate.getTime() <= now.getTime();
  };

  return (
    <div className="rounded-md py-0 flex flex-col gap-4 items-center z-10">
      <Carousel
        className="px-0 w-full h-[90px] whitespace-no-wrap"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent
          showOverflow
          className="flex items-between justify-between w-[102px]"
        >
          {dates.map((item: any) => (
            <CarouselItem
              className="flex flex-col items-center gap-2 w-[102px] h-[62px] ml-2"
              key={item.value}
            >
              <Toggle
                variant={"outline"}
                pressed={selectedDate === item.value}
                onPressedChange={(pressed: boolean) =>
                  pressed && setSelectedDate(item.value)
                }
                className={cn(
                  "w-[102px] h-[62px]",
                  "data-[state=on]:bg-white relative",
                )}
              >
                <div className='w-full h-full flex flex-col justify-center items-center text-[#333] font-bold text-[#333"] bg-white'>
                  <span className="text-[32px] font-bold text-[#333] font-poppins leading-tight h-full">
                    {item.value.split("-")[2]}
                  </span>
                  <span className="text-sm font-light text-[#333] h-full bg-white">
                    {monthNamesArr[item.date.getMonth()][lang]}
                  </span>
                </div>
                <div
                  className={cn(
                    "w-4 h-4 bg-primary absolute rotate-45 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[-1] shadow-md",
                    selectedDate !== item.value && "hidden",
                  )}
                />
              </Toggle>
              <span className="text-xs font-medium">
                {item.isToday
                  ? lang === "en"
                    ? "Today"
                    : "Bugün"
                  : item.isTomorrow
                    ? lang === "en"
                      ? "Tomorrow"
                      : "Yarın"
                    : daysNamesArr[item.date.getDay()][lang]}
              </span>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="w-full grid grid-cols-4 items-center justify-center align-middle content-center gap-3 relative ">
        {/* loading skeleton */}
        {slots.isLoading &&
          Array.from({ length: 20 }, (_, i: number) => (
            <div key={i} className="w-full flex items-center justify-center">
              <Skeleton className={cn("min-w-[72px] h-[40px]")} />
            </div>
          ))}

        {/* error message */}
        {!slots.isLoading && (!slots.data || slots.data?.length === 0) && (
          <>
            {Array.from({ length: 20 }, (_, i: number) => (
              <div
                key={i}
                className={cn(
                  "min-w-[72px] min-h-[40px] border rounded-md flex items-center justify-center text-[#888888]",
                )}
              >
                -
              </div>
            ))}
            <div className="absolute top-1/2 text-[#333] font-medium text-center shadow-[0px_135px_135px_200px_rgba(0,0,0,0.3)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto rounded-md border p-3 bg-[#F5F5F5]">
              Klinik bugün hizmet vermiyor!
            </div>
          </>
        )}

        {/* slots list */}
        {slots.data?.map(
          (slot: any) =>
            slot.day === selectedDate && (
              <div
                key={slot.day + String(slot.start)}
                className="w-full flex items-center justify-center"
              >
                <Toggle
                  disabled={
                    isInPast(new Date(slot.day), slot.start) ||
                    slot.status !== "available"
                  }
                  pressed={selectedSlot === slot.day + "," + slot.start}
                  variant={"outline"}
                  onPressedChange={(pressed: boolean) => {
                    setSelectedSlot(pressed ? slot.day + "," + slot.start : "");
                  }}
                  className={cn(
                    "text-large font-normal font-poppins flex items-center justify-center",
                    "max-w-[72px] max-h-[48px]",
                    {
                      "bg-[#f3eeff] text-[#7424ff] font-semibold disabled:text-[#333] disabled:font-medium disabled:bg-gray-200":
                        slot.status === "available",
                      "bg-gray-200": slot.status === "booked",
                    },
                  )}
                >
                  {timeMinuteConverter(slot.start)}
                </Toggle>
              </div>
            ),
        )}
      </div>

      <div className="flex w-full flex-wrap mt-2">
        <div className="flex w-full bg-gray-100 rounded-3xl border border-input">
          <div
            onClick={() => setFirmMode(true)}
            className={`flex-1 border-input p-2 rounded-tl-3xl rounded-bl-3xl cursor-pointer text-center border-2 ${
              firmMode === true
                ? "bg-white border-border-purple-500-7258E9 border-primary rounded-3xl"
                : "bg-gray-100 border-gray-100"
            } transition-all`}
          >
            <Label className={cn("text-base", firmMode ? "text-primary" : "")}>
              {lang === "en" ? "Clinic Appointment" : "Klinikte Görüş"}
            </Label>
          </div>
          <div
            onClick={() => setFirmMode(false)}
            className={`flex-1 p-2 rounded-tr-3xl rounded-br-3xl cursor-pointer text-center border-2 ${
              firmMode === false
                ? "bg-white border-border-purple-800-7258E9 border-primary rounded-3xl"
                : "bg-gray-100 border-gray-100"
            } transition-all`}
          >
            <Label className={cn("text-base", firmMode ? "" : "text-primary")}>
              {lang === "en" ? "Online Appointment" : "Online Görüş"}
            </Label>
          </div>
        </div>
      </div>

      <SheetCloseTrigger asChild>
        <Link
          href={
            selectedSlot === ""
              ? ("#" as any)
              : {
                  pathname: SITEROUTES.appointmentVerify,
                  query: {
                    id: id,
                    date: selectedSlot.split(",")[0],
                    "started-minute": selectedSlot.split(",")[1],
                    appointment_type: firmMode ? "in_person" : "online",
                  },
                }
          }
          className="w-full"
        >
          <Button disabled={selectedSlot === ""} className="w-full">
            {lang === "en" ? "Continue" : "Devam Et"}
          </Button>
        </Link>
      </SheetCloseTrigger>
    </div>
  );
}

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
    tr: "Pazar",
    en: "Sunday",
  },
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
