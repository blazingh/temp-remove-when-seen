'use client';

import { Separator } from "@/components/ui/separator";
import DoctorIcon from "@/icons/doctorIcon"
import TreatmentIcon from "@/icons/treatments";
import CalendarIcon from "@/icons/calendar";
import TurkishLiras from "@/icons/turkishLirasIcon";
import { Button } from "@/components/ui/button";

export default function AppointmentDetail(
  {
    items
  }: {
    items: any
  }
) {

  return (
    <div className="">
      <div className="ml-8 mt-6 mb-4">
        <span className="text-lg font-bold">Randevu Detay dsds</span>
      </div>

      <Separator />
      <div className="w-full block overflow-hidden mt-4">
        <div className="flex">
          <TreatmentIcon /><p className="text-base font-bold text-black-700 ml-4">{items.clinicName}</p>
        </div>
        <div className="flex">
          <p className="text-base text-gray-700 ml-10">{items.clinicType}</p>
        </div>
        <div className="flex mt-4">
          <DoctorIcon /><p className="text-base font-bold text-black-700 ml-4">{items.doctorName}</p>
        </div>
        <div className="flex">
          <p className="text-base text-gray-700 ml-10">{items.doctorType}</p>
        </div>
        <div className="flex mt-4">
          <CalendarIcon /><p className="text-base font-bold text-black-700 ml-4">{items.appointmentDate}</p>
        </div>
        <div className="flex mt-4">
          <TurkishLiras /><p className="text-base font-bold text-black-700 ml-4">Klinikte Muayene: {items.treatmentsFees}</p>
        </div>
        <div className="flex">
          <p className="text-sm text-primary ml-10">Muayenen ücretsiz olacak. Tedavi yaptırmaya karar verirsen ödemeni 12 aya kadar taksitlendirebilirsin</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full py-6">
        <div className='w-2/4 pr-2' >
          <Button className='bg-white text-dark border border-black w-full text-base'>
            Randevu İptal
          </Button>
        </div>
        <div className='w-2/4 pl-2'>
          <Button className='bg-white text-dark border border-black w-full text-base'>
            Randevu Değiştir
          </Button>
        </div>
      </div>
    </div>
  );
}
