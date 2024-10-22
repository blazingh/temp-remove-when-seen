'use client'
import { Button } from "@/components/ui/button";
import Calendar from "@/icons/calendar";
import IconHeart from "@/icons/heart";
import IconReviw from "@/icons/reviewIcon";
import AskIcon from "@/icons/askBalloon";
import { signOut, } from "next-auth/react";
import { useRouter } from "@/navigation";

import ExitIcon from "@/icons/exit"
import EggHeadIcon from "@/icons/eggHead";
import IconChevron from "@/icons/chevron";
import { Locale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";
import SITEROUTES from "@/constants/site_routes";
import { BreadCrumbs } from "@/components/layout/breadCrumb";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";

export default function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {

  const t = useTranslations("pages.Profile") as any;
  const router = useRouter();


  return (
    <div>
      <BreadCrumbs pageTile={ROUTES.userPage.title[lang]} lang={lang} />
      <div className="flex flex-col gap-6 mt-4">
        {/* clinics list */}
        <div className="flex flex-col gap-4">
          {/* <Link href={SITEROUTES.userAppointments}>
            <Button
              variant={"outlineThin"}
              className="font-semibold flex justify-start gap-4 relative w-full h-[72px]"
            >
              <Calendar />
              {t("appointments")}
              <IconChevron className="w-6 h-6 -rotate-90 absolute right-4" />
            </Button>
          </Link> */}

          <Link href={SITEROUTES.userNotes}>
            <Button
              variant={"outlineThin"}
              className="font-semibold flex justify-start gap-4 relative w-full h-[72px]"
            >
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3V5M12 3V5M15 3V5M13 9H9M15 13H9M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V7.2C19 6.0799 19 5.51984 18.782 5.09202C18.5903 4.71569 18.2843 4.40973 17.908 4.21799C17.4802 4 16.9201 4 15.8 4H8.2C7.0799 4 6.51984 4 6.09202 4.21799C5.71569 4.40973 5.40973 4.71569 5.21799 5.09202C5 5.51984 5 6.07989 5 7.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21Z"
                  stroke="#000000"
                  strokeWidth="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("notes")}
              <IconChevron className="w-6 h-6 -rotate-90 absolute right-4" />
            </Button>
          </Link>

          <Link href={SITEROUTES.userFiles}>
            <Button
              variant={"outlineThin"}
              className="font-semibold flex justify-start gap-4 relative w-full h-[72px]"
            >
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 7H8.2C7.0799 7 6.51984 7 6.09202 7.21799C5.71569 7.40973 5.40973 7.71569 5.21799 8.09202C5 8.51984 5 9.0799 5 10.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H11.8C12.9201 21 13.4802 21 13.908 20.782C14.2843 20.5903 14.5903 20.2843 14.782 19.908C15 19.4802 15 18.9201 15 17.8V17M19 8V13.8C19 14.9201 19 15.4802 18.782 15.908C18.5903 16.2843 18.2843 16.5903 17.908 16.782C17.4802 17 16.9201 17 15.8 17H12.2C11.0799 17 10.5198 17 10.092 16.782C9.71569 16.5903 9.40973 16.2843 9.21799 15.908C9 15.4802 9 14.9201 9 13.8V6.2C9 5.0799 9 4.51984 9.21799 4.09202C9.40973 3.71569 9.71569 3.40973 10.092 3.21799C10.5198 3 11.0799 3 12.2 3H14M19 8L14 3M19 8H15.6C15.0399 8 14.7599 8 14.546 7.89101C14.3578 7.79513 14.2049 7.64215 14.109 7.45399C14 7.24008 14 6.96005 14 6.4V3"
                  stroke="#000000"
                  strokeWidth="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("files")}
              <IconChevron className="w-6 h-6 -rotate-90 absolute right-4" />
            </Button>
          </Link>

          {/* <Link href={SITEROUTES.userFavorites}>
            <Button
              variant={"outlineThin"}
              className="font-semibold flex justify-start gap-4 relative w-full h-[72px]"
            >
              <IconHeart />
              {t("favourites")}
              <IconChevron className="w-6 h-6 -rotate-90 absolute right-4" />
            </Button>
          </Link> */}

          <Link href={SITEROUTES.userReviews}>
            <Button
              variant={"outlineThin"}
              className="font-semibold flex justify-start gap-4 relative w-full h-[72px]"
            >
              <IconReviw />
              {t("reviews")}
              <IconChevron className="w-6 h-6 -rotate-90 absolute right-4" />
            </Button>
          </Link>

          <Link href={SITEROUTES.userQuestions}>
            <Button
              variant={"outlineThin"}
              className="font-semibold flex justify-start gap-4 relative w-full h-[72px]"
            >
              <AskIcon />
              {t("questions")}
              <IconChevron className="w-6 h-6 -rotate-90 absolute right-4" />
            </Button>
          </Link>

          <Link href={SITEROUTES.userProfile}>
            <Button
              variant={"outlineThin"}
              className="font-semibold flex justify-start gap-4 relative w-full h-[72px]"
            >
              <EggHeadIcon />
              {t("about")}
              <IconChevron className="w-6 h-6 -rotate-90 absolute right-4" />
            </Button>
          </Link>
          <Link href={SITEROUTES.login}>
            <Button
              variant={"outlineThin"}
              className="font-semibold flex justify-start gap-4 relative w-full h-[72px]"
              onClick={async () => {
                await signOut({ redirect: false });
                router.refresh();
              }}

            >
              <ExitIcon />
              {t("logout")}
              <IconChevron className="w-6 h-6 -rotate-90 absolute right-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div >
  );
}
