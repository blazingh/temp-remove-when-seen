import IconLogoPrimary from "@/icons/logo-primary";
import IconSearch from "@/icons/search";
import IconMenu from "@/icons/menu";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import SITEROUTES from "@/constants/site_routes";
import SITE_INFO from "@/constants/site_info";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";
import RightMenuSheetContent from "@/components/sheets/rightMenu";
import IconProfileFilled from "@/icons/profileFilled";
import IconProfile from "@/icons/profile";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import IconHeart from "@/icons/heart";
import IconCalendar from "@/icons/calendar";
import IconQuestion from "@/icons/question";
import IconLanguageEn from "@/icons/enLanguage";
import IconLanguageTr from "@/icons/trLanguages";
import SearchComboBox, {
  DesktopSearchCombobox,
} from "@/components/search-combobox";

export default async function Header() {
  const t = await getTranslations("layout.Header");

  const session = await getServerSession(authOptions);
  const lang = await getLocale();

  return (
    <div className="w-full fixed top-0 bg-white z-30">
      <div className="max-w-5xl mx-auto h-full flex items-center justify-between p-4 gap-4">
        <div className="logo relative">
          <Link href={SITEROUTES.home} aria-label="home">
            <IconLogoPrimary className="text-[#7334e0] w-[182px]" />
          </Link>
        </div>
        <div className="w-[354px] hidden md:block">
          <DesktopSearchCombobox />
        </div>
        <div className="flex items-center gap-8 [&_svg]:h-[22px] [&_svg]:w-[22px] [&_svg]:shrink-0">
          <div className="items-center gap-8 hidden md:flex">
            <Link
              className="hover:text-primary underline text-[13px] font-semibold whitespace-nowrap"
              href={SITE_INFO.CLINIC_REGISTER_LINK as any}
            >
              {t("doctor_link")}
            </Link>
            {/* search trigger */}
            <SearchComboBox />
            <Link
              locale={lang === "tr" ? "en" : "tr"}
              href={{
                pathname: SITEROUTES.home,
              }}
            >
              {lang !== "tr" ? <IconLanguageTr /> : <IconLanguageEn />}
            </Link>
            <Link href={SITEROUTES.userFavorites}>
              <IconHeart />
            </Link>
            <Link href={SITEROUTES.userAppointments}>
              <IconCalendar />
            </Link>
            <Link href={SITEROUTES.help}>
              <IconQuestion />
            </Link>

            <Link href={session?.user ? SITEROUTES.userPage : SITEROUTES.login}>
              <IconProfile />
            </Link>
          </div>
          <div className="items-center gap-6 flex justify-center md:hidden">
            <SearchComboBox />
          </div>
          {/* right menu trigger */}
          <SheetContentTrigger
            aria-label="app menu"
            className="md:hidden"
            sheetProps={{
              side: "right",
              content: <RightMenuSheetContent />,
            }}
          >
            <IconMenu className="text-foreground" />
          </SheetContentTrigger>
        </div>
      </div>
    </div>
  );
}
