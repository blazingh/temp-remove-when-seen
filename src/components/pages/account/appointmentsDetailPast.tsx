'use client';

import { Separator } from "@/components/ui/separator";
import DoctorIcon from "@/icons/doctorIcon"
import TreatmentIcon from "@/icons/treatments";
import  CalendarIcon  from "@/icons/calendar";
import TurkishLiras from "@/icons/turkishLirasIcon";
import { Button } from "@/components/ui/button"; 

export default function AppointmentDetail(
 {
    items
 } : {items : any}
) {
    return (
    <div className="">
       <div className="ml-8 mt-6 mb-4"> 
          <span className="text-lg font-bold">Randevu Detay</span>
        </div>

       <Separator/>
       <div className={`w-full block overflow-hidden mt-4 ${items.status === 'İptal' ? 'mb-6' : ''}`}>
       <div className={` flex ${items.status === 'İptal' ? '' : ''}`}>
                <TreatmentIcon/><p className="text-base font-bold text-black-700 ml-4">{items.clinicName}</p>
            </div>
            <div className="flex">
                <p className="text-base text-gray-700 ml-10">{items.clinicType}</p>
            </div>
            <div className="flex mt-4">
                <DoctorIcon/><p className="text-base font-bold text-black-700 ml-4">{items.doctorName}</p>
            </div>
            <div className="flex">
                <p className="text-base text-gray-700 ml-10">{items.doctorType}</p>
            </div>
            <div className="flex mt-4">
                <CalendarIcon/><p className="text-base font-bold text-black-700 ml-4">{items.appointmentDate}</p>
            </div>
            <div className="flex mt-4">
                <TurkishLiras/><p className="text-base font-bold text-black-700 ml-4">Klinikte Muayene: {items.treatmentsFees}</p>
            </div>
        </div>
        <div className={` flex items-center justify-between w-full py-6 ${items.status === 'İptal' ? 'hidden' : ''}`}>
            <div className='w-full pr-2' >
                <Button className='bg-white text-dark border border-black w-full text-base'>
                    Değerlendirme Yap
                </Button>
            </div>
        </div>
    </div>
    );
}