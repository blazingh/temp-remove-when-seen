import { Locale } from "@/i18n";
import ClinicCard from "@/components/cards/clinic/clinicCard";

import { getLocale } from "next-intl/server";
import PaginationButtonBar from "@/components/ui/paginationButtonGroup";
import { getClinicsList } from "@/app/[lang]/(default)/clinics/[[...options]]/actions";
import NotFound from "@/app/[lang]/(default)/clinics/[[...options]]/not-found";
import SITEROUTES from "@/constants/site_routes";

export default async function ClinicsList({
  queryOptions,
}: {
  queryOptions: { [key: string]: string };
}) {
  const lang = (await getLocale()) as Locale;

  if (!queryOptions.randomSeed)
    await new Promise((resolve) => setTimeout(resolve, 5000));

  const clinicList = await getClinicsList(queryOptions);

  if (!clinicList || clinicList.rows?.length === 0)
    return <NotFound lang={lang} totalPages={0} />;

  return (
    <div className="flex flex-col w-full gap-4">
      {clinicList.rows?.map((item: any) => (
        <ClinicCard
          key={item.id + item.name + item.url}
          href={{
            pathname: SITEROUTES.clinicPage,
            params: { options: item.url.split("/") },
          }}
          items={item}
        />
      ))}

      {/* pagination */}
      <PaginationButtonBar
        totalPages={Math.ceil(clinicList.totalRows?.count / 10)}
        lang={lang}
      />
    </div>
  );
}
