// import { apiRoutesEnum } from "@/constants/api_routes";
// import { apiRequest } from "./api";


// // function getDentistDetail({
// //     // token,
// //     url,
// // }: {
// //     // token: string;
// //     url: string,
// // }): Promise<any> {
// //     return apiRequest<any>(
// //         `${apiRoutesEnum.dentist.getDentistDetail}${url ? `?url=${(url)}` : ""
// //     }`
// //         ,
// //         "GET",
// //         {},
// //         // { Authorization: `Bearer ${token}` }
// //     );
// // }

// function getDentistDetail({
//     // token,
//     id,
// }: {
//     // token: string;
//     id: number,
// }): Promise<any> {
//     return apiRequest<any>(
//         apiRoutesEnum.getDentistDetail.replace("{id}", String(id))
//         ,
//         "GET",
//         {},
//         // { Authorization: `Bearer ${token}` }
//     );
// }



// const dentistService = {
//     getDentistDetail,
// };

// export default dentistService;
