/* eslint-disable react/no-unescaped-entities */
"use client";
import IconArrow from "@/icons/arrowLeft";
import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import { useTranslations } from "next-intl";

export default function AboutDentist({
  dentistDescription,
  lang,
}: {
  dentistDescription: string;
  lang: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const t = useTranslations("pages.dentist") as any;

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * 3;
      if (element.scrollHeight + 5 > maxHeight) {
        setIsOverflowing(true);
      }
    }
  }, [dentistDescription, lang]);

  return (
    <div className="rounded-md border">
      <div className="block px-2 py-4">
        <div className="flex w-full items-center justify-between px-2">
          <span className="text-xl font-extrabold font-poppins">
            {t("about_doctor")}
          </span>

          {isOverflowing && (
            <IconArrow
              onClick={() => {
                setIsOpen(true);
              }}
              className={"transform -rotate-90"}
            />
          )}
        </div>
        <div className="flex p-2">
          <div ref={textRef}>
            {dentistDescription && (
              <div className="font-normal text-left leading-6 tracking-normal text-base overflow-hidden line-clamp-3">
                {dentistDescription}
              </div>
            )}
          </div>
        </div>
      </div>
      <Sheet open={isOpen} key={"map"}>
        <SheetContent side={"bottom"}>
          <SheetClose
            onClick={() => {
              setIsOpen(false);
            }}
            className="items-start justify-start ml-2 left-2.5 top-8"
          />
          <div className="mt-5 pb-4 px-4 text-xl ml-6 font-extrabold font-poppins">
            {t("about_doctor")}
          </div>
          {dentistDescription && (
            <div className="mb-4"> {dentistDescription}</div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
