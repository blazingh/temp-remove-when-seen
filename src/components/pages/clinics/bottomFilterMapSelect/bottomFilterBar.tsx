"use client";
import IconFilter from "@/icons/filter";
import IconLocation from "@/icons/location";
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import MapOptions from "../../doctors/mapOptions";
import { Locale } from "@/i18n";

export default function BottomFilterBar({
  lang,
  selectedTreatment,
  selectedCity,
}: {
  lang: Locale;
  selectedTreatment: string | undefined;
  selectedCity: string | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const setIsOpenFalse = () => {
    setIsOpen(false);
  };

  useState;
  return (
    <div>
      <div>
        <Sheet open={isOpen}>
          <SheetContent side={"bottom"}>
            <SheetClose
              onClick={() => {
                setIsOpen(false);
              }}
              className="items-start justify-start left-2.5 top-8 w-[20px]"
            />
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <Sheet open={isMapOpen} key={"map"}>
          <SheetContent side={"bottom"}>
            <SheetClose
              onClick={() => {
                setIsMapOpen(false);
              }}
              className="items-start justify-start left-2.5 top-8 w-[20px]"
            />
            <MapOptions />
          </SheetContent>
        </Sheet>
      </div>
      <div className="w-[80vw] max-w-2xl fixed bottom-[80px] left-1/2 translate-x-[-50%] h-14 mx-auto bg-[#212121] shadow-lg flex items-center justify-around py-3 px-6 rounded-full z-30">
        <div
          className="flex items-center gap-2"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <IconFilter className="text-white h-6 w-6" />
          <span className="text-md text-white">Filtrele</span>
        </div>

        <div
          className="flex items-center gap-2"
          onClick={() => {
            setIsMapOpen(true);
          }}
        >
          <IconLocation className="text-white h-6 w-6" />
          <span className="text-md text-white">Haritada Gör</span>
        </div>
      </div>
    </div>
  );
}
