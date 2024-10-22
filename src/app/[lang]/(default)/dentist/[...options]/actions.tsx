"use server";

import { APIROUTE, IRoutePramsType } from '@/constants/api_routes';

export async function getDentistDetail(params: IRoutePramsType): Promise<any> {
  const req = await fetch(APIROUTE('getDentistDetail', params), {
    next: { revalidate: 0 },
    headers: { 
      'Cache-Control': 'no-cache',
    },
  });

  if (!req.ok) {
    console.error("Error fetching dentist details : \n", await req.text())
    return null
  }

  const data = await req.json()

  return data
}

export async function getDentistsTreatmentsFees(params: IRoutePramsType): Promise<any> {
  const req = await fetch(APIROUTE('getDentistsTreatmentsFees', params))

  if (!req.ok) {
    console.error("Error fetching dentist details : \n", await req.text())
    return null
  }

  const data = await req.json()

  return data
}

