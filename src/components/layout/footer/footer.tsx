import SITE_INFO from "@/constants/site_info";
import WhatsappIcon from "@/icons/whatsappIcon";
import CallCenter from "@/icons/callcenter";

import { getLocale, getTranslations } from "next-intl/server";
import UsbsFooter from "./usbs";
import { Locale } from "@/i18n";
import { ROUTES } from "@/constants/routes";
import SITEROUTES from "@/constants/site_routes";
import { Link } from "@/navigation";

export default async function Footer() {
  const t = await getTranslations("layout.footer");
  const lang = (await getLocale()) as Locale;

  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full">
      <div className="w-full border-b bg-muted grid pb-[100px] mt-5 pt-4">
        <div className="max-w-5xl w-full mx-auto flex flex-col p-6 gap-6">
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-5">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-black">
                {t("links.title_1")}
              </h2>
              <ul className="font-normal text-sm text-gray-500">
                <li className="mb-2">
                  <Link
                    href={{
                      pathname: SITEROUTES.clinicsList,
                      params: { options: [] },
                    }}
                    className=""
                  >
                    {t("links.klinikler")}
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href={{
                      pathname: SITEROUTES.dentistsList,
                      params: { options: [] },
                    }}
                    className=""
                  >
                    {t("links.dishekimleri")}
                  </Link>
                </li>
                {/* <li className="mb-2">
                  <Link href="/acil-dis-klinikleri" className="">{t('links.acildis')}</Link>
                </li>
                <li className="mb-2">
                  <Link href="/en-yakin-dis-klinikleri" className="">{t('links.enyakin')}</Link>
                </li> */}
                <li className="mb-2">
                  <Link
                    href={{
                      pathname: SITEROUTES.blogsList,
                    }}
                    className=""
                  >
                    {t("links.blog")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-black">
                {t("links.title_2")}
              </h2>
              <ul className="font-normal text-sm text-gray-500">
                <li className="mb-2">
                  <Link href={SITEROUTES.about} className="">
                    {t("links.hakkimizda")}
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href={SITEROUTES.privacy} className="">
                    {ROUTES.privacy.title[lang]}
                  </Link>
                </li>
                {/* <li className="mb-2">
                  <Link href={ROUTES.privacy.path[lang]} className="">{t('links.cerez')}</Link>
                </li> */}
                <li className="mb-2">
                  <Link href={SITEROUTES.faq} className="">
                    {t("links.sss")}
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href={SITEROUTES.contact}>{t("links.iletisim")}</Link>
                </li>
                <li className="mb-2">
                  <Link href={SITEROUTES.terms}>{t("links.kosullar")}</Link>
                </li>
                <li className="mb-2">
                  <Link href={SITEROUTES.policy}>{t("links.policy")}</Link>
                </li>
                <div className="flex text-sm border-t border-solid border-1 items-center justify-between">
                  {/* <div className="w-1/3 font-medium  p-3 border-r border-solid border-1 border-gray-300 text-center">
                <HidePrivacyPopup
                  title={t("kk1")}
                  privacyPolicyText={t("kk1")}
                  content={
                    lang === "tr"
                      ? privacyPolicyContent
                      : privacyPolicyContentEN
                  }
                />
              </div>
              <div className="w-1/3 font-medium  p-3 border-r border-solid border-1 border-gray-300 text-center">
                <HidePrivacyPopup
                  title={t("kk2")}
                  privacyPolicyText={t("kk2")}
                  content={
                    lang === "tr"
                      ? privacyPolicyContent
                      : privacyPolicyContentEN
                  }
                />
              </div>
              <div className="w-1/3 font-medium  p-3 text-center">
                <HidePrivacyPopup
                  textColor="#7424ff"
                  title={t("kk3")}
                  privacyPolicyText={t("kk3")}
                  content={
                    lang === "tr" ? termsPolicyContent : termsPolicyContentEN
                  }
                />
              </div> */}
                </div>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-black">
                {t("links.tedaviler")}
              </h2>
              <ul className="font-normal text-sm text-gray-500">
                <li className="mb-2">
                  <Link
                    href={
                      "/tedavi/en-online-examination-tr-online-gorus" as any
                    }
                    className=""
                  >
                    {t("links.onlinegorusme")}
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href={"/tedavi/klinikte-gorus" as any} className="">
                    {t("links.kliniktegorusme")}
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href={
                      "/tedavi/en-inoffice-bleaching-tr-klinikte-dis-beyazlatma" as any
                    }
                    className=""
                  >
                    {t("links.disbeyazlatma")}
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href={
                      "/tedavi/en-scaling-tr-dis-tasi-temizligi-cila" as any
                    }
                    className=""
                  >
                    {t("links.displaktemizlik")}
                  </Link>
                </li>
                {/* <li className="mb-2">
                  <Link href="/tedavi/kanal-tedavisi" className="">{t('links.kanaltedavisi')}</Link>
                </li> */}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-black">
                {t("links.disklinikleri")}
              </h2>
              <ul className="font-normal text-sm text-gray-500">
                <li className="mb-2">
                  <Link
                    href={"/klinikler/tumu/istanbul-avrupa" as any}
                    className=""
                  >
                    {t("links.istanbuldis")}
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href={"/klinikler/tumu/ankara" as any} className="">
                    {t("links.ankaradis")}
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href={"/klinikler/tumu/izmir" as any} className="">
                    {t("links.izmirdis")}
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href={"/klinikler/tumu/bursa" as any} className="">
                    {t("links.bursadis")}
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href={"/klinikler/tumu/antalya" as any} className="">
                    {t("links.antalyadis")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-col gap-3 hidden md:flex">
              <Link
                target="_blank"
                rel="noopener"
                href={"tel:02167062122" as any}
                className="w-full flex justify-start md:justify-center"
              >
                <div className="w-full max-w-[167px] h-[40px] rounded-[48px] p-3 bg-[#7626FF] flex gap-2 items-center justify-center">
                  <CallCenter className="w-6 h-6 shrink-0 text-white" />
                  <span className="text-white text-xs font-semibold">
                    0216 706 21 22
                  </span>
                </div>
              </Link>
              <Link
                target="_blank"
                rel="noopener"
                href={"https://api.whatsapp.com/send?phone=905385921578" as any}
                className="w-full flex justify-end md:justify-center"
              >
                <div className="w-full max-w-[167px] rounded-[48px] px-3 py-2 bg-[#25D366] flex gap-2 items-center justify-center">
                  <WhatsappIcon className="w-6 h-6 shrink-0 text-white" />
                  <span className="text-white text-xs font-semibold">
                    {t("whatsapp")}
                  </span>
                </div>
              </Link>

              {/* <div className="mx-auto flex flex-col mb-10 items-end  py-1 gap-6">
            <Link
              href={"tel:02167062122" as any}
            >
              <div className="wp-support-main">
                <PhoneCallIcon />
                <div className="wp-sp-text">0216 706 21 22</div>
              </div>
            </Link>
          </div> */}
            </div>
          </div>
        </div>

        <div className="flex px-4 md:hidden ">
          <div className="w-full flex gap-4 justify-center items-center">
            <Link
              target="_blank"
              rel="noopener"
              href={"tel:02167062122" as any}
              className="w-full flex justify-center items-center"
            >
              <div className="w-full max-w-[167px] h-[40px] rounded-[48px] p-3 bg-[#7626FF] flex gap-2 items-center justify-center">
                <CallCenter className="w-6 h-6 shrink-0 text-white" />
                <span className="text-white text-xs font-semibold">
                  0216 706 21 22
                </span>
              </div>
            </Link>
            <Link
              target="_blank"
              rel="noopener"
              href={"https://api.whatsapp.com/send?phone=905385921578" as any}
              className="w-full flex md:justify-center items-center justify-center"
            >
              <div className="w-full max-w-[167px] rounded-[48px] px-3 py-2 bg-[#25D366] flex gap-2 items-center justify-center">
                <WhatsappIcon className="w-6 h-6 shrink-0 text-white" />
                <span className="text-white text-xs font-semibold">
                  {t("whatsapp")}
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className=" w-full px-6 gap-6 flex mt-4">
          <div className="text-gray-500 text-sm flex justify-center items-center w-full">
            <div>© {currentYear} distedavim.com</div>
          </div>
        </div>

        <div className="max-w-5xl w-full mx-auto p-6 gap-6 flex justify-between">
          <UsbsFooter lang={lang} />
        </div>
        <div className="max-w-5xl w-full mx-auto p-6 gap-6 flex justify-between">
          {lang === "en" ? (
            <div className="text-gray-500 text-sm mb-2 mt-5 px-5">
              <b>distedavim.com</b> provides information to help find the most
              suitable dental clinic. All content is intended for patient
              information purposes and is provided free of charge. The most
              accurate information will be obtained only after the physician
              examines the patient.
            </div>
          ) : (
            <div className="text-gray-500 text-sm mb-2 mt-5 px-5">
              <b>distedavim.com</b> ile en uygun diş kliniği bulun. Tüm içerik
              hastaları bilgilendirme amaçlıdır ve ücretsiz sunulmaktadır. En
              doğru bilgiler ancak hekimin hastayı muayene etmesi sonrası
              oluşacaktır.
            </div>
          )}
        </div>
      </div>
      <div className="w-full">{/* TODO: add SEO data */}</div>
    </div>
  );
}
