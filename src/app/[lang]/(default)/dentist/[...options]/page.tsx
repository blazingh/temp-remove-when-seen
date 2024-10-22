import { Locale } from "@/i18n";
import ReviewSection from "@/components/reviewSection";
import DoctorCardDetail from "@/components/cards/doctor/doctorCardDetail";
import ShareAndFavoriteButtonGroup from "@/components/shareAndFavoriteButtonGroup";
import { MapCardWithContent } from "@/components/cards/maps/mapWithContent";
import { getDentistDetail, getDentistsTreatmentsFees } from "./actions";
import { notFound } from "next/navigation";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import IconChevron from "@/icons/chevron";
import IconCreditCard from "@/icons/creditCard";
import IconWallet from "@/icons/walletIcon";
import { QandAanswer, QandAmessage } from "@/components/q_and_a";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LoginSheetTrigger from "@/components/sheets/login";
import { Link } from "@/navigation";
import InstagramEmbed from "@/components/instagramEmbed";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
import AboutSheetContent from "@/components/pages/clinic/aboutClinic";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";
import QandAFormSheetContent from "@/components/sheets/QandAForm";
import { QandASheetContent } from "@/components/sheets/QandA";
import QuickAppointmentSheetContent from "@/components/sheets/AppointmentBooking";
import LoginSheetContent from "@/components/sheets/login";
type ParamsProps = {
  lang: Locale;
  options: string[];
};

type PageProps = {
  params: ParamsProps;
};

export const revalidate = 0;

