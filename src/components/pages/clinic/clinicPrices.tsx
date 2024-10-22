/* eslint-disable react/no-unescaped-entities */
"use client";
import IconArrow from "@/icons/arrowLeft";
import React, { useEffect, useState } from "react";
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import AboutDoctorList from "./aboutClinicList";
import { Locale } from "@/i18n";
import { useLocale } from "next-intl";
import { formatNumber } from "@/lib/utils";

export default function ClinicPrices({
  clinicTreatmentCategories,
  lang,
}: {
  clinicTreatmentCategories: any;
  lang: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const langClient = useLocale() as Locale;

  /* mobile dedection start */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  /* mobile dedection finish */

  return (
    <div className="rounded-md border">
      <div className="block px-2 py-4">
        <div className="flex w-full items-center justify-between px-2">
          <span className="text-xl font-extrabold font-poppins">
            Klinik Tedavi Fiyatları
          </span>
          <IconArrow
            onClick={() => {
              setIsOpen(true);
            }}
            className={"transform -rotate-90"}
          />
        </div>
        <div className="flex p-0">
          <div className="mb-4 w-full">
            {isMobile ? (
              <div>
                {/* is mobile */}
                {clinicTreatmentCategories && (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tedavi Adı
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clinicTreatmentCategories.map(
                        (items: {
                          id: any;
                          name: { tr: any; en: any };
                          min_fee: any;
                          max_fee: any;
                          sort: any;
                        }) => {
                          if (!items.min_fee && !items.max_fee) {
                            return null;
                          }

                          return (
                            <tr key={items.id}>
                              <td className="px-2 py-2 whitespace-nowrap sm:w-[25%] sm:relative sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 mb-2">
                                  {items.name[langClient]}
                                </div>
                                <div className="text-xs text-gray-900">
                                  {(items.min_fee == null || items.min_fee == 0.00) && (items.max_fee == null || items.max_fee == 0.00)
                                    ? 'Ücretsiz'
                                    : (items.min_fee == null || items.min_fee == 0.00
                                      ? `${formatNumber(items.max_fee)} TL`
                                      : (items.max_fee == null || items.max_fee == 0.00
                                        ? `${formatNumber(items.min_fee)} TL`
                                        : `${formatNumber(items.min_fee)} - ${formatNumber(items.max_fee)} TL`))}
                                </div>


                              </td>
                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              <div>
                {/* is desktop */}
                {clinicTreatmentCategories && (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tedavi Adı
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fiyat
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clinicTreatmentCategories.map(
                        (items: {
                          id: any;
                          name: { tr: any; en: any };
                          min_fee: any;
                          max_fee: any;
                          sort: any;
                        }) => {
                          if (!items.min_fee && !items.max_fee) {
                            return null;
                          }

                          return (
                            <tr key={items.id}>
                              <td className="px-2 py-2 whitespace-nowrap">
                                <div className="text-xs font-medium text-gray-900">
                                  {items.name[langClient]}
                                </div>
                              </td>
                              <td className="px-2 py-2 whitespace-nowrap">
                                <div className="text-xs text-gray-900">
                                  {(items.min_fee == null || items.min_fee == 0.00) && (items.max_fee == null || items.max_fee == 0.00)
                                    ? 'Ücretsiz'
                                    : (items.min_fee == null || items.min_fee == 0.00
                                      ? `${formatNumber(items.max_fee)} TL`
                                      : (items.max_fee == null || items.max_fee == 0.00
                                        ? `${formatNumber(items.min_fee)} TL`
                                        : `${formatNumber(items.min_fee)} - ${formatNumber(items.max_fee)} TL`))}
                                </div>



                              </td>
                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>

          <div>
            {clinicTreatmentCategories && clinicTreatmentCategories[lang] && (
              <div className="font-normal text-left leading-6 tracking-normal text-base">
                {clinicTreatmentCategories[lang]}
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
          <AboutDoctorList />
          <div className="mb-4 ">
            {" "}
            {clinicTreatmentCategories && (
              <table className="min-w-full text-xs divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tedavi Adı
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clinicTreatmentCategories.map(
                    (items: {
                      id: any;
                      name: { tr: any; en: any };
                      min_fee: any;
                      max_fee: any;
                      sort: any;
                    }) => {
                      if (!items.min_fee && !items.max_fee) {
                        return null;
                      }

                      return (
                        <tr key={items.id}>
                          <td className="px-2 py-2 whitespace-nowrap sm:w-[25%] sm:relative sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap">
                            <div className="text-xs font-medium text-gray-900 mb-1">
                              {items.name[langClient]}
                            </div>
                            <div className="text-xs text-gray-900">
                              {(!formatNumber(items.min_fee))
                                ? ""
                                : `${formatNumber(items.min_fee)} TL`}{" "}
                              - {" "}
                              {(!formatNumber(items.max_fee))
                                ? "-"
                                : `${formatNumber(items.max_fee)} TL`}
                            </div>
                            <div className="text-xs text-gray-900"></div>
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
function setIsMobile(arg0: boolean) {
  throw new Error("Function not implemented.");
}
