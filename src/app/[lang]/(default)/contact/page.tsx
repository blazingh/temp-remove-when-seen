import NotFoundComponent from "@/components/notFoundComponent"
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n";
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'İletişim',
};
{/* just test meta data */}
export default function Page({ params: { lang } }: { params: { lang: any } }) {
  return (

    <div>
      {lang === 'tr' ? (
        <p>
        <b>Çağrı Merkezi</b> <br />
        <a href="tel:02167062122">0216 706 2122</a> <br /> <br />
        <b>E-Posta</b> <br />
        <a href="mail:info@distedavim.com">info@distedavim.com</a> </p>
      ) : (
        <p>
        <b>Call Center</b> <br />
        <a href="tel:02167062122">0216 706 2122</a> <br /> <br />
        <b>E-mail</b> <br />
        <a href="mail:info@distedavim.com">info@distedavim.com</a> </p>
      )}

      
  </div>

  )
}
