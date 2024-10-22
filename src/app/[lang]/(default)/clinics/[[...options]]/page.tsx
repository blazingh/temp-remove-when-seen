import { Locale } from '@/i18n';

import { unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import ClinicsList from '@/server-components/clinics-list';
import Loading from './loading';

type PageProps = {
  params: {
    lang: Locale
    options: string[]
  }
  searchParams: { [key: string]: string; }
}

export const revalidate = 0

export default function Page({
  params: {
    lang,
    options
  },
  searchParams
}: PageProps
) {

  unstable_setRequestLocale(lang);

  const [treatment, city, district] = options || []

  const queryOptions = {
    treatments: treatment === 'tumu' ? 'all' : treatment,
    city: city === 'tumu' ? 'all' : city,
    district_domain: district === 'tumu' ? 'all' : district,
    ...searchParams
  }

  return (
    <Suspense key={searchParams.page} fallback={<Loading />}>
      <ClinicsList queryOptions={queryOptions} />
    </Suspense>
  );
}
