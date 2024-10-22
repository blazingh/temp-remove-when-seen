import MapRawWithMarkerActive from "../maps/mapWithMarkerActive";

export default function MapWithPinSheetContent({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  return (
    <div className="h-[75svh] w-full ">
      <MapRawWithMarkerActive
        {...{ latitude, longitude }}
      ></MapRawWithMarkerActive>
    </div>
  );
}
