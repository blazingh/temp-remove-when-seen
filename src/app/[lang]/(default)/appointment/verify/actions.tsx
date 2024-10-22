"use server";

import { APIROUTE, IRoutePramsType } from '@/constants/api_routes';

export async function getDentistDetailWithId(params: any): Promise<any> {
  const req = await fetch(APIROUTE('getDentistDetailWithId', params))
  

  if (!req.ok) {
    console.error("Error fetching dentist details : \n", req)
    return null
  }

  const data = await req.json()

  return data
}


