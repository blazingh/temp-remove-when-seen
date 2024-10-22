"use client";
import GetClientLocationButton from "./get-client-location-button";
import { useRouter } from "@/navigation";
import { ButtonProps } from "./ui/button";

export default function EmergentClinicButton(props: ButtonProps) {
  const router = useRouter();
  function handleSuccess(geolocation: GeolocationPosition) {
    router.push({
      pathname: "/map/clinics",
      query: {
        lat: geolocation.coords.latitude,
        lng: geolocation.coords.longitude,
        emergency: "true",
      },
    });
  }
  return <GetClientLocationButton {...props} onSuccess={handleSuccess} />;
}
