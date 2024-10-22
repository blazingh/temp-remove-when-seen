"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import AppointmentPopup from "../doctor/appointmentPopup";

export default function SelectAppointment({
  id,
  name,
  lastName,
}: {
  id: number;
  name: string;
  lastName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <Button
        className="w-full"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Ücretsiz Randevu Al
      </Button>
      <Sheet open={isOpen} key={"map"}>
        <SheetContent side={"bottom"}>
          <SheetClose
            onClick={() => {
              setIsOpen(false);
            }}
            className="items-start justify-start right-2.5 top-8 w-[20px]"
          />
          <AppointmentPopup id={id} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
