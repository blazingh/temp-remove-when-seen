"use server";

import { APIROUTE, IRoutePramsType } from "@/constants/api_routes";
import { IList } from "@/types/list";
import Clinics from "@/types/public/Clinics";
import Dentists from "@/types/public/Dentists";
import Blogs from "@/types/public/Blogs";
import Treatments from "@/types/public/Treatments";
import Reviews from "@/types/public/Reviews";
import { cache } from "react";

export async function getFeaturedClinics(
  params?: IRoutePramsType,
): Promise<IList<Clinics>> {
  try {
    const data = await fetch(APIROUTE("getFeaturedClinics", params), {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data as IList<Clinics>);
    return data;
  } catch (e) {
    return { rows: [], totalRows: 0 };
  }
}

export async function getFeaturedDentists(
  params?: IRoutePramsType,
): Promise<IList<Dentists>> {
  const data = fetch(APIROUTE("getFeaturedDentists", params), {
    cache: "no-store",
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => data as IList<Dentists>);
  return data;
}

export async function getFeaturedtreatments(
  params?: IRoutePramsType,
): Promise<IList<Treatments>> {
  const data = fetch(APIROUTE("getFeaturedTreatments", params), {
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((data) => data as IList<Treatments>);
  return data;
}

export async function getFeaturedBlogs(
  params?: IRoutePramsType,
): Promise<IList<Blogs>> {
  const data = fetch(APIROUTE("getFeaturedBlogs", params), {
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((data) => data as IList<Blogs>);
  return data;
}

export async function getFeaturedReviews(
  params?: IRoutePramsType,
): Promise<IList<Reviews>> {
  // temperorary
  return {
    rows: reviews.filter((item) => item.type === "costumer") as any,
    totalRows: reviews.length,
  };
  const data = fetch(APIROUTE("getFeaturedReviews", params), {
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((data) => data as IList<Reviews>);
  return data;
}
export async function getDTPosDataTransaction(): Promise<string> {
  try {
    const data = fetch(
      "https://api-v2.dtsanalpos.com/api/public/total_transaction_count",
    )
      .then((res) => res.json())
      .then((data) => data);
    return data ?? "0";
  } catch (e) {
    return "xxx";
  }
}
export async function getDTPosDataDentist(): Promise<string> {
  try {
    const data = fetch(
      "https://api-v2.dtsanalpos.com/api/public/registered_dentist_count",
    )
      .then((res) => res.json())
      .then((data) => data);
    return data ?? "0";
  } catch (e) {
    return "xxx";
  }
}

const reviews = [
  {
    id: 1,
    type: "dentist",
    sort: 0,
    name: "Ersun",
    surname: "Gushi",
    title: "Hekim",
    title_en: "Dentist",
    comment:
      "distedavim.com sayesinde binlerce klinik arasında görünür oluyorum ve yeni hastalar kazanıyorum.",
    comment_en:
      "Thanks to distedavim.com, I become visible among thousands of clinics and gain new patients.",
    rating: 4.8,
    avatar: "/homereviews/ersu.webp",
    confirmedAt: "2022-06-03T14:31:47.000Z",
    createdAt: "2022-06-02T18:05:18.000Z",
    updatedAt: "2022-06-03T14:31:47.000Z",
  },
  {
    id: 2,
    type: "costumer",
    sort: 1,
    name: "Garo",
    surname: "Berberyan",
    title: "Müşteri",
    title_en: "Customer",
    comment:
      "Uzun zamandır ertelediğim tedavimi çok sayıda diş kliniği inceledikten sonra Diştedavim vasıtasıyla yaptırma fırsatı yakaladım. Platformun sunduğu ödeme kolaylıkları sayesinde maddiyat engelinide aşmış oldum.",
    comment_en:
      "After examining many dental clinics, I had the opportunity to have my treatment, which I postponed for a long time, done through my dentist. Thanks to the payment facilities offered by the platform, I have overcome the financial barrier.",
    rating: 5.0,
    avatar: "/homereviews/goro.webp",
    confirmedAt: "2022-06-03T14:31:47.000Z",
    createdAt: "2022-06-02T18:05:18.000Z",
    updatedAt: "2022-06-03T14:31:47.000Z",
  },
  {
    id: 3,
    type: "dentist",
    sort: 2,
    name: "Alper",
    surname: "Şen",
    title: "Hekim",
    title_en: "Dentist",
    comment:
      "Hastalara sunduğumuz ödeme seçenekleri sayesinde hastalar yüksek tutarlı tedavileri daha rahat ödeyebiliyor. Bu sayede tedaviyi kabul eden hasta sayımız artış göstermiş oluyor.",
    comment_en:
      "Thanks to the payment options we offer to patients, patients can pay for high-cost treatments more easily. In this way, the number of patients accepting treatment is increasing.",
    rating: 5.0,
    avatar: "/homereviews/alper_sen.webp",
    confirmedAt: "2022-06-03T14:31:47.000Z",
    createdAt: "2022-06-02T18:05:18.000Z",
    updatedAt: "2022-06-03T14:31:47.000Z",
  },
  {
    id: 4,
    type: "costumer",
    sort: 3,
    name: "Moustafa",
    surname: "Molla",
    title: "Müşteri",
    title_en: "Customer",
    comment:
      "Yurtdışından Türkiye’ye diş tedavilerimi yaptırmak için geldim fakat hiçbir klinik, hekim bilmiyordum. Distedavim sayesinde kendime en uygun kliniği ve hekimi buldum.",
    comment_en:
      "I came to Turkey from abroad to have my dental treatment, but I did not know any clinic or doctor. Thanks to my distedavim, I found the most suitable clinic and doctor for me.",
    rating: 5.0,
    avatar: "/homereviews/mustafa.webp",
    confirmedAt: "2022-06-03T14:31:47.000Z",
    createdAt: "2022-06-02T18:05:18.000Z",
    updatedAt: "2022-06-03T14:31:47.000Z",
  },
  {
    id: 4,
    type: "dentist",
    sort: 3,
    name: "Betül",
    surname: "As",
    title: "Hekim",
    title_en: "Dentist",
    comment:
      "Diş hekimleri olarak bireysel yapabileceğimiz tanıtımların sınırlılığını düşünürsek, distedavim.com ile tek platformda toplanmak ve buradan hastaya ulaşmak çok daha kolay ve verimli.",
    comment_en:
      "Considering the limitations of the promotions we can make individually as dentists, it is much easier and more efficient to gather on a single platform with deniztedavim.com and reach the patient from there.",
    rating: 4.9,
    avatar: "/homereviews/batul_as.webp",
    confirmedAt: "2022-06-03T14:31:47.000Z",
    createdAt: "2022-06-02T18:05:18.000Z",
    updatedAt: "2022-06-03T14:31:47.000Z",
  },
  {
    id: 5,
    type: "costumer",
    sort: 4,
    name: "Selcen",
    surname: "Gökçen",
    title: "Müşteri",
    title_en: "Customer",
    comment:
      "Evime yeni taşındığım için diş hekimimi değiştirmem gerekti. Bana en yakın kliniklerin hepsini tek sayfada görmek klinik seçmemi çok kolaylaştırdı. Ayrıca hekimim hakkında da birçok şey öğrenmiş oldum.",
    comment_en:
      "Since I just moved home, I had to change my dentist. Seeing all the clinics closest to me on one page made it much easier for me to choose a clinic. I also learned a lot about my doctor.",
    rating: 4.7,
    avatar: "/homereviews/selcen_gokcen.webp",
    confirmedAt: "2022-06-03T14:31:47.000Z",
    createdAt: "2022-06-02T18:05:18.000Z",
    updatedAt: "2022-06-03T14:31:47.000Z",
  },
  {
    id: 6,
    type: "dentist",
    sort: 5,
    name: "Mesut",
    surname: "Özkul",
    title: "Hekim",
    title_en: "Dentist",
    comment:
      "distedavim.com hem hasta portföyümü arttırıyor hem de ücretsiz üyesi olmaktan keyif alıyorum.",
    comment_en:
      "distedavim.com increases my patient portfolio and I enjoy being a free member.",
    rating: 5.0,
    avatar: "/homereviews/mesut_ozkul.webp",
    confirmedAt: "2022-06-03T14:31:47.000Z",
    createdAt: "2022-06-02T18:05:18.000Z",
    updatedAt: "2022-06-03T14:31:47.000Z",
  },
  {
    id: 7,
    type: "costumer",
    sort: 6,
    name: "İlayda",
    surname: "Kaya",
    title: "Müşteri",
    title_en: "Customer",
    comment:
      "Diş kliniği seçerken çok zorlanıyordum. Diştedavim sayesinde bir sürü klinik hakkında çok kolay bir şekilde bilgi toplayıp, seçtiğim klinikten randevumu aldım.",
    comment_en:
      "I was having a hard time choosing a dental clinic. Thanks to my dentistry, I could easily gather information about many clinics and make an appointment at the clinic I chose.",
    rating: 5.0,
    avatar: "/homereviews/ilayda_kaya.webp",
    confirmedAt: "2022-06-03T14:31:47.000Z",
    createdAt: "2022-06-02T18:05:18.000Z",
    updatedAt: "2022-06-03T14:31:47.000Z",
  },
];
