import { Locale } from "@/i18n";
import PaginationButtonBar from "@/components/ui/paginationButtonGroup";
import DoctorCard from "@/components/cards/doctor/doctorCard";
import { ROUTES } from "@/constants/routes";
import { getLocale } from "next-intl/server";
import { getDentistsList } from "@/app/[lang]/(default)/dentists/[[...options]]/actions";
import NotFound from "@/app/[lang]/(default)/dentists/[[...options]]/not-found";
import SITEROUTES from "@/constants/site_routes";

export const revalidate = 0;

export default async function DentistsList({
  queryOptions,
}: {
  queryOptions: { [key: string]: string };
}) {
  const lang = (await getLocale()) as Locale;

  // wait 5 sec for the random seed to be generated from the filter component
  if (!queryOptions.randomSeed)
    await new Promise((resolve) => setTimeout(resolve, 5000));

  const doctorList = await getDentistsList(queryOptions);

  if (!doctorList || doctorList.rows?.length === 0) return <NotFound />;

  return (
    <div className="flex flex-col gap-4">
      {doctorList.rows?.map((item: any, index: number) => (
        <DoctorCard
          key={String(item.id) + String(index)}
          href={{
            pathname: SITEROUTES.dentistPage,
            params: { options: item.url?.split("/") },
          }}
          item={item}
        />
      ))}

      {/* pagination */}
      <PaginationButtonBar
        totalPages={Math.ceil(doctorList.total / 10)}
        lang={lang}
      />
    </div>
  );
}
