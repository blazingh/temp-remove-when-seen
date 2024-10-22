import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { ROUTES } from "@/constants/routes";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { ElementType, ReactNode, Suspense } from "react";
import FeaturedClinicsList, {
  FeaturedClinicsListSkeleton,
} from "@/server-components/featured-clinics";
import FeaturedDentistsList, {
  FeaturedDentistsListSkeleton,
} from "@/server-components/featured-dentists";
import FeaturedTreatmentsList, {
  FeaturedTreatmentsListSkeleton,
} from "@/server-components/featured-treatments";
import FeaturedBlogsList from "@/server-components/featured-blogs";

import QuickClinicFilters, {
  QuickClinicFiltersSkeleton,
} from "@/server-components/quick-clinic-filters";
import FeaturedReviewsList, {
  FeaturedReviewsListSkeleton,
} from "@/server-components/featured-reviews";
import { pick } from "lodash";
import SITEROUTES from "@/constants/site_routes";
import { Link } from "@/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconClinic from "@/icons/clinic";
import IconMoon from "@/icons/moonIcon";
import IconBear from "@/icons/bear";
import IconCalendar from "@/icons/calendar";
import IconFree from "@/icons/freeTL";
import IconCreditCard from "@/icons/creditCard";
import IconChild from "@/icons/child";
import FeaturedKidsClinicsList from "@/server-components/featured-kids-clinics";
import EmergentClinicButton from "@/components/emergent-clinics-button";
import IconChevronEmergency from "@/icons/chevronEmergency";
import KidsClinicsButton from "@/components/kids-clinics-button";
import { NextIntlClientProvider } from "next-intl";
import LandingPageHeaderImage from "@/components/pages/main_page/header-image";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";
import ReviewsSheetContent from "@/components/sheets/homeReviews";
import SpecialPopup from "@/components/pages/clinic/popup";

