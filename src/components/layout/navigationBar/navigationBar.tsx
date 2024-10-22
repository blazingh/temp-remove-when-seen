"use client";

import IconHome from "@/icons/home";
import IconHomeFilled from "@/icons/homeFilled";
import IconQuestion from "@/icons/question";
import IconQuestionFilled from "@/icons/questionFilled";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/navigation";
import { useParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Locale } from "@/i18n";
import IconHeart from "@/icons/heart";
import IconHeartFilled from "@/icons/heartFilled";
import IconCalendar from "@/icons/calendar";
import IconCalendarFilled from "@/icons/calendarFilled";
import IconProfile from "@/icons/profile";
import IconProfileFilled from "@/icons/profileFilled";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import SITEROUTES from "@/constants/site_routes";

export default function NavigationBar({ className }: { className?: string }) {
  const { data: session } = useSession();
  const path = usePathname();
  const params = useParams();
  const lang: Locale = (params.lang as Locale) || "tr";

  const t = useTranslations("layout.bottom_menu") as any;

  // if (!session) {
  //   return null;
  // }

  return (
    <div
      className={cn(
        " fixed bottom-0 left-1/2 w-full transform -translate-x-1/2 shadow-[0_0_4px_0_rgba(0,0,0,0.11)] z-50 bg-white md:hidden",
        className,
      )}
    >
      <div className="max-w-5xl mx-auto h-full flex items-center justify-between md:justify-around py-3">
        {/* home link */}
        <Link
          className="grid gap-1.5 justify-items-center w-full"
          href={SITEROUTES.home}
        >
          {path === SITEROUTES.home ? (
            <IconHomeFilled className="text-primary" />
          ) : (
            <IconHome />
          )}
          <p className="text-[9px] font-semibold">{t("home")}</p>
        </Link>

        {/* favorites link */}
        <Link
          className="grid gap-1.5 justify-items-center w-full"
          href={SITEROUTES.userFavorites}
        >
          {path === SITEROUTES.userFavorites ? (
            <IconHeartFilled className="text-primary" />
          ) : (
            <IconHeart />
          )}
          <p className="text-[9px] font-semibold">{t("favorite")}</p>
        </Link>

        {/* appointments link */}
        <Link
          className="grid gap-1.5 justify-items-center w-full"
          href={SITEROUTES.userAppointments}
        >
          {path === SITEROUTES.userAppointments ? (
            <IconCalendarFilled className="text-primary" />
          ) : (
            <IconCalendar />
          )}
          <p className="text-[9px] font-semibold">{t("appointment")}</p>
        </Link>

        {/* help link */}
        <Link
          className="grid gap-1.5 justify-items-center w-full"
          href={SITEROUTES.help}
        >
          {path === "/help" ? (
            <IconQuestionFilled className="text-primary" />
          ) : (
            <IconQuestion />
          )}
          <p className="text-[9px] font-semibold">{t("help")}</p>
        </Link>

        {/* profile link */}
        <Link
          className="grid gap-1.5 justify-items-center w-full"
          href={session?.user ? SITEROUTES.userPage : SITEROUTES.login}
        >
          {path === SITEROUTES.userPage ? (
            <IconProfileFilled className="text-primary" />
          ) : (
            <IconProfile />
          )}
          <p className="text-[9px] font-semibold">{t("profile")}</p>
        </Link>
      </div>
    </div>
  );
}
