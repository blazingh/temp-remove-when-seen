"use client"
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import customIcon from './path/to/custom-icon.png';
const IstanbulCoordinates: LatLngExpression = [41.0082, 28.9784]; // İstanbul'un koordinatları

const Map = ({ clinicType, clinicName, clinicAdress, latitude, longitude }: { clinicType: string, clinicName: string, clinicAdress: string, latitude: number, longitude: number }) => {

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

  const customMarkerIcon = new L.Icon({
    iconUrl: Red_MARKER,
    iconSize: [64, 64],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const centerCoordinates: LatLngExpression = latitude && longitude ? [latitude, longitude] : IstanbulCoordinates;

  const markerIcon = latitude && longitude ? customMarkerIcon : new L.Icon({
    iconUrl: Red_MARKER,
    iconSize: [64, 64],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className='relative rounded-md border z-0'>
      <MapContainer
        center={centerCoordinates}
        zoom={13}
        style={{ height: '136px', width: '100%', borderRadius: '10px 10px 0 0' }}
        zoomControl={false}
        dragging={false}
        boxZoom={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://www.google.com/maps/vt?lyrs=m@189&gl=us&hl=en&x={x}&y={y}&z={z}
"
        />
        <Marker position={centerCoordinates} icon={markerIcon} />
      </MapContainer>
      <div className='block p-2'>
        <div>
          <span>{clinicName}</span>
        </div>
        <div>
          <span className='text-sm'>{clinicType}</span>
        </div>
        <div>
          <span className='text-xs'>{clinicAdress}</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
