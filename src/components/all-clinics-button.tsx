"use client";
import GetClientLocationButton from "./get-client-location-button";
import { useRouter } from "@/navigation";
import { ButtonProps } from "./ui/button";
import { useContext } from "react";
import { SheetContext } from "@/contextPorviders/sheetContext";

export default function AllClinicButton(props: ButtonProps) {
  const router = useRouter();
  const sheet = useContext(SheetContext);
  function handleSuccess(geolocation: GeolocationPosition) {
    router.push({
      pathname: "/map/clinics",
      query: {
        lat: geolocation.coords.latitude,
        lng: geolocation.coords.longitude,
      },
    });
    sheet?.close();
  }
  return <GetClientLocationButton {...props} onSuccess={handleSuccess} />;
}
