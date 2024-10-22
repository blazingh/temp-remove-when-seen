"use client"

import ClinicCard from '@/components/cards/clinic/clinicCard';
import PaginationButtonBar from '@/components/ui/paginationButtonGroup'
export default function FeaturedDoctorsScrollArea() {
  return (
    <div className="block items-between justify-between w-full">
      {/* {Array.from({ length: 10 }, (_, index) => index).map((item) => (
        <ClinicCard
          key={item}
          href="/clinic"
          src={
            'https://s3-eu-west-1.amazonaws.com/doktortakvimi.com/doctor/2e0ba9/2e0ba9bcf21576302cdc97b86f2972a1_large.jpg'
          }
          title={'Sait Diş Dental'}
          reviewScore={4.9}
          reviewCount={0}
          alt={'sait deneme'}
          type={'Dental'}
          city={'istanbul'}
          language={'Türkçe'}
          treatmentPrice={'540'}
        />
      ))}
      <PaginationButtonBar /> */}
    </div>
  );
}
