import { APIROUTE } from "@/constants/api_routes";

export async function getClinicsMap(params: any) {
  try {
    const req = await fetch(APIROUTE("getClinicsMap", params));
    const data = await req.json();
    return data?.rows ?? [];
  } catch {
    return [];
  }
}
