"use client"

import FullMapWithCluster from "@/components/maps/fullMapWithCluster"

export default function SheetSide() {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-[500px]">
        {/*
        <FullMapWithCluster
          centerCoordinates={{ lat: 41.0082, lng: 28.9786 }}
          pinsPositions={[
            { latitude: 41.0082, longitude: 28.9786 },
            { latitude: 41.0093, longitude: 28.9774 },
            { latitude: 41.0104, longitude: 28.9794 },
            { latitude: 41.0115, longitude: 28.9780 },
          ]} />
        */}
      </div>
    </div>
  )
}
