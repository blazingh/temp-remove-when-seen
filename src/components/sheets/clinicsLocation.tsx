"use Client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import { useParams, useSearchParams } from "next/navigation";
import SITEROUTES from "@/constants/site_routes";
import useUtils from "@/hooks/utils-hook";
import AllClinicButton from "../all-clinics-button";
import IconLocationPin2 from "@/icons/locationPin2";
import IconLocation from "@/icons/location";
import IconPinPointLocation from "@/icons/pin-point-location";
import { Separator } from "../ui/separator";
import GetClientLocationButton from "../get-client-location-button";
import safeAwait from "safe-await";
import { APIROUTE } from "@/constants/api_routes";

export default function ClinicLocation({
  cities,
  districts,
  onComplete,
  showGetCurrentLocation = false,
}: {
  cities: any[];
  districts: any[];
  onComplete: (location: [string, string]) => void;
  showGetCurrentLocation?: boolean;
}) {
  const { t, sheet } = useUtils({ nameSpace: "sheets.locationFilter" });
  const params = useParams();

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("tumu");

  function updateSelectedCity(v: string) {
    setSelectedCity(v);
    setSelectedDistrict("tumu");
  }

  useEffect(() => {
    if (params.options?.[1])
      setSelectedCity(
        cities.filter((item) => item.domain === params.options[1])?.[0]
          ?.domain ?? "",
      );
    if (params.options?.[2])
      setSelectedDistrict(
        districts.filter((item) => item.domain === params.options[2])?.[0]
          ?.domain ?? "",
      );
  }, [params.options]);

  function handleSubmit() {
    onComplete([selectedCity, selectedDistrict]);
    /*
    router.push({
      pathname: SITEROUTES.clinicsList,
      params: {
        options: [
          params.options?.[0] ?? "tumu",
          selectedCity,
          selectedDistrict,
        ],
      },
      query: Object.fromEntries(queries.entries()),
    });
    */
    sheet?.close();
  }

  async function getNearestClinic(geo: GeolocationPosition) {
    const [error, data] = await safeAwait(
      (async function () {
        const res = await fetch(
          APIROUTE("getNearestClinicByCoordinates", {
            lat: geo.coords.latitude,
            lng: geo.coords.longitude,
          }),
        );
        const { city, district } = await res.json();
        return { city, district };
      })(),
    );
    if (error || !data) return;
    setSelectedCity(data.city?.domain || "");
    setSelectedDistrict(data.district?.domain || "");
  }

  return (
    <div className="flex flex-col gap-4">
      {/* {showGetCurrentLocation && (
        <>
          <GetClientLocationButton
            variant={"outline"}
            onSuccess={getNearestClinic}
          >
            <IconPinPointLocation className="mr-2" />
            {t("currentLocation")}
          </GetClientLocationButton>
          <div className="relative h-8 flex items-center w-full">
            <span className="bg-white text-[#484848] px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {t("or")}
            </span>
            <Separator className="text-[#484848]" />
          </div>
        </>
      )} */}
      <div className="flex flex-col gap-4">
        <Select value={selectedCity} onValueChange={updateSelectedCity}>
          <SelectTrigger className="h-14" placeholder={t("cities")}>
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <SelectItem value="tumu">Tümü</SelectItem>
            {cities.map((item) => (
              <SelectItem key={item.id} value={item.domain}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          disabled={selectedCity === ""}
          value={selectedCity === "" ? undefined : selectedDistrict}
          onValueChange={setSelectedDistrict}
        >
          <SelectTrigger className="h-14" placeholder={t("districts")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <SelectItem value="tumu">Tümü</SelectItem>
            {districts
              .filter((item) => item.city_domain === selectedCity)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (
                <SelectItem key={item.id} value={item.domain}>
                  {item.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Button onClick={handleSubmit}>{t("submit")}</Button>
      </div>

      {/*
        <div className="relative w-full">
          <Separator></Separator>
          <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-2">
            {t("or")}
          </div>
        </div>

        <AllClinicButton className="w-full" variant={"outline"}>
          <LocateFixed className="mr-2" />
          {t("mapView")}
        </AllClinicButton>
*/}
    </div>
  );
}
