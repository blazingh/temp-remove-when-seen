import MapRawWithMarker from "@/components/maps/mapWithMarker";

export function MapCardWithContent(
  {
    position,
    children
  }: {
    position: [number, number]
    children?: React.ReactNode
  }
) {
  return (
    <div className='rounded-md border overflow-hidden z-0' id="map-address">

      <MapRawWithMarker latitude={position[0]} longitude={position[1]} />

      <div className='px-3 py-4'>
        {children}
      </div>

    </div>
  );
}
