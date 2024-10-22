"use client";
import AppointmentPopup from "../pages/doctor/appointmentPopup";
import { ScrollArea } from "../ui/scroll-area";

export default function QuickAppointmentSheetContent({
  doctor_id,
}: {
  doctor_id: number;
}) {
  return (
      <AppointmentPopup id={doctor_id} />
  );
}
