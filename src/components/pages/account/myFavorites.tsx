'use client'

import { useState } from "react";
import ClinicCard from "@/components/cards/clinic/clinicCard";
import DoctorCard from "@/components/cards/doctor/doctorCard";
import TreatmentCard from "@/components/cards/treatment/treatmentCard";




export default function MyFavorites(
  {
    appointmentArr,
    doctorArr,
    treatmentArr
  }: {
    appointmentArr: any,
    doctorArr: any,
    treatmentArr: any

  }
) {
  const [selectedList, setSelectedList] = useState('clinics');
  const [animationClass, setAnimationClass] = useState('slide-in');


  const handleItemClick = (item: any) => {
    setAnimationClass('slide-out');
    setTimeout(() => {
      setAnimationClass('slide-in');
      setSelectedList(item);
    }, 200);
  };

  const renderList = () => {
    const slideClass = `px-4 ${animationClass}`;

    if (selectedList === 'clinics') {

      return (
        <div className={slideClass}>
          {appointmentArr.map((items: any, index: any) => (
            <div onClick={() => handleItemClick(items)} className='mt-2' key={index}>
              {/* <ClinicCard href={items.href} reviewScore={items.reviewScore} src={items.src} reviewCount={items.reviewScore} title={items.title} city={items.city} language={items.language} treatmentPrice={items.treatmentPrice} type={items.type} key={index} alt={items.alt} /> */}
            </div>
          ))}
        </div>
      );
    } else if (selectedList === 'doctors') {
      return (
        <div className={slideClass}>
          {doctorArr.map((items: any, index: any) => (
            <div onClick={() => handleItemClick(items)} className='mt-4' key={index}>
              <DoctorCard href={items.href} item={items} />
            </div>
          ))}
        </div>
      );
    } else if (selectedList === 'treatments') {
      return (
        <div className={slideClass}>
          {treatmentArr.map((items: any, index: any) => (
            <div onClick={() => handleItemClick(items)} className='mt-4' key={index}>
              {/* <TreatmentCard key={items.key} src={items.src} title={items.title} href={items.href} avgBooking={items.avgBooking} subtitle={items.subtitle} alt={items.alt} avgPrice={items.avgPrice} /> */}
            </div>
          ))}
        </div>
      );
    }
  };
  const getUnderlineStyle = () => {
    const index = ['clinics', 'doctors', 'treatments'].indexOf(selectedList);
    const translateXValue = (index * 100) + '%';
    return {
      transform: `translateX(${translateXValue})`,
    };
  };

  return (
    <div>
      <div className="relative w-full flex items-center justify-center mt-2">
        <div
          className={`w-1/3 items-center justify-center flex px-4 py-2 border-b-2 `}
          onClick={() => handleItemClick('clinics')}
        >
          <span className="font-bold text-sm">Kliniklerim</span>
        </div>
        <div
          className={`w-1/3 items-center justify-center flex px-4 py-2 border-b-2 `}
          onClick={() => handleItemClick('doctors')}
        >
          <span className="font-bold text-sm">Hekimlerim</span>
        </div>
        <div
          className={`w-1/3 items-center justify-center flex px-4 py-2 border-b-2`}
          onClick={() => handleItemClick('treatments')}
        >
          <span className="font-bold text-sm">Tedavilerim</span>
        </div>
        <div
          className="absolute bottom-0 left-0 w-1/3 bg-[#7626FF] h-1 transition-transform px-2"


          style={getUnderlineStyle()}
        ></div>
      </div>
      <>
        {renderList()}
      </>
    </div>
  )
}
