"use client";
import AskDoctorPopup from "../pages/doctor/askDoctorPopup";

export default function QandAFormSheetContent({
  dentistData,
}: {
  dentistData: any;
}) {
  return <AskDoctorPopup dentistData={dentistData} />;
}
