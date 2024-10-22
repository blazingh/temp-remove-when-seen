import {
  getCitiesList,
  getAlldistrictsList,
  getTreatmentsList,
} from "@/app/[lang]/(default)/clinics/[[...options]]/actions";
import ClinicBasicFilter from "@/components/pages/clinics/selectTreatmentclinic";
import SITEROUTES from "@/constants/site_routes";

export default async function CitiesTreatmentFilters({
  showSubmit,
  basePath = SITEROUTES.clinicsList,
}: {
  showSubmit?: boolean;
  basePath?: string;
}) {
  const allData = await Promise.allSettled([
    getTreatmentsList(),
    getCitiesList(),
    getAlldistrictsList(),
  ]);

  const treatments =
    allData[0].status === "fulfilled" ? allData[0].value : null;
  const cities = allData[1].status === "fulfilled" ? allData[1].value : null;
  const districts = allData[2].status === "fulfilled" ? allData[2].value : null;

  return (
    <ClinicBasicFilter
      {...{ treatments, cities, districts, showSubmit, basePath }}
    />
  );
}
