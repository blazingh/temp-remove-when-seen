import ClinicsMap from "@/components/maps/clinicMap";
import { Suspense } from "react";


export default async function Page(
) {

  return (
    <Suspense fallback={null}>
      <ClinicsMap />
    </Suspense>
  )
}
