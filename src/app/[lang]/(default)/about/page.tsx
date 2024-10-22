import NotFoundComponent from "@/components/notFoundComponent"
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n";
import type { Metadata } from 'next';
import { useLocale } from "next-intl";
export const metadata: Metadata = {
  title: 'Hakkımızda',
};
{/* just test meta data */}



export default function Page({ params: { lang } }: { params: { lang: any } }) { 

  
  return (

    <div>
      {lang === 'tr' ? (
        <p>
          Diştedavim Teknoloji Hizmetleri AŞ 2021 Temmuz ayında kurulmuş ve 2022 Mayıs ayında hizmet vermeye başlamıştır.<br /><br />
          Amacı dental sektördeki tüm hizmet ve ürünlere erişimi kolaylaştırmak olan diştedavim, hastalar, dişhekimleri ve diş depolarını buluşturan Türkiye’deki tek platformdur.<br /><br />
          distedavim.com, dtsanalpos.com, dentalprices.com gibi markaları ile dental sektör için online randevu, online görüşme, online ödeme gibi hizmetler vermektedir.<br /><br />
          diştedavim’in hedefi Türkiye’de vermeye başladığı bu hizmetleri kısa zamanda yurtdışında pek çok ülkede de yayıp dünyanın 1 numaralı dental platformu olmaktır.
        </p>
      ) : (
        <p>
          Diştedavim Technology Services Inc. was founded in July 2021 and started offering services in May 2022.<br /><br />
          Aiming to facilitate access to all services and products in the dental sector, Diştedavim is the only platform in Turkey that brings together patients, dentists, and dental warehouses.<br /><br />
          With its brands such as distedavim.com, dtsanalpos.com, and dentalprices.com, it provides services such as online appointments, online consultations, and online payments for the dental sector.<br /><br />
          Diştedavim&apos;s goal is to expand these services, which it started to provide in Turkey, to many countries abroad in a short time and to become the number one dental platform in the world.
        </p>
      )}
  </div>

  )
}
