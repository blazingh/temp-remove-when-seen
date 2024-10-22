"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L, { MarkerCluster } from "leaflet";
import "leaflet.css";
import { Loader2Icon } from "lucide-react";
import {
  parseAsArrayOf,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { ICoordinates } from "@/types/map";
import { getClinicsMap } from "@/services/clinics";
import { useQuery } from "@tanstack/react-query";
import { isNil, omit, omitBy, pick } from "lodash";
import { create } from "zustand";
import ClinicsFiltersSheetTrigger from "@/components/sheets/clinicsFilters";
import IconFilter from "@/icons/filter";
import ClinicCard from "@/components/cards/clinic/clinicCard";
import SITEROUTES from "@/constants/site_routes";
import { APIROUTE } from "@/constants/api_routes";
import ClinicCardSkeleton from "@/components/cards/clinic/clinicCardSkeleton";
import { Circle } from "react-leaflet";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";
import ClinicsFiltersSheetContent from "@/components/sheets/clinicsFilters";

// check if bound2 is inside bound1 with inner padding to bound2
function isBoundInside(
  bound1: [number, number, number, number],
  bound2: [number, number, number, number],
  padding: number = 0,
) {
  return (
    bound1[0] >= bound2[0] - padding &&
    bound1[1] <= bound2[1] + padding &&
    bound1[2] <= bound2[2] + padding &&
    bound1[3] >= bound2[3] - padding
  );
}

const useStore = create<{ [key: string]: any }>((set: any) => ({
  loading: false,
  setLoading: (v: boolean) => set((state: any) => ({ loading: v })),
  selectedClinic: null,
  setSelectedClinic: (v: string) =>
    set((state: any) => ({ selectedClinic: v })),
}));

export default function NonSSRMap({
  centerCoordinates,
  clientLocation,
}: {
  centerCoordinates: ICoordinates;
  clientLocation: ICoordinates;
}) {
  const { loading, selectedClinic } = useStore();
  const fetchItemDetails = async (id: any) => {
    if (isNil(id)) return null;
    try {
      const req = await fetch(APIROUTE("getClinicsList", { ids: id }));
      const data = await req.json();
      return data?.rows[0] ?? null;
    } catch {
      return null;
    }
  };
  const itemDetailsQuery = useQuery({
    queryKey: ["getClinicDetail", selectedClinic],
    queryFn: () => fetchItemDetails(selectedClinic),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white opacity-50">
          <Loader2Icon className="w-8 h-8 animate-spin" />
        </div>
      )}
      <MapContainer
        center={[centerCoordinates.lat, centerCoordinates.lng]}
        className="h-full w-full z-0"
        zoom={13}
        minZoom={5}
        scrollWheelZoom
        doubleClickZoom
        zoomControl
        dragging
      >
        <TileLayer url="https://www.google.com/maps/vt?lyrs=m@189&gl=us&hl=en&x={x}&y={y}&z={z}" />
        <Marker position={clientLocation} icon={circleMarkerIcon} />
        <ClinicsClusters />
      </MapContainer>
      <div className="fixed bottom-[24px] left-1/2 -translate-x-1/2 w-full z-30 flex flex-col items-center gap-4">
        <div className="bg-[#212121] rounded-full px-6 py-3 flex items-center justify-around max-w-5xl">
          <SheetContentTrigger
            className="flex gap-2 text-background"
            sheetProps={{
              side: "bottom",
              content: <ClinicsFiltersSheetContent />,
            }}
          >
            <IconFilter />
            <span className="text-sm font-medium">Filtrele</span>
          </SheetContentTrigger>
        </div>
        <div className="max-w-xl w-[90%]">
          {itemDetailsQuery.isLoading && <ClinicCardSkeleton />}
          {!itemDetailsQuery.isLoading && itemDetailsQuery.data && (
            <ClinicCard
              href={{
                pathname: SITEROUTES.clinicPage,
                params: { options: itemDetailsQuery.data.url.split("/") },
              }}
              items={itemDetailsQuery.data}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const MAP_COSTUME_MARKER_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?><svg width="64" height="74" viewBox="0 0 64 74" fill="none" xmlns="http://www.w3.org/2000/svg">  <rect x="15" y="56.9707" width="24" height="24" transform="rotate(-45 15 56.9707)" fill="#4A16A3"/>  <rect width="64" height="64" rx="32" fill="#7626FF"/>  <mask id="mask0_2671_11614" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="9" y="16" width="46" height="32">  <path d="M25.0028 31.5279C25.8567 32.007 26.5785 32.6984 27.1011 33.5385C27.6184 34.3501 27.8912 35.2993 27.8858 36.268C27.8935 37.7637 27.2763 39.1915 26.1895 40.1934C23.9746 42.3853 20.4569 42.3853 18.2423 40.1934C17.1519 39.1928 16.5322 37.7637 16.5391 36.2659C16.5335 35.2974 16.8063 34.3485 17.3235 33.5366C17.8461 32.6965 18.5677 32.0047 19.4221 31.5261C20.2753 31.0346 21.2387 30.7768 22.2186 30.7786C23.1948 30.7744 24.155 31.0331 25.0028 31.5279ZM27.8771 16V25.8709L27.3885 25.6585L26.9019 25.4458C23.8661 24.3356 20.5478 24.3356 17.5123 25.4458C16.0377 25.9975 14.6788 26.8303 13.5079 27.8993C12.3577 28.938 11.4274 30.2058 10.7748 31.6252C10.1135 33.0992 9.78092 34.6834 9.77734 36.2683V36.3147C9.78015 37.8843 10.1056 39.4533 10.7536 40.916C11.4187 42.3407 12.3551 43.6158 13.5079 44.6671C14.6757 45.7399 16.0356 46.5722 17.5123 47.1189C18.995 47.698 20.5693 47.9961 22.1568 47.9979H22.2168L22.2398 48C24.3649 48.0008 26.459 47.4741 28.3407 46.4649C30.2033 45.5079 31.7852 44.065 32.9254 42.2815C34.0493 40.5405 34.646 38.4994 34.6409 36.4136V16H27.8771Z" fill="white"/>  <path d="M42.085 25.4205V16.2936H48.8473V25.4223H53.3385L51.8325 31.27H48.8401V38.5036C48.8401 40.4296 50.0516 41.4059 52.4409 41.4059C53.0468 41.4354 53.6519 41.3409 54.2218 41.1285L52.2716 47.9131C51.9298 47.9689 51.5845 47.9974 51.2384 47.9979H50.8522C49.2483 47.9995 47.6608 47.6654 46.1883 47.0159C44.8736 46.3989 43.7941 45.3571 43.1165 44.0506C42.3737 42.491 42.0194 40.7683 42.085 39.0349V31.2685H37.6045L39.1318 25.4205H42.085Z" fill="white"/>  </mask>  <g mask="url(#mask0_2671_11614)">  <path d="M9.77734 15.4106H54.0479V49.0116H9.77734V15.4106Z" fill="white"/>  </g>  </svg>`)} `;
export const MAP_CIRCLE_MARKER_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?> <svg height="60" width="60" xmlns="http://www.w3.org/2000/svg">
  <circle r="24" cx="30" cy="30" fill="#c4c3f6" stroke="#3388ff" stroke-width="10" fill-opacity="0.5" />
</svg> `)} `;

export const MAP_COSTUME_CLUSTER_MARKER_HTML = (count: number) => `
<div class="flex flex-col justify-center items-center relative -translate-y-1/2" >
          <svg width="42" height="42" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="38.9707" width="24" height="24" transform="rotate(-45 7 38.9707)" fill="#4A16A3" />
            <rect x="1.5" y="1.5" width="45" height="45" rx="22.5" fill="#7626FF" />
            <text x="24" y="27" fill="white" font-size="24" font-weight="700" text-anchor="middle" dominant-baseline="middle">${count}</text>
          </svg>
        </div >`;
const createClusterCustomIcon = function (cluster: MarkerCluster) {
  return L.divIcon({
    html: MAP_COSTUME_CLUSTER_MARKER_HTML(cluster.getChildCount()),
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    className: "custom-marker-cluster",
  });
};
const customMarkerIcon = new L.Icon({
  iconUrl: MAP_COSTUME_MARKER_URI,
  iconSize: [42, 42],
  iconAnchor: [21, 42],
});
const circleMarkerIcon = new L.Icon({
  iconUrl: MAP_CIRCLE_MARKER_URI,
  iconSize: [36, 36],
  iconAnchor: [28, 28],
});

function ClinicsClusters() {
  const map = useMap();
  const { setLoading, setSelectedClinic } = useStore();

  const [mapView, setMapView] = useQueryStates({
    lats: parseAsArrayOf(parseAsFloat),
    lngs: parseAsArrayOf(parseAsFloat),
    zoom_level: parseAsInteger.withDefault(13),
    dentist_branch_id: parseAsString,
    emergency: parseAsString,
  });
  const [prevBounds, setPrevBounds] =
    React.useState<[number, number, number, number]>();

  function calcBounds() {
    const bounds = map.getBounds();
    const currentZoom = map.getZoom();
    const currentBounds: [number, number, number, number] = [
      bounds.getNorthEast().lat,
      bounds.getSouthWest().lng,
      bounds.getSouthWest().lat,
      bounds.getNorthEast().lng,
    ];
    let needsRefetch: boolean = false;
    // if bounds changed
    needsRefetch =
      prevBounds === undefined
        ? true
        : !isBoundInside(prevBounds, currentBounds, 0.1);
    // if zoom changed
    needsRefetch =
      needsRefetch === false
        ? Math.abs(currentZoom - mapView.zoom_level) >= 2
        : needsRefetch;

    if (!needsRefetch) return;

    setPrevBounds(currentBounds);
    setMapView({
      zoom_level: currentZoom,
      lats: [currentBounds[2], currentBounds[0]],
      lngs: [currentBounds[1], currentBounds[3]],
    });
  }

  const query = useQuery({
    queryKey: ["getClinicsMap", mapView],
    queryFn: () => {
      return getClinicsMap({
        ...pick(omitBy(mapView, isNil), ["dentist_branch_id", "emergency"]),
        limit: 250,
        city: "all",
        lats: mapView.lats?.join(","),
        lngs: mapView.lngs?.join(","),
      });
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (query.isLoading || query.isFetching) setLoading(true);
    else setLoading(false);
  }, [query.isLoading, query.isFetching]);

  map.on("moveend", calcBounds);

  useEffect(() => {
    map.fireEvent("moveend");
  }, [map.hasEventListeners("moveend")]);

  const pinsPositions =
    query.data?.length > 0
      ? query.data?.map((p: any) => ({
          latitude: p.lat,
          longitude: p.lng,
          id: p.id,
        }))
      : [];

  return (
    <>
      {(query.isLoading || query.isFetching) && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-white opacity-50">
          <Loader2Icon className="w-8 h-8 animate-spin" />
        </div>
      )}
      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        chunkedLoading
        maxClusterRadius={35}
        zoomToBoundsOnClick
      >
        {pinsPositions.map((pin: any, index: number) => (
          <Marker
            key={index}
            position={[pin.latitude, pin.longitude]}
            icon={customMarkerIcon}
            eventHandlers={{
              click: () => {
                setSelectedClinic(pin.id);
              },
            }}
          />
        ))}
      </MarkerClusterGroup>
    </>
  );
}
