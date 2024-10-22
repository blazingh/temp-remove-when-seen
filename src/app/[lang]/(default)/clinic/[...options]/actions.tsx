"use server";

import { APIROUTE, IRoutePramsType } from '@/constants/api_routes';

export async function getClinicsDetail(params: IRoutePramsType): Promise<any> {
  const req = await fetch(APIROUTE('getClinicDetail', params), {
    next: { revalidate: 0 },
    headers: {
      'Cache-Control': 'no-cache',
    },
  })

  if (!req.ok) {
    console.error("Error fetching clinic details : \n", await req.text())
    return null
  }

  const data = await req.json()

  return data
}