export default async function Home({
  params: { lang = "tr" },
}: {
  params: { lang: Locale };
}) {
  unstable_setRequestLocale(lang);

  const t = await getTranslations("pages.home");
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      messages={pick(messages, [
        "components.clientLocation",
        "forms.Clinic_Filter",
        "components.clientLocation",
      ])}
    >
      <SpecialPopup itemKey="main-page" isHome={true} />
      <div>
        <div className="flex flex-col w-full bg-background mx-auto md:p-0 mb-4">
          <LandingPageHeaderImage lang={lang} />
        </div>
        <div className="flex flex-col gap-6 max-w-5xl mx-auto bg-background md:px-4">
          <div className="md:mt-[-50px] md:bg-white md:z-20 md:rounded-lg md:border-2 md:p-2 md:border-primary block md:sticky md:top-[64px]">
            <Suspense fallback={<QuickClinicFiltersSkeleton />}>
              <QuickClinicFilters />
            </Suspense>
          </div>

          {/* featured clinics tabs */}
          <Tabs defaultValue="clinics" className="w-full">
            <TabsList className=" md:w-2/3 h-max p-0 border-b bg-background flex items-start">
              <TabsTrigger
                value="clinics"
                className="w-full group flex flex-col gap-3 py-0"
              >
                <div className="flex flex-col md:flex-row md:justify-center items-center w-full gap-1 p-2">
                  <IconClinic className="w-[28px] h-[28px] shrink-0" />
                  <span className="font-semibold text-sm">{"Klinikler"}</span>
                </div>
                <div className="bg-background rounded-t h-1 w-full group-data-[state=active]:bg-primary "></div>
              </TabsTrigger>

              <TabsTrigger
                value="kids"
                className="group w-full flex flex-col gap-3 py-0"
              >
                <div className="flex md:flex-row md:justify-center flex-col items-center w-full gap-1 p-2">
                  <IconChild className="w-[28px] h-[28px] shrink-0" />
                  <span className="font-semibold text-md">
                    {t("button_group.kids_clinics")}
                  </span>
                </div>
                <div className="bg-background rounded-t h-1 w-full group-data-[state=active]:bg-primary "></div>
              </TabsTrigger>

              <TabsTrigger value="clinics" className="py-0" asChild>
                <div className="w-full">
                  <EmergentClinicButton
                    variant={"outlineThin"}
                    className="p-2 flex flex-col gap-1 h-max md:flex-row md:justify-center"
                  >
                    <div className="flex w-full items-center justify-center relative">
                      <IconMoon className="w-[28px] h-[28px] text-[#DB0D15]" />
                      <IconChevronEmergency
                        className={"text-[#DB0D15] absolute right-0 md:hidden"}
                      />
                    </div>
                    <span className="font-semibold text-sm">
                      {t("emergency_button")}
                    </span>
                    <div className=" w-full items-center justify-center relative hidden md:block">
                      <IconChevronEmergency className={"text-[#DB0D15]"} />
                    </div>
                  </EmergentClinicButton>
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="clinics">
              <div className="flex flex-col gap-4 max-w-5xl mx-auto">
                <Suspense fallback={<FeaturedClinicsListSkeleton />}>
                  <FeaturedClinicsList />
                </Suspense>
                <Link
                  className="w-full"
                  href={{
                    pathname: SITEROUTES.clinicsList,
                    params: { options: [] },
                  }}
                >
                  <Button
                    className="w-full border-primary text-lg font-semibold text-primary md:rounded-md"
                    variant={"outline"}
                  >
                    {t("all_clinics")}
                  </Button>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="kids">
              <div className="flex flex-col gap-4">
                <Suspense fallback={<FeaturedClinicsListSkeleton />}>
                  <FeaturedKidsClinicsList />
                </Suspense>
                <Link
                  className="w-full"
                  href={{
                    pathname: SITEROUTES.clinicsList,
                    params: { options: [] },
                    query: {
                      dentist_branch_id: "5",
                    },
                  }}
                >
                  <Button
                    className="w-full border-primary text-lg font-semibold text-primary rounded-md"
                    variant={"outline"}
                  >
                    {t("all_kids_clinics")}
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>

          {/* benifits section */}
          <div className="flex flex-col gap-4 md:hidden">
            <div className="flex flex-col gap-2 w-full">
              <h2 className="text-2xl font-bold">
                {t("benefits_section.title2")}
              </h2>
              {[
                {
                  text: t("benefits_section.benefits_list.benefit_4"),
                  icon: <IconClinic className="w-[28px] h-[28px] " />,
                },
                {
                  text: t("benefits_section.benefits_list.benefit_5"),
                  icon: (
                    <IconCalendar className="w-[22px] h-[22px] text-foreground flex-shrink-0" />
                  ),
                },
                {
                  text: t("benefits_section.benefits_list.benefit_6"),
                  icon: (
                    <IconFree className="w-[22px] h-[22px] text-foreground flex-shrink-0" />
                  ),
                },
                {
                  text: t("benefits_section.benefits_list.benefit_7"),
                  icon: (
                    <IconCreditCard className="w-[22px] h-[22px] text-foreground flex-shrink-0" />
                  ),
                },
              ].map((item) => (
                <div className="flex items-center gap-3" key={item.text}>
                  {item.icon}
                  <p className="text-base text-text-dark pt-2">{item.text}</p>
                </div>
              ))}
            </div>

            <Link
              className="w-full"
              href={{
                pathname: SITEROUTES.clinicsList,
                params: { options: [] },
              }}
            >
              <Button className="w-full font-semibold " variant={"default"}>
                {t("take_appointments")}
              </Button>
            </Link>
          </div>

          <div className="flex-col gap-4 hidden md:flex">
            <div className="flex flex-col gap-2 w-full">
              <div>
                <h2 className="text-2xl font-bold">
                  {t("benefits_section.title2")}
                </h2>
              </div>
              <div className="flex flex-row gap-4 w-full">
                {[
                  {
                    text: t("benefits_section.benefits_list.benefit_4"),
                    icon: <IconClinic className="w-[28px] h-[28px] " />,
                  },
                  {
                    text: t("benefits_section.benefits_list.benefit_5"),
                    icon: (
                      <IconCalendar className="w-[22px] h-[22px] text-foreground flex-shrink-0" />
                    ),
                  },
                  {
                    text: t("benefits_section.benefits_list.benefit_6"),
                    icon: (
                      <IconFree className="w-[22px] h-[22px] text-foreground flex-shrink-0" />
                    ),
                  },
                  {
                    text: t("benefits_section.benefits_list.benefit_7"),
                    icon: (
                      <IconCreditCard className="w-[22px] h-[22px] text-foreground flex-shrink-0" />
                    ),
                  },
                ].map((item) => (
                  <div
                    className="flex items-center gap-3 border border-[#E5E5E5] w-1/4 px-auto py-2 rounded-md justify-center"
                    key={item.text}
                  >
                    <div className="flex flex-row items-center gap-2 justify-center lg:px-8 md:px-8">
                      <span>{item.icon}</span>
                      <p className="text-base text-text-dark pt-2 line font-medium">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* emergency button */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">
              {t("emergency_clinics.title")}
            </h2>
            <div className="p-4 bg-destructive rounded-xl flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-6">
              <div className="flex gap-3 items-center">
                <IconMoon className="w-[32px] lg:w-[46px] h-[32px] lg:h-[46px] flex-shrink-0 text-destructive-foreground" />
                <p className="font-medium text-base lg:text-[22px]">
                  {t("emergency_clinics.text_upper")}
                  <br />
                  {t("emergency_clinics.text")}
                </p>
              </div>
              <EmergentClinicButton
                variant={"destructive"}
                className="w-full lg:max-w-md bg-destructive-foreground hover:bg-destructive-foreground hover:opacity-90 text-white font-semibold"
              >
                {t("closest_clinic")}
              </EmergentClinicButton>
            </div>
          </div>

          {/* featured dentists section */}
          <SectionWithLink
            href={{
              pathname: SITEROUTES.dentistsList,
              params: { options: [] },
            }}
            title={ROUTES.dentistList.title[lang]}
          >
            <Suspense fallback={<FeaturedDentistsListSkeleton />}>
              <FeaturedDentistsList />
            </Suspense>
          </SectionWithLink>

          {/* benifits section */}
          <div className="w-full  flex-col gap-4  rounded-2xl hidden md:flex">
            <h2 className="text-2xl font-bold">
              {lang === "tr"
                ? "6 Adımda Özgürce Gülümse"
                : "Smile Freely in 6 Steps"}
            </h2>
            <div className="flex gap-6 ">
              <div className="w-full pb-4 flex flex-row gap-3">
                {[
                  {
                    text: t("six_step_smile.guide_0"),
                    icon: <IconClinic className="w-[32px] h-[32px] " />,
                  },
                  {
                    text: t("six_step_smile.guide_1"),
                    icon: (
                      <IconCalendar className="w-[32px] h-[32px] text-foreground flex-shrink-0" />
                    ),
                  },
                  {
                    text: t("six_step_smile.guide_2"),
                    icon: (
                      <IconFree className="w-[32px] h-[32px] text-foreground flex-shrink-0" />
                    ),
                  },
                  {
                    text: t("six_step_smile.guide_3"),
                    icon: (
                      <IconCreditCard className="w-[32px] h-[32px] text-foreground flex-shrink-0" />
                    ),
                  },
                  {
                    text: t("six_step_smile.guide_4"),
                    icon: (
                      <IconFree className="w-[32px] h-[32px] text-foreground flex-shrink-0" />
                    ),
                  },
                  {
                    text: t("six_step_smile.guide_5"),
                    icon: (
                      <IconCreditCard className="w-[32px] h-[32px] text-foreground flex-shrink-0" />
                    ),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col gap-1.5 items-center bg-[#F8F6FF] px-4 py-6 w-1/6 rounded-lg"
                  >
                    <div className="w-8 h-8 text-black p-2 font-semibold text-base rounded-full border border-black border-2  flex items-center justify-center">
                      {index + 1}
                    </div>
                    <p
                      className="text-sm font-medium text-text-dark text-[#1F0251] justify-center items-center text-center flex"
                      style={{ lineHeight: "18px" }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full bg-[#F8F6FF] p-[16px] flex flex-col gap-4 border-[#F5F5F5] border rounded-2xl md:hidden">
            <div className="flex gap-6 ">
              <div className="w-[84px] flex flex-col items-center">
                <span className="w-[84px] text-[144px] leading-[124px] font-semibold justify-center flex text-[#1F0251]">
                  6
                </span>
                <span className="text-lg font-bold text-center text-[#1F0251]">
                  {t("six_step_smile.title")}
                </span>
              </div>
              <div className="w-full pb-4 flex flex-col gap-3">
                {[
                  "six_step_smile.guide_0",
                  "six_step_smile.guide_1",
                  "six_step_smile.guide_2",
                  "six_step_smile.guide_3",
                  "six_step_smile.guide_4",
                  "six_step_smile.guide_5",
                ].map((item, index) => (
                  <div key="{index}" className="flex gap-1.5 items-center">
                    <div className="flex w-[24px] h-[24px] rounded-full  items-center justify-center border-2 border-[#1F0251]">
                      <span className="text-[#1F0251] font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-text-dark whitespace-nowrap text-[#1F0251]">
                      {t(item as any)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <Link
                className="w-full"
                href={{
                  pathname: SITEROUTES.clinicsList,
                  params: { options: [] },
                }}
              >
                <Button className="w-full bg-primary">
                  <span className="text-white font-bold font-poppins text-md">
                    {t("take_appointments")}
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Çocuk Diş Klinik Buton */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{t("child_clinics.title")}</h2>
            <div className="p-4 bg-[#EFF5FF] rounded-xl flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-6">
              <div className="flex gap-3 items-center">
                <IconBear className="w-[30px] lg:w-[40px] h-[40px] lg:h-[46px] flex-shrink-0 text-[#F40082]" />
                <p className="font-medium text-base lg:text-[22px]">
                  {t("child_clinics.text_upper")}
                  <br />
                  {t("child_clinics.text")}
                </p>
              </div>
              <KidsClinicsButton
                variant={"default"}
                className="w-full lg:max-w-md bg-[#56A5FF] hover:bg-[#56A5FF]/90 text-white font-semibold"
              >
                {t("child_clinics.button_text")}
              </KidsClinicsButton>
            </div>
          </div>

          {/* featured treatments section */}
          <SectionWithLink
            href={{
              pathname: SITEROUTES.treatmentsList,
              params: { options: [] },
            }}
            title={t("smile_guide")}
          >
            <Suspense fallback={<FeaturedTreatmentsListSkeleton />}>
              <FeaturedTreatmentsList />
            </Suspense>
          </SectionWithLink>

          {/* featured reviews section */}
          <SectionWithLink
            title={t("reviews_section.title")}
            linkButton={
              <SheetContentTrigger
                sheetProps={{
                  side: "bottom",
                  title: t("reviews_section.all"),
                  content: <ReviewsSheetContent />,
                }}
              >
                <span className="text-sm  font-semibold">
                  {t("view_all_button")}
                </span>
              </SheetContentTrigger>
            }
          >
            <Suspense fallback={<FeaturedReviewsListSkeleton />}>
              <FeaturedReviewsList lang={lang} />
            </Suspense>
          </SectionWithLink>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}

async function SectionWithLink({
  title,
  href,
  children,
  linkButton,
}: {
  title: string;
  href?: any;
  children: React.ReactNode;
  linkButton?: React.ReactNode;
}) {
  const t = await getTranslations("pages.home");

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold">{title}</h2>
        {linkButton && linkButton}
        {href && (
          <Link href={href as any} className="text-sm  font-semibold">
            {t("view_all_button")}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

async function ButtonWithIconAndDescription({
  title,
  textUpper,
  text,
  buttonText,
  buttonColor,
  backgroundColor,
  children,
  Icon,
}: {
  title: string;
  textUpper: string;
  text: string;
  buttonText: string;
  buttonColor: string;
  backgroundColor: string;
  children: ReactNode;
  Icon: ElementType;
}) {
  const t = await getTranslations("pages.home");

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div style={{ backgroundColor }} className="w-full p-4 rounded-2xl">
        <div className="w-full flex items-center justify-center pb-4">
          <div>
            <Icon
              style={{ color: buttonColor }}
              className="w-[34px] h-[34px] flex-shrink-0"
            />
          </div>
          <div className="ml-2 md:flex w-full">
            <div>
              <span className="text-base md:text-lg">{textUpper}</span>
            </div>
            <div>
              <span className="text-base md:text-lg">{text}</span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
