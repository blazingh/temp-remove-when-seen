import HomeMainForm from "@/components/forms/home-main-form";
import {
  getAlldistrictsList,
  getCitiesList,
  getTreatmentsList,
} from "@/app/[lang]/(default)/clinics/[[...options]]/actions";
import { Skeleton } from "@/components/ui/skeleton";

export default async function QuickClinicFilters() {
  const allData = await Promise.allSettled([
    getTreatmentsList(),
    getCitiesList(true),
    getAlldistrictsList(),
  ]);

  const treatments =
    allData[0].status === "fulfilled" ? allData[0].value : null;
  const cities = allData[1].status === "fulfilled" ? allData[1].value : null;
  const districts = allData[2].status === "fulfilled" ? allData[2].value : null;

  return <HomeMainForm {...{ cities, treatments, districts }} />;
}

export function QuickClinicFiltersSkeleton() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      <Skeleton className="w-full h-[56px] rounded-md" />
      <Skeleton className="w-full h-[56px] rounded-md" />
      <Skeleton className="w-full h-[56px] rounded-md" />
    </div>
  );
}
