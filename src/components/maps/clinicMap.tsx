"use client";
import FullMapWithCluster from "@/components/maps/fullMapWithCluster";
import { useSearchParams } from "next/navigation";

export default function ClinicsMap() {
  const searchParams = useSearchParams();

  const searchParamsObj = (function () {
    const obj: any = {};
    searchParams.forEach((value: string, key: string) => {
      obj[key] = value;
    });
    obj["lngs"] =
      obj.lngs ??
      (obj.lng
        ? `${obj.lng},${obj.lng}`
        : "28.622131347656254,29.460525512695316");
    obj["lats"] =
      obj.lats ??
      (obj.lat
        ? `${obj.lat},${obj.lat}`
        : "40.71863980562839,41.22515042620635");
    return obj;
  })();

  const { lngs, lats }: any = searchParamsObj;

  return (
    <div className="w-full h-[calc(100svh-48px)]">
      <FullMapWithCluster
        clientLocation={{
          lat: searchParamsObj.lat ?? 0,
          lng: searchParamsObj.lng ?? 0,
        }}
        centerCoordinates={{
          lat:
            (parseFloat(lats?.split(",")[1]) +
              parseFloat(lats?.split(",")[0])) /
            2,
          lng:
            (parseFloat(lngs?.split(",")[0]) +
              parseFloat(lngs?.split(",")[1])) /
            2,
        }}
      />
    </div>
  );
}
