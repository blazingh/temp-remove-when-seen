"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import IconChevron from "@/icons/chevron";
import IconCurrency from "@/icons/currency";
import IconLanguage from "@/icons/language";
import IconPhone from "@/icons/phone";
import IconQuestion from "@/icons/question";
import {
  SheetClose,
  SheetCloseTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import { Ref, forwardRef, useContext } from "react";
import { SheetContext } from "@/contextPorviders/sheetContext";
import RegisterSheetTrigger from "./register";
import LoginSheetTrigger from "./login";
import { useLocale, useTranslations } from "next-intl";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n";
import { useRouter, Link, usePathname } from "@/navigation";
import HidePrivacyPopup from "@/components/ui/hidePrivacyPopup";

import privacyPolicyContent from "../forms/privacyPolicyText";
import privacyPolicyContentEN from "../forms/privacyPolicyTextEN";

import termsPolicyContent from "../forms/termsPolicyText";
import termsPolicyContentEN from "../forms/termsPolicyTextEN";
import SITEROUTES from "@/constants/site_routes";
import { useParams } from "next/navigation";
import SheetContentTrigger from "./sheet-content-trigger";
import LoginSheetContent from "./login";
import RegisterSheetContent from "./register";

export default function RightMenuSheetContent() {
  const { data: session } = useSession();

  const router = useRouter();

  const t = useTranslations("layout.right_menu") as any;
  const pathname = usePathname();
  const params = useParams();
  const lang = useLocale() as Locale;

  return (
    <div className="w-full h-full flex flex-col gap-10 relative">
      <SheetClose className="top-0 right-0" />
      {/* user info and actions */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="col-span-2">
          <p className="text-foreground font-bold text-xl">
            {session?.user?.name || `${t("welcome")}`}
          </p>
        </div>

        <Link
          href={SITEROUTES.userProfile}
          className={!session?.user ? "hidden" : ""}
        >
          <SheetCloseTrigger>
            <Button variant="outline" className="rounded-lg h-12 w-full">
              {t("profile")}
            </Button>
          </SheetCloseTrigger>
        </Link>

        <Button
          variant="outline"
          className={cn("rounded-lg h-12 w-full", !session?.user && "hidden")}
          onClick={async () => {
            await signOut({ redirect: false });
            router.refresh();
          }}
        >
          {t("logout")}
        </Button>

        <SheetContentTrigger
          variant="default"
          className={cn(session?.user && "hidden", "rounded-lg h-12 w-full")}
          sheetProps={{
            side: "right",
            content: <LoginSheetContent />,
          }}
        >
          {t("login")}
        </SheetContentTrigger>

        <SheetContentTrigger
          variant="default"
          className={cn(session?.user && "hidden", "rounded-lg h-12 w-full")}
          sheetProps={{
            side: "right",
            content: <RegisterSheetContent />,
          }}
        >
          {t("register")}
        </SheetContentTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="child" className="right-menu-item">
          <Link
            className="w-full flex"
            locale={lang === "tr" ? "en" : "tr"}
            href={{
              pathname: pathname as any,
              params: { ...params, options: [] },
            }}
          >
            <div className="font-semibold w-full text-foreground text-base flex items-start gap-4">
              <IconLanguage />
              {lang === "tr" ? "English" : "Türkçe"}
            </div>
            <IconChevron className="w-6 h-6 -rotate-90 text-border" />
          </Link>
        </Button>

        {/* <Button variant="child" className="right-menu-item" >
            <div className="font-semibold text-foreground text-base flex items-start gap-4">
              <IconCurrency />
              {t('currency')}
            </div>
            <IconChevron className="w-6 h-6 -rotate-90 text-border" />
          </Button> */}

        {/* { lang === 'tr' ? } */}

        {/* <Link className="right-menu-item" href='/account/help'>
            <div className="font-semibold text-foreground text-base flex items-start gap-4">
              <IconQuestion />
              English
            </div>
            <IconChevron className="w-6 h-6 -rotate-90 text-border" />
          </Link> */}
        <Link className="right-menu-item" href={SITEROUTES.help}>
          <div className="font-semibold text-foreground text-base flex items-start gap-4">
            <IconQuestion />
            {t("info")}
          </div>
          <IconChevron className="w-6 h-6 -rotate-90 text-border" />
        </Link>

        <a className="right-menu-item flex md:hidden"
          href="https://clinic.distedavim.com/tr">
          <div className="font-semibold text-foreground text-base flex items-start gap-4">
            <svg
              fill="#000000"
              height="26px"
              width="26px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.002 512.002"
            >
              <g>
                <g>
                  <path
                    d="M496.993,306.704l-50.809-50.809c-25.555-25.556-49.966-25.556-61.696-25.556H266.44v-61.59h30.795v30.795h123.179V107.16
                    H297.235v30.795H264.89c-6.26-30.717-30.875-54.82-61.843-60.363c-6.304-24.294-28.416-42.286-54.655-42.286
                    c-31.13,0-56.457,25.327-56.457,56.457s25.327,56.457,56.457,56.457c25.138,0,46.483-16.517,53.772-39.266
                    c19.306,5.536,33.48,23.337,33.48,44.399v76.987H134.24L87.941,184.04c-23.013-23.013-55.22-17.363-72.584,0
                    c-22.841,22.841-17.966,54.618,0,72.583l50.809,50.808c13.773,13.773,26.052,23.836,54.08,25.35
                    c14.762,17.907,33.236,32.811,53.842,43.339c19.389,9.906,40.036,15.858,61.557,17.773v52.008H107.333v30.795h143.709h159.107
                    v-66.201l-8.805-4.172c-1.005-0.475-25.038-11.823-72.038-30.896c19.255-10.055,36.611-23.922,50.745-40.5l44.359,44.359
                    c19.249,19.248,51.414,21.17,72.583,0C517.004,359.277,517.005,326.715,496.993,306.704z M328.03,137.955h61.59v30.795h-61.59
                    V137.955z M148.392,117.425c-14.15,0-25.662-11.512-25.662-25.662S134.242,66.1,148.392,66.1s25.662,11.512,25.662,25.662
                    S162.544,117.425,148.392,117.425z M379.355,430.127v15.775H266.44v-51.26c13.481,0.523,34.374,2.464,50.671,9.072
                    C347.524,416.045,368.452,425.223,379.355,430.127z M250.791,363.78c-32.3-0.056-62.657-11.003-86.966-30.793h174.433
                    C315.26,351.711,285.174,363.78,250.791,363.78z M475.218,357.513c-8.21,8.211-21.782,7.251-29.033,0l-55.32-55.32H127.863
                    c-23.385,0-29.258-5.874-39.921-16.536l-50.809-50.808c-9.07-9.07-7.015-22.018,0-29.033c8.724-8.724,21.846-7.189,29.034,0
                    l55.319,55.318h263.001c9.312,0,23.386,0,39.922,16.536l50.808,50.809C483.222,336.483,483.221,349.508,475.218,357.513z"
                  />
                </g>
              </g>
            </svg>
            {t("clinicRegisterRight")}
          </div>
          <IconChevron className="w-6 h-6 -rotate-90 text-border" />
        </a>

        {/* <Link className="right-menu-item" href='#'>
            <div className="font-semibold text-foreground text-base flex items-start gap-4"> 
              <IconPhone />
              {t('contact')}
            </div>
            <IconChevron className="w-6 h-6 -rotate-90 text-border" />
          </Link> */}
        <div className="absolute left-0 bottom-0 w-full">
          <div className="flex text-sm border-t border-solid border-1 items-center justify-between">
            <div className="w-1/3 font-medium  p-3 border-r border-solid border-1 border-gray-300 text-center">
              <HidePrivacyPopup
                title={t("kk1")}
                privacyPolicyText={t("kk1")}
                content={
                  lang === "tr" ? privacyPolicyContent : privacyPolicyContentEN
                }
              />
            </div>
            <div className="w-1/3 font-medium  p-3 border-r border-solid border-1 border-gray-300 text-center">
              <HidePrivacyPopup
                title={t("kk2")}
                privacyPolicyText={t("kk2")}
                content={
                  lang === "tr" ? privacyPolicyContent : privacyPolicyContentEN
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
            </div>
          </div>
          <div className="w-full flex text-center text-sm border-t border-solid bg-[#e4e4e4] border-1 border-gray-300">
            <div className="w-full p-3 font-medium">
              <div>{t("distedavimAs")}</div>
              <p className="text-gray-500 text-xs font-light">
                {t("distedavimAsReserved")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
