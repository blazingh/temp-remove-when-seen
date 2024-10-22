import { Locale } from '@/i18n';
import PaginationButtonGroup from '@/components/lists/paginationButtonGroup';

async function fetchData() {
  return [0]
}

/* no caching */
export const revalidate = 0

export default async function Page({
  params: { lang },
  searchParams
}: {
  params: { lang: Locale };
  searchParams: {
    [key: string]: string;
  }
}) {

  const data = await fetchData();

  if (data.length === 0) {
    // error are safe to throw in page.tsx "ONLY IF" error.tsx is used
    throw new Error('data not found')
  }

  return (
    <div className="flex flex-col w-full gap-4">

      {/*
      adding any filtering is "NOT RECOMENDED" to be added here
      insded add include it the the template.tsx
      saving the filtering selection in the searchParams is recomended 
      */}

      {/* your success state */}
      {data.map((item) => (
        <div key={item}>
          {item}
        </div>
      ))}


    </div>
  );
}
