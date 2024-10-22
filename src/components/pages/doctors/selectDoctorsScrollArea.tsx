'use client';
import ClinicCard from '@/components/cards/clinic/clinicCard';
import PaginationButtonBar from '@/components/ui/paginationButtonGroup';

export default function SelectDoctors() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* {Array.from({ length: 10 }).map((_, index) => (
        <ClinicCard
          key={index}
          href="/doctors/dt_beratkan-timurlenk"
          src={"https://images.unsplash.com/photo-1583845981240-4330f9c6b9ce?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          title={'Sait Diş Dental'}
          reviewScore={4.9}
          reviewCount={10}
          alt={'sait deneme'}
          type={'Dental'}
          city={'istanbul'}
          language={'Türkçe'}
          treatmentPrice={'540'}
        />
      ))} */}
    </div>
  );
}
