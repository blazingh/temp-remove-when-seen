"use client";

import ArrowIcon from "@/icons/arrowLeft";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import AppointmentDetail from "./appointmentsDetail";
import AppointmentDetailPast from "./appointmentsDetailPast";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n";

export default function MyAppointments({
  appointmentArr,
  pastAppointmentArr,
}: {
  appointmentArr: any;
  pastAppointmentArr: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPast, setIsOpenPast] = useState(false);
  const [item, setItem] = useState({});
  const [itemPast, setItemPast] = useState({});

  const [selectedList, setSelectedList] = useState("future");
  const [animationClass, setAnimationClass] = useState("slide-in");

  const lang = useLocale() as Locale;

  const handleItemClick = (item: any) => {
    setAnimationClass("slide-out");
    setTimeout(() => {
      setAnimationClass("slide-in");
      setSelectedList(item);
    }, 200);
  };

  const getUnderlineStyle = () => {
    const index = ["future", "past"].indexOf(selectedList);
    const translateXValue = index * 100 + "%";
    return {
      transform: `translateX(${translateXValue})`,
    };
  };
  const renderList = () => {
    const slideClass = `px-4 ${animationClass} mb-4`;

    if (selectedList === "future") {
      return (
        <div className={slideClass}>
          {appointmentArr.map((items: any, index: any) => (
            <div
              onClick={() => {
                setIsOpen(true);
                setItem(items);
              }}
              className="w-full flex items-center justify-between mt-4 border p-4 rounded-md"
              key={index}
            >
              <div>
                <div>
                  <span className="font-semibold">{items.clinicName}</span>
                </div>
                <div>{items.doctorName}</div>
                <div>
                  <span className="text-sm">{items.appointmentDate}</span>
                </div>
              </div>
              <div>
                <ArrowIcon className={"transform -rotate-90"} />
              </div>
            </div>
          ))}
        </div>
      );
    } else if (selectedList === "past") {
      return (
        <div className={slideClass}>
          {pastAppointmentArr.map((items: any, index: any) => (
            <div
              onClick={() => {
                setIsOpenPast(true);
                setItemPast(items);
              }}
              className="w-full flex items-center justify-between mt-4 border p-4 rounded-md"
              key={index}
            >
              <div>
                <div>
                  <span className="font-semibold">{items.clinicName}</span>
                </div>
                <div>{items.doctorName}</div>
                <div>
                  <span className="text-sm">{items.appointmentDate}</span>
                </div>
              </div>
              <div>
                <span
                  className={`font-bold ${items.status === "İptal" ? "text-red-500" : "text-green-500"}`}
                >
                  {items.status}
                </span>
              </div>
              <div>
                <ArrowIcon className={"transform -rotate-90"} />
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="relative w-full flex items-center justify-center">
        <div
          className="w-1/2 items-center justify-center flex p-4 border-b-2"
          onClick={() => handleItemClick("future")}
        >
          <span className="font-bold text-sm">
            {lang === "tr" ? "Gelecek Randevularım" : "My Future Appointments"}
          </span>
        </div>
        <div
          className="w-1/2 items-center justify-center flex p-4"
          onClick={() => handleItemClick("past")}
        >
          <span className="font-bold text-sm">
            {lang === "tr" ? "Geçmiş Randevularım" : "My Past Appointments"}
          </span>
        </div>
        <div
          className="absolute bottom-0 left-0 w-1/2 bg-[#7626FF] h-1 transition-transform px-2"
          style={getUnderlineStyle()}
        ></div>
        <div style={getUnderlineStyle()}></div>
      </div>
      <>{renderList()}</>
      <Sheet open={isOpen}>
        <SheetContent side={"bottom"}>
          <SheetClose
            onClick={() => {
              setIsOpen(false);
            }}
            className="items-start justify-start left-2.5 top-8"
          />
          <AppointmentDetail items={item} />
        </SheetContent>
      </Sheet>
      <Sheet open={isOpenPast}>
        <SheetContent side={"bottom"}>
          <SheetClose
            onClick={() => {
              setIsOpenPast(false);
            }}
            className="items-start justify-start left-2.5 top-8"
          />
          <AppointmentDetailPast items={itemPast} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
