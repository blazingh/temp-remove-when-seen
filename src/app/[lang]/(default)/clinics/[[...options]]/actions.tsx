"use server";

import { APIROUTE } from "@/constants/api_routes";
import { omitBy, isNil, isEmpty, random, pick } from "lodash";

interface IRoutePramsType {
  randomSeed?: number;
  page?: string;
  limit?: string;
  domain?: string
  [key: string]: any;
}

export async function getClinicsList(params?: IRoutePramsType): Promise<any> {
  const cleanedParams = pick(
    omitBy(params, (value) => isNil(value) || isEmpty(value)),
    [
      "randomSeed",
      "treatments",
      "page",
      "city",
      "clinicTypes",
      "spokenLanguages",
      "reviewCount",
      "dentist_branch_id",
      "district_domain",
      "q"
    ],
  );

  if (!cleanedParams.randomSeed) {
    console.error("Error: randomSeed is missing in the parameters");
    return "hata";
  }
  const { treatments, ...restParams } = cleanedParams;
  const queryParams = {
    treatment_category: treatments || "all",
    ...restParams,
  };

  try {
    const req = await fetch(APIROUTE("getClinicsList", queryParams), {
      cache: "no-store",
    });
    if (!req.ok) {
      return null;
    }

    const data = await req.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
export async function getTreatmentsList(): Promise<any> {
  try {
    // const response = await fetch('https://dev-api-v2.distedavim.com/api-patients/treatments/categories');
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
      "/api-patients/treatments/categories",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch treatment categories");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching treatment categories:", error);
    return null;
  }
}

// export async function getTreatmentsList(): Promise<any> {
//   // temporary single treatment value

//   return {
//     rows: [
//       { id: 1, name: { en: 'Clinic Appointment', tr: 'Klinikte Muayene' }, domain: { en: "klinikte-gorus", tr: "klinikte-gorus" } },
//       { id: 2, name: { en: 'Online Appointment', tr: 'Online Muayene' }, domain: { en: "online-muayene", tr: "online-muayene" } },
//       { id: 3, name: { en: 'Tooth stone cleaning', tr: 'Diştaşı Temizliği' }, domain: { en: "distasi-temizligi", tr: "distasi-temizligi" } },
//       { id: 4, name: { en: 'Teeth whitening', tr: 'Diş Beyazlatma' }, domain: { en: "dis-beyazlatma", tr: "dis-beyazlatma" } },
//       { id: 5, name: { en: 'Tooth Extractions', tr: 'Diş Çekimleri' }, domain: { en: "dis-cekimleri", tr: "dis-cekimleri" } },
//       { id: 6, name: { en: 'Dental Fillings', tr: 'Diş Dolguları' }, domain: { en: "dis-dolgulari", tr: "dis-dolgulari" } },
//       { id: 7, name: { en: 'Dental Veneers', tr: 'Diş Kaplamaları' }, domain: { en: "dis-kaplamalari", tr: "dis-kaplamalari" } },
//       { id: 8, name: { en: 'Dental Prostheses', tr: 'Diş Protezleri' }, domain: { en: "dis-protezi", tr: "dis-protezi" } },
//       { id: 9, name: { en: 'Gum Disorders', tr: 'Dişeti Rahatsızlıkları' }, domain: { en: "dis-eti-rahatsizlilari", tr: "dis-eti-rahatsizlilari" } },
//       { id: 10, name: { en: 'implants', tr: 'İmplantlar' }, domain: { en: "implantlar", tr: "implantlar" } },
//       { id: 11, name: { en: 'Root Canal Treatment', tr: 'Kanal Tedavisi' }, domain: { en: "kanal-tedavisi", tr: "kanal-tedavisi" } },
//       { id: 12, name: { en: 'Orthodontics', tr: 'Ortodonti' }, domain: { en: "ortodonti", tr: "ortodonti" } },
//     ]
//   }

//   const req = await fetch(APIROUTE('getTreatmentsList', { limit: '9999' }))

//   if (!req.ok) {
//     console.error("Error fetching treatments list : \n", (await req.json()).error)
//     return null
//   }

//   const data = await req.json()

//   return data

// }
//
export async function getAlldistrictsList(params?: IRoutePramsType): Promise<any> {
  const req = await fetch(
    APIROUTE("getAlldistrictsList", { ...params, limit: "9999" }),
  );

  if (!req.ok) {
    console.error(
      "Error fetching districts list : \n",
      (await req.json()).error,
    );
    return null;
  }

  const data = await req.json();


  return data;
}

export async function getDistrictsList(params?: IRoutePramsType): Promise<any> {
  const req = await fetch(
    APIROUTE("getDistrictsList", { ...params, limit: "9999" }),
  );

  if (!req.ok) {
    console.error(
      "Error fetching districts list : \n",
      (await req.json()).error,
    );
    return null;
  }

  const data = await req.json();

  return data;
}
export async function getDistrictsWithDomain(params?: any): Promise<any> {
  const req = await fetch(
    APIROUTE("getDistrictsWithDomain", params),
  );

  if (!req.ok) {
    console.error(
      "Error fetching districts list : \n",
      (await req.json()).error,
    );
    return null;
  }

  const data = await req.json();

  return data;
}

export async function getCitiesList(nonEmpty: boolean = false): Promise<any> {
  const req = await fetch(APIROUTE("getCitiesList", { limit: "9999" }), {
    cache: "no-store",
  });

  if (!req.ok) {
    console.error("Error fetching cities list : \n", (await req.json()).error);
    return null;
  }

  const data = await req.json();

  return !nonEmpty
    ? data
    : data.filter((city: any) => city.number_of_clinics !== 0);
}

export async function getBranchTypes(): Promise<any> {
  const req = await fetch(APIROUTE("getBranchTypes", { limit: "9999" }));

  if (!req.ok) {
    console.error("Error fetching branch list : \n", (await req.json()).error);
    return null;
  }

  const data = await req.json();

  return data;
}
