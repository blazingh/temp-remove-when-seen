"use server"

import { APIROUTE, IRoutePramsType } from "@/constants/api_routes"

export async function getClinicsMap(params?: IRoutePramsType): Promise<any> {

  const req = await fetch(APIROUTE('getClinicsMap', params))

  if (!req.ok) {
    console.error("Error fetching clinics on map : \n", await req.json())
    return null
  }

  const data = await req.json()

  return data
}
