import { Locale } from "@/i18n";
import IconArrow from "@/icons/arrowLeft";
import ClinicDetailsCard from "@/components/cards/clinic/clinicDetailsCard";
import SelectClinicDoctor from "@/components/pages/clinic/selectClinicDoctor";
import ClinicPrices from "@/components/pages/clinic/clinicPrices";
import PropertiesWithTitle from "@/components/ui/propertiesWithTitle";
import ReviewSection from "@/components/reviewSection";
import { getClinicsDetail } from "./actions";
import { notFound } from "next/navigation";
import { MapCardWithContent } from "@/components/cards/maps/mapWithContent";
import { unstable_setRequestLocale } from "next-intl/server";
import InstagramEmbed from "@/components/instagramEmbed";
import ShareAndFavoriteButtonGroup from "@/components/shareAndFavoriteButtonGroup";
import ClinicPaymentMethodSections from "@/components/cards/clinic/clinicPaymentMethodSections";
import { Link } from "@/navigation";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";
import AboutSheetContent from "@/components/pages/clinic/aboutClinic";
import PropertySheetContent from "@/components/pages/clinic/technologyProperties";
import MapWithPinSheetContent from "@/components/sheets/map-with-pin";

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
  const clinicData = await getClinicsDetail({ url: options.join("/") });
  if (!clinicData) notFound();
  const filteredCategories = clinicData.clinicTreatmentCategories.filter(
    (category: any) => category.min_fee !== null,
  );

  return (
    <div className="flex flex-col gap-4">
      <ClinicDetailsCard
        item={clinicData.clinic}
        images={clinicData.photo}
        lang={lang}
      />

      <ShareAndFavoriteButtonGroup
        subjectId={clinicData.clinic.id}
        lang={lang}
        subjectType="clinic"
      />

      {clinicData.clinicsDentist && (
        <SelectClinicDoctor clinicDentist={clinicData.clinicsDentist} />
      )}
      {filteredCategories.length > 0 && (
        <ClinicPrices
          clinicTreatmentCategories={filteredCategories}
          lang={lang}
        />
      )}

      {clinicData?.clinicProperties?.insurance &&
        clinicData.clinicProperties.insurance.length > 0 && (
          <PropertiesWithTitle
            title="Anlaşmalı Sigortalar"
            propertiesArr={clinicData.clinicProperties.insurance}
          />
        )}

      {clinicData?.clinicProperties?.institution &&
        clinicData.clinicProperties.institution.length > 0 && (
          <PropertiesWithTitle
            title="Anlaşmalı Kurumlar"
            propertiesArr={clinicData.clinicProperties.institution}
          />
        )}
      <ClinicPaymentMethodSections lang={lang} />
      {clinicData.clinic.lat && (
        <SheetContentTrigger
          className="z-0"
          sheetProps={{
            side: "bottom",
            content: (
              <MapWithPinSheetContent
                latitude={clinicData.clinic.lat}
                longitude={clinicData.clinic.lng}
              />
            ),
          }}
        >
          <MapCardWithContent
            position={[clinicData.clinic.lat, clinicData.clinic.lng]}
          >
            <div className="flex flex-col gap-2 z-0">
              <p className="font-semibold">{clinicData.clinic.name}</p>
              <p className="text-sm">
                {lang === "tr"
                  ? clinicData.clinic.clinic_types_tr
                  : clinicData.clinic.clinic_types_en || ""}
              </p>

              <p className="text-xs font-light">{clinicData.clinic?.address}</p>
            </div>
          </MapCardWithContent>
        </SheetContentTrigger>
      )}

      {clinicData.clinic.social_links?.instagram && (
        <InstagramEmbed link={clinicData.clinic.social_links?.instagram} />
      )}

      {clinicData.review.length > 0 && (
        <ReviewSection
          lang={lang}
          reviewScore={clinicData.clinic.review_count}
          reviewRating={clinicData.clinic.review_rating}
          reviews={clinicData.review}
        />
      )}

      {/* payment options */}

      {clinicData?.clinic.description && (
        <SheetContentTrigger
          sheetProps={{
            side: "bottom",
            title: lang === "tr" ? "Klinik Hakkında" : "Clinic About",
            content: (
              <AboutSheetContent text={clinicData.clinic.description[lang]} />
            ),
          }}
        >
          <div className="block px-2 py-4 rounded-md border">
            <div className="flex w-full items-center justify-between px-2">
              <span className="text-xl font-extrabold font-poppins">
                {lang === "tr" ? "Klinik Hakkında" : "Clinic About"}
              </span>

              <IconArrow className={"transform -rotate-90"} />
            </div>
            <div className="flex p-2">
              <div className="font-normal text-left leading-6 tracking-normal text-base overflow-hidden line-clamp-3">
                {clinicData.clinic.description[lang]}
              </div>
            </div>
          </div>
        </SheetContentTrigger>
      )}

      {clinicData.clinicProperties?.technology?.length > 0 && (
        <SheetContentTrigger
          sheetProps={{
            side: "bottom",
            title: lang === "tr" ? "Klinik Özellikleri" : "Clinic About",
            content: (
              <PropertySheetContent
                propertiesArr={clinicData.clinicProperties.technology}
              />
            ),
          }}
        >
          <div className="rounded-md border">
            <div className="block px-2 py-4">
              <div className="flex w-full items-center justify-between px-2">
                <span className="text-xl font-extrabold font-poppins">
                  {lang === "tr" ? "Klinik Özellikleri" : "Clinic About"}
                </span>
                <IconArrow className={"transform -rotate-90"} />
              </div>
              <div className="block p-2">
                <ul className="list-inside list-disc space-y-1">
                  {clinicData.clinicProperties.technology
                    .slice(0, 3)
                    .map((item: any, index: any) => (
                      <li
                        className="font-normal font-poppins leading-6 tracking-normal text-base w-full break-all text-left"
                        key={index}
                      >
                        {item[0].tr}
                        {index === 2 &&
                          clinicData.clinicProperties.technology.length > 3 &&
                          "..."}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </SheetContentTrigger>
      )}
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
      {content}
    </div>
  );
}