export default async function Page({ params: { lang, options } }: PageProps) {
  unstable_setRequestLocale(lang);
  const session = await getServerSession(authOptions);
  const messages = await getMessages();

  // fetching all data at once
  const allData = await Promise.allSettled([
    getDentistDetail({ url: options.join("/") }),
    getDentistsTreatmentsFees({ url: options.join("/") }),
  ]);

  const dentistData =
    allData[0].status === "fulfilled" ? allData[0].value : null;
  const treatmentsFees =
    allData[1].status === "fulfilled" ? allData[1].value : null;
  if (!dentistData) notFound();
  const data = {
    nearest_available_date: dentistData.nearest_available_date,
    ...dentistData.dentist,
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        {/* doctor detail card */}
        <DoctorCardDetail lang={lang} item={data} />

        {/* share and add favorite button group */}
        <ShareAndFavoriteButtonGroup
          lang={lang}
          subjectId={dentistData.dentist.id}
          subjectType="dentist"
        />

        {/* doctor review section */}
        {dentistData.dentistReview?.length > 0 && (
          <ReviewSection
            lang={lang}
            reviews={dentistData.dentistReview}
            reviewRating={dentistData.dentist.review_rating}
            reviewScore={dentistData.dentist.review_count}
          />
        )}

        {/* map card */}
        {dentistData.dentist.clinics_lat !== null && (
          <Link
            className="z-0"
            href={
              ("https://www.google.com/maps/dir//" +
                dentistData.dentist.clinics_lat +
                ",+" +
                dentistData.dentist.clinics_lng +
                "/@" +
                dentistData.dentist.clinics_lat +
                "," +
                dentistData.dentist.clinics_lng +
                "z") as any
            }
          >
            <MapCardWithContent
              position={[
                dentistData.dentist.clinics_lat,
                dentistData.dentist.clinics_lng,
              ]}
            >
              <div className="flex flex-col gap-2">
                <p className="font-semibold">
                  {dentistData.dentist.clinics_name}
                </p>
                <p className="text-sm">{dentistData.dentist.branches[lang]}</p>
                <p className="text-xs font-light">
                  {dentistData.dentist.clinics_address}
                </p>
              </div>
            </MapCardWithContent>
          </Link>
        )}

        {/* ask doctor message box */}
        <ItemCard
          title={lang === "tr" ? "Hekime Sor" : "Ask the doctor"}
          content={
            dentistData.dentistAskQuestion?.length < 1 ? (
              session?.user ? (
                <SheetContentTrigger
                  variant={"default"}
                  className="w-full"
                  sheetProps={{
                    side: "bottom",
                    title: `${lang === "tr" ? "Hekime Sor" : "Ask the Doctor"}`,
                    content: (
                      <QandAFormSheetContent
                        dentistData={dentistData.dentist}
                      />
                    ),
                  }}
                >
                  {lang === "tr" ? "Bir soru sor" : "Ask a question"}
                </SheetContentTrigger>
              ) : (
                <SheetContentTrigger
                  variant={"outline"}
                  className="w-full"
                  sheetProps={{
                    side: "right",
                    content: <LoginSheetContent />,
                  }}
                >
                  {lang === "tr" ? "Bir soru sor" : "Ask a question"}
                </SheetContentTrigger>
              )
            ) : (
              <SheetContentTrigger
                className="h-max ring-none w-full"
                variant={
                  dentistData.dentistAskQuestion?.length < 1
                    ? "outline"
                    : "child"
                }
                sheetProps={{
                  side: "bottom",
                  content: (
                    <QandASheetContent
                      questionsArr={dentistData.dentistAskQuestion || []}
                      dentistData={dentistData}
                    />
                  ),
                }}
              >
                <div className="flex flex-col gap-3">
                  {dentistData.dentistAskQuestion
                    ?.slice(0, 2)
                    .map((item: any) => (
                      <>
                        <QandAmessage
                          key={item.id + item.question}
                          message={item.question}
                          owner={`${item.patient_name} ${item.patient_last_name}`}
                          initals={`${item.patient_name?.[0]}${item.patient_last_name?.[0]}`}
                          date={new Date(item.created_at).toLocaleDateString()}
                        />
                        <QandAanswer
                          key={item.id + item.answer}
                          message={item.answer}
                          owner={`${dentistData.dentist.name} ${dentistData.dentist.last_name}`}
                          date={new Date(item.created_at).toLocaleDateString()}
                          image={dentistData.dentist.cover_images}
                        />
                      </>
                    ))}
                </div>
              </SheetContentTrigger>
            )
          }
          trigger={<IconChevron />}
        />

        {/* instagram album start */}

        {dentistData.dentist.social_links?.instagram && (
          <InstagramEmbed link={dentistData.dentist.social_links?.instagram} />
        )}

        {/* doctor description sheet */}
        {/* {dentistData.dentist.description[lang] && (
            <AboutDentist dentistDescription={dentistData.dentist.description[lang]} lang={lang} />
          )} */}

        {dentistData.dentist.description && (
          <NextIntlClientProvider
            locale={lang}
            messages={pick(messages, ["pages.dentist"])}
          >
            <SheetContentTrigger
              sheetProps={{
                side: "bottom",
                title: lang === "tr" ? "Hekim Hakında" : "About the doctor",
                content: <AboutSheetContent text={dentistData.dentist.description?.[lang]} />
              }}
            >
              <ItemCard
                title={lang === "tr" ? "Hekim Hakkında" : "About the doctor"}
                content={
                  dentistData.dentist.description?.[lang]
                }
                trigger={<IconChevron />}
              />
            </SheetContentTrigger>

          </NextIntlClientProvider>
        )}

        {/* treatment fees */}
        {/* <ItemCard
        title="Tedavi Fiyatları"
        content={<>
          {treatmentsFees?.slice(0, 4).map((item: any, index: any) => (
            <p key={index}>
              <span>
                -{item.name?.[lang]} :{' '}
              </span>
              <span className="font-bold">
                {item.price_tl} TL
              </span>
            </p>
          ))}
        </>}
        trigger={
          <ItemDescriptionSheetTrigger
            title="Hekim Hakkında"
            description={<div className='flex flex-col'>
              {treatmentsFees?.map((item: any, index: any) => (
                <p key={index}>
                  <span>
                    -{item.name?.[lang]} :{' '}
                  </span>
                  <span className="font-bold">
                    {item.price_tl} TL
                  </span>
                </p>
              ))
              }
            </div>}
            aria-label="dentist description"
            aria-description='dentist description'
          >
            <IconChevron className={""} />
          </ItemDescriptionSheetTrigger>
        }
      /> */}

        {/* payment options */}
        <ItemCard
          title={lang === "tr" ? "Ödeme Yöntemleri" : "Payment methods"}
          content={
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <div className="bg-[#F4F4F4] p-2 flex items-center rounded-full">
                  <IconCreditCard className="w-[24px] h-[24px] flex-shrink-0" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-poppins font-bold">
                    {lang === "tr"
                      ? "diştedavim’le 12 aya kadar taksit"
                      : "Installments up to 12 months with Dıştedavim"}{" "}
                  </span>
                  {/* <span className="text-xs">
                    {lang === "tr"
                      ? "Tüm kredi kartlarına vade farksız 3 ay taksit"
                      : "3 months interest-free installment for all credit cards"}
                  </span> */}
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="bg-[#F4F4F4] p-2 rounded-full flex items-center">
                  <IconWallet className="w-[24px] h-[24px] flex-shrink-0" />
                </div>
                <span className="text-base font-poppins font-bold">
                  {lang === "tr" ? "Nakit ile ödeme" : "Payment with cash"}{" "}
                </span>
              </div>
            </div>
          }
          trigger={null}
        />
      </div>

      <div className="w-full bg-white fixed  bottom-[68px] left-0  z-50">
        <div className=" lg:w-1/2 lg:mx-auto sm:mx-auto sm:w-full p-3  box-shadow2">
          <div className="w-full mx-auto max-w-7xl ">
            <SheetContentTrigger
              variant={"default"}
              className="w-full"
              sheetProps={{
                side: "bottom",
                title: `${dentistData.dentist.degree[lang]} ${dentistData.dentist.name} ${dentistData.dentist.last_name}`,
                subtitle: `${lang === "en" ? "Select Appointment" : "Randevu Seç"}`,
                content: (
                  <QuickAppointmentSheetContent
                    doctor_id={dentistData.dentist.id}
                  />
                ),
              }}
            >
              {lang === "tr" ? "Ücretsiz Randevu Al" : "Get a Free Appointment"}
            </SheetContentTrigger>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemCard({
  trigger,
  title,
  content,
}: {
  trigger: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex w-full items-start justify-between mb-4">
        <h3 className="text-xl font-extrabold">{title}</h3>
        {trigger}
      </div>
      <span className="justify-start items-center flex">{content}</span>
    </div>
  );
}
