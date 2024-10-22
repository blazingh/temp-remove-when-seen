'use client'
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // sass
import Control from 'react-leaflet-custom-control'
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass
import MarkerClusterGroup from "./markerClusterGroup";
import L from 'leaflet'
import { Button } from '../ui/button';
import IconTarget from "@/icons/target"

// require('leaflet/dist/leaflet.css'); // inside .js file
// require('react-leaflet-markercluster/dist/styles.min.css'); // inside .js file

export function ChangeView({ coords }: { coords: any }) {
  const map = useMap();
  map.setView(coords, 13);
  return null;
}

export default function Map(
  {
    iconSelect
  }: {
    iconSelect: (id: any) => void
  }
) {
  const [geoData, setGeoData] = useState({ lat: 41.0122, lng: 28.976 });// TODO
  const istanbulCoords = { lat: 45.0082, lng: 16.779852 };
  const randomLocations = [
    { lat: 40.9922, lng: 29.0249 }, // Kadıköy
    { lat: 40.9830, lng: 29.1240 }, // Üsküdar
    { lat: 41.0082, lng: 29.0322 }, // Bostancı
    { lat: 40.9744, lng: 29.1996 }, // Ataşehir
    { lat: 41.0386, lng: 29.0464 }, // Maltepe
    { lat: 40.9590, lng: 29.0911 }, // Kartal
    { lat: 41.0023, lng: 29.1263 }, // Acıbadem
    { lat: 41.0136, lng: 29.1469 }, // Kozyatağı
    { lat: 40.9846, lng: 29.1547 }, // Göztepe
    { lat: 40.9860, lng: 29.0696 }, // Fenerbahçe
    { lat: 41.0266, lng: 29.1333 }, // Suadiye
    { lat: 40.9662, lng: 29.0465 }, // Pendik
    { lat: 41.0497, lng: 29.0002 }, // Tuzla
    { lat: 40.9521, lng: 29.1146 }, // Ümraniye
    { lat: 41.0157, lng: 29.0369 }, // Moda
  ];

  const Red_MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
    <svg width="64" height="74" viewBox="0 0 64 74" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="56.9707" width="24" height="24" transform="rotate(-45 15 56.9707)" fill="#4A16A3"/>
    <rect width="64" height="64" rx="32" fill="#7626FF"/>
    <mask id="mask0_2671_11614" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="9" y="16" width="46" height="32">
    <path d="M25.0028 31.5279C25.8567 32.007 26.5785 32.6984 27.1011 33.5385C27.6184 34.3501 27.8912 35.2993 27.8858 36.268C27.8935 37.7637 27.2763 39.1915 26.1895 40.1934C23.9746 42.3853 20.4569 42.3853 18.2423 40.1934C17.1519 39.1928 16.5322 37.7637 16.5391 36.2659C16.5335 35.2974 16.8063 34.3485 17.3235 33.5366C17.8461 32.6965 18.5677 32.0047 19.4221 31.5261C20.2753 31.0346 21.2387 30.7768 22.2186 30.7786C23.1948 30.7744 24.155 31.0331 25.0028 31.5279ZM27.8771 16V25.8709L27.3885 25.6585L26.9019 25.4458C23.8661 24.3356 20.5478 24.3356 17.5123 25.4458C16.0377 25.9975 14.6788 26.8303 13.5079 27.8993C12.3577 28.938 11.4274 30.2058 10.7748 31.6252C10.1135 33.0992 9.78092 34.6834 9.77734 36.2683V36.3147C9.78015 37.8843 10.1056 39.4533 10.7536 40.916C11.4187 42.3407 12.3551 43.6158 13.5079 44.6671C14.6757 45.7399 16.0356 46.5722 17.5123 47.1189C18.995 47.698 20.5693 47.9961 22.1568 47.9979H22.2168L22.2398 48C24.3649 48.0008 26.459 47.4741 28.3407 46.4649C30.2033 45.5079 31.7852 44.065 32.9254 42.2815C34.0493 40.5405 34.646 38.4994 34.6409 36.4136V16H27.8771Z" fill="white"/>
    <path d="M42.085 25.4205V16.2936H48.8473V25.4223H53.3385L51.8325 31.27H48.8401V38.5036C48.8401 40.4296 50.0516 41.4059 52.4409 41.4059C53.0468 41.4354 53.6519 41.3409 54.2218 41.1285L52.2716 47.9131C51.9298 47.9689 51.5845 47.9974 51.2384 47.9979H50.8522C49.2483 47.9995 47.6608 47.6654 46.1883 47.0159C44.8736 46.3989 43.7941 45.3571 43.1165 44.0506C42.3737 42.491 42.0194 40.7683 42.085 39.0349V31.2685H37.6045L39.1318 25.4205H42.085Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_2671_11614)">
    <path d="M9.77734 15.4106H54.0479V49.0116H9.77734V15.4106Z" fill="white"/>
    </g>
    </svg>

  `)}`
  const Blue_MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="136" height="140" viewBox="0 0 136 140" version="1.1"><path d="M 63.293 24.060 C 52.290 25.563, 39.972 33.747, 33.656 43.753 C 30.955 48.031, 28.537 55.660, 27.555 63 C 26.870 68.122, 29.800 81.169, 32.654 85.705 C 45.323 105.842, 69.208 112.631, 90 102.006 C 95.635 99.126, 104.780 89.733, 107.763 83.761 C 114.595 70.081, 112.568 51.224, 102.960 39.068 C 93.882 27.584, 78.927 21.925, 63.293 24.060 M 61.500 29.869 C 49.058 33.166, 39.516 41.709, 35.397 53.239 C 33.127 59.595, 33.398 71.316, 35.975 78.203 C 38.788 85.723, 45.709 93.300, 53.396 97.276 C 59.032 100.191, 60.267 100.436, 69.500 100.467 C 78.581 100.497, 80.025 100.234, 85.207 97.609 C 108.669 85.723, 113.163 55.919, 94.080 38.762 C 86.973 32.372, 81.393 30.012, 72.183 29.501 C 67.958 29.266, 63.150 29.432, 61.500 29.869" stroke="none" fill="#d4e6f1" fill-rule="evenodd"/><path d="M 61.500 29.869 C 49.058 33.166, 39.516 41.709, 35.397 53.239 C 33.127 59.595, 33.398 71.316, 35.975 78.203 C 38.788 85.723, 45.709 93.300, 53.396 97.276 C 59.032 100.191, 60.267 100.436, 69.500 100.467 C 78.581 100.497, 80.025 100.234, 85.207 97.609 C 108.669 85.723, 113.163 55.919, 94.080 38.762 C 86.973 32.372, 81.393 30.012, 72.183 29.501 C 67.958 29.266, 63.150 29.432, 61.500 29.869" stroke="none" fill="#7258E9" fill-rule="evenodd"/></svg>


`)}`



  const customIcon = new L.Icon({
    iconUrl: Red_MARKER,
    iconSize: [64, 64],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const customCurrentIcon = new L.Icon({
    iconUrl: Blue_MARKER,
    iconSize: [48, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const markerClickHandler = ((index: any, location: any) => {
    iconSelect(index)
    setGeoData({ lat: location.lat, lng: location.lng })
  })
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(null);
  const getUserLocation = (() => {
    if (userLocation) {
      setGeoData({ lat: userLocation?.lat, lng: userLocation?.lng })
    }
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setGeoData({ lat: latitude, lng: longitude })

        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);
  return (
    <MapContainer center={istanbulCoords} zoom={12} className='top-0 bottom-0 w-full h-full'>
      <TileLayer
        attribution="Google Maps"
        url="https://www.google.com/maps/vt?lyrs=m@189&gl=us&hl=en&x={x}&y={y}&z={z}
"
      />
      <MarkerClusterGroup>
        {randomLocations.map((location, index) => (
          <Marker eventHandlers={{
            click: () => markerClickHandler(index, location),
          }} icon={customIcon} key={index} position={[location.lat, location.lng]} />
        ))}
      </MarkerClusterGroup>
      {userLocation && <Marker position={userLocation} icon={customCurrentIcon} />}
      <Control prepend position='topright'>
        <Button color='inherit' onClick={() => {
          getUserLocation()
        }}>
          <IconTarget />
        </Button>
      </Control>
      <ChangeView coords={geoData} />
    </MapContainer>
  );
}
