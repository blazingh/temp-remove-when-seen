"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n";

export default function SlideButtonGroup() {
  const lang = useLocale() as Locale;

  const cityList = [
    {
      name: {
        tr: "İstanbul Klinikler",
        en: "İstanbul Clinics"
      }, link: "/klinikler/tumu/istanbul"
    },
    {
      name: {
        tr: "Ankara Klinikler",
        en: "Ankara Clinics"
      }, link: "/klinikler/tumu/ankara"
    },
    {
      name: {
        tr: "Antalya Klinikler",
        en: "Antalya Clinics"
      }, link: "/klinikler/tumu/antalya"
    },
    {
      name: {
        tr: "Bursa Klinikler",
        en: "Bursa Clinics"
      }, link: "/klinikler/tumu/bursa"
    },
  ];

  return (
    <div>
      <div className="text-2xl font-medium text-[#333] mt-5 mb-4">
        {" "}
        {lang === "en" ? "Search by Cities" : "Şehirlere Göre Ara"}{" "}
      </div>
      <section className="flex w-full pl-0 mt-2 mb-2">
        <ScrollArea className="px-0 w-full whitespace-no-wrap">
          <div className="flex items-center gap-2 justify-between w-full">
            {cityList.map((city) => (
              <div className="mr-2" key={city.name[lang]}>
                <a className="" href={city.link}>
                  {" "}
                  <Button className="bg-white border border-gray-500 text-gray-300 font-medium text-dark w-25 text-sm overflow-ellipsis whitespace-nowrap min-w-0">
                    {city.name[lang]}
                  </Button>
                </a>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </div>
  );
}
