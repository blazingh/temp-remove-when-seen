import {
  getCitiesList,
  getAlldistrictsList,
  getBranchTypes,
} from "@/app/[lang]/(default)/clinics/[[...options]]/actions";
import DentistCitiesBranchFilters from "@/components/pages/doctors/selecCityBranch";
import SITEROUTES from "@/constants/site_routes";

export default async function CitiesBranchFilters({
  showSubmit,
  basePath = SITEROUTES.clinicsList,
}: {
  showSubmit?: boolean;
  basePath?: string;
}) {
  const allData = await Promise.allSettled([
    getBranchTypes(),
    getCitiesList(),
    getAlldistrictsList(),
  ]);

  const branches = allData[0].status === "fulfilled" ? allData[0].value : null;
  const cities = allData[1].status === "fulfilled" ? allData[1].value : null;
  const districts = allData[2].status === "fulfilled" ? allData[2].value : null;

  return (
    <DentistCitiesBranchFilters
      {...{ branches, cities, districts, showSubmit, basePath }}
    />
  );
}
