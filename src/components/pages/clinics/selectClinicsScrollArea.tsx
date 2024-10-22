'use client';
import ClinicCard from '@/components/cards/clinic/clinicCard';
import PaginationButtonBar from '@/components/ui/paginationButtonGroup';
import { ROUTES } from '@/constants/routes';
import { useParams } from 'next/navigation';
import { Locale } from '@/i18n';

export default function FeaturedDoctorsScrollArea() {

  const params = useParams();
  const lang = params.lang as Locale || 'tr';

  return (
    <div className="flex flex-col gap-4">
      {/* {Array.from({ length: 10 }, (_, index) => index).map((item) => (
        <ClinicCard
          key={item}
          href={`${ROUTES.clinicPage.path[lang]}/dent-group-nisantasi`}
          src={
            'https://s3-eu-west-1.amazonaws.com/doktortakvimi.com/doctor/2e0ba9/2e0ba9bcf21576302cdc97b86f2972a1_large.jpg'
          }
          title={'Sait Diş Dental'}
          reviewScore={4.9}
          reviewCount={0}
          alt={'sait deneme'}
          type={'Dental'}
          city={'Ataşehir'}
          language={'Türkçe'}
          treatmentPrice={'540'}
        />
      ))} */}
    </div>
  );
}
