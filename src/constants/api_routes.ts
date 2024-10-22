import { map } from "lodash";

export const apiRoutesEnum = {
  // common
  getFeaturedClinics: "/clinics/list",
  getFeaturedDentists: "/dentist/list",
  getFeaturedTreatments: "/treatments/list",
  getFeaturedBlogs: "/blogs/list",
  getFeaturedReviews: "/reviews/list",

  // clinic routes
  getClinicsList: "/clinics/list",
  getClinicDetail: "/clinics/details",
  getClinicsMap: "/map/clinic",
  getClinicsTreatmentsFees: "/clinics/get-price",
  getBranchTypes: "/dentist/branches",

  // dentist routes
  getDentistsList: "/dentist/list",
  getDentistDetail: "/dentist/details",
  getDentistDetailWithId: "/dentist/detailsWithId",
  getDentistsMap: "/map/dentist",
  getDentistsTreatmentsFees: "/dentist/get-price",

  // treatments routes
  getTreatmentsList: "/treatments/list",
  getTreatmentDetail: "/treatments/details",
  getTraetmentsCatergories: "/treatments/categories",

  // blog routes
  getBlogsList: "/blogs/list",
  getBlogDetail: "/blogs/details",

  // location routes
  getCitiesList: "/cities/list",
  getDistrictsList: "/districts/list/{id}",
  getDistrictsWithDomain: "/districts/listByDomain/{domain}",
  getAlldistrictsList: "/districts/all",
  getNearestClinicByCoordinates: "/map/nearest-clinic-by-coordinates",

  // auth
  loginWithPhone: "/auth/loginWithPhone",
  loginWithEmail: "/auth/loginWithEmail",
  registerWithPhone: "/auth/register",
  verifyOtp: "/auth/verify_otp",
  checkAccessToken: "/auth/checkAccessToken",
  renewPasswordWithPhone: "/auth/renewPassword",
  registerClinicOTP: "/clinics/verify-otp",

  // search
  seach: "/search",

  // user
  getUserReviews: "/reviews/list",
  getUserFavorites: "/favorites/list",
  findIsFavorite: "/favorites/find",

  createClinic: "/clinics/register",
  addUserFavorite: "/favorites/add",
  removeUserFavorite: "/favorites/delete",

  //appointment
  cancelAppointment: "/appointment/book/delete",
};

export type IRoutePramsType =
  | {
      page?: string;
      limit?: string;
      [key: string]: any;
    }
  | string
  | undefined;

// use this funtion to generate api routes with params
export function APIROUTE(
  route: keyof typeof apiRoutesEnum,
  params?: IRoutePramsType,
  options?: { baseUrl?: string },
): string {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const basePath = "/api-patients";
  const routePath = apiRoutesEnum[route];

  const paramsString = (function () {
    // if the params is a string it will replace the {id} in the route
    if (typeof params === "string")
      return routePath.replace(/{([^}]+)}/g, params);
    // if the params is an object it will convert it to a query string
    if (typeof params === "object")
      return `${routePath}?${buildParams(params)}`;
    return routePath;
  })();
  return `${baseURL}${basePath}${paramsString}`;
}

// function to corretly convert the params object to query string
const buildParams = (data: any) => {
  const params = new URLSearchParams();
  map(data, (value, key) => {
    if (Array.isArray(data[key])) {
      map(value, (item) => params.append(key, item));
    } else {
      params.append(key, value);
    }
  });
  return params;
};
