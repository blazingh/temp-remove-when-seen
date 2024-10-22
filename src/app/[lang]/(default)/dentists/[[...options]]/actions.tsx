"use server";

import { APIROUTE, IRoutePramsType } from "@/constants/api_routes";
import { omitBy, isNil, isEmpty } from "lodash";

interface LocalIRoutePramsType {
  randomSeed?: number;
  page?: string;
  limit?: string;
  city?: string;
  [key: string]: any;
}

export async function getDentistsList(
  params?: LocalIRoutePramsType,
): Promise<any> {
  const cleanedParams = omitBy(
    params,
    (value) => isNil(value) || isEmpty(value),
  );

  if (!cleanedParams.randomSeed) {
    console.error("Error: randomSeed is missing in the parameters");
    return "hata";
  }

  try {
    const req = await fetch(APIROUTE("getDentistsList", cleanedParams));

    if (!req.ok) {
      const errorResponse = await req.json();
      console.error("Error fetching dentist list:", errorResponse.error);
      return null;
    }

    const data = await req.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
