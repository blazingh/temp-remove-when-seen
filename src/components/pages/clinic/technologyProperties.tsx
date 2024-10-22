/* eslint-disable react/no-unescaped-entities */
"use client";
import IconArrow from "@/icons/arrowLeft";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button, ButtonProps } from "@/components/ui/button";
import { SheetContext } from "@/contextPorviders/sheetContext";
import { Locale } from "@/i18n";

export default function PropertySheetContent({
  propertiesArr,
}: {
  propertiesArr: string[];
}) {

  return (
    <div className="block justify-start items-center p-2">
      <ul>
        {propertiesArr.map((item: any, index: any) => (
          <li
            className="font-normal font-poppins leading-6 tracking-normal text-base w-full break-all"
            key={index}
          >
            {"\u2022"} {item[0].tr}
          </li>
        ))}
      </ul>
    </div>
  );
}
