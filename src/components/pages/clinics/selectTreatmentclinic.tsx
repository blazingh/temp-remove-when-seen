"use client";
import { Locale } from "@/i18n";
import { ScrollArea } from "@/components/ui/scroll-area";
import IconChevron from "@/icons/chevron";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useContext, useEffect, useState } from "react";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";
import ClinicLocation from "@/components/sheets/clinicsLocation";
import IconLocation from "@/icons/location";
import IconTreatment from "@/icons/treatments";
import { Button } from "@/components/ui/button";
import SITEROUTES from "@/constants/site_routes";
import { useRouter } from "@/navigation";
import { useQueryState } from "nuqs";
import { TypeOf } from "zod";
import { SheetContext } from "@/contextPorviders/sheetContext";

export default function ClinicLocationTreatmentsFilters({
  treatments,
  cities,
  districts,
  showSubmit = false,
  basePath,
}: {
  treatments: any[];
  districts: any[];
  cities: any[];
  showSubmit?: boolean;
  basePath: any;
}) {
  const lang = useLocale() as Locale;
  const params = useParams();
  const router = useRouter();
  const queries = useSearchParams();
  const t = useTranslations("layout.clinicPage") as any;
  const sheet = useContext(SheetContext);

  const [selectedTreatment, setSelectedTreatment] = useState<string>("tumu");
  const [selectedLocation, setSelectedLocation] = useState<string[]>([
    "tumu",
    "",
  ]);

  const [randomSeed, setRandomSeed] = useQueryState("randomSeed");
  useEffect(() => {
    if (!randomSeed)
      setRandomSeed((p) => p || String(Math.floor(Math.random() * 100) + 1), {
        shallow: false,
      });
  }, [randomSeed, setRandomSeed]);

  // update selecetd values when params mount
  useEffect(() => {
    if (!params.options) return;
    if (params.options[0]) setSelectedTreatment(String(params.options[0]));
    if (params.options[1])
      setSelectedLocation((p) => [String(params.options[1]), p[1]]);
    if (params.options[2])
      setSelectedLocation((p) => [p[0], String(params.options[2])]);
  }, [params.options]);

  // find the selected treatment name
  const treatmentLabel: string = (function () {
    return (
      treatments?.find((item: any) => item.domain[lang] === selectedTreatment)
        ?.name[lang] ?? "tedavi"
    );
  })();

  // find the selected location name
  const locationLabel: string = (function () {
    if (!["", "tumu"].includes(selectedLocation[1])) {
      const label = districts.find(
        (item) => item.domain === selectedLocation[1],
      )?.name;
      const cityLabel = cities.find(
        (item) => item.domain === selectedLocation[0],
      )?.name;
      return cityLabel + ", " + label;
    }
    if (!["", "tumu"].includes(selectedLocation[0]))
      return cities.find((item) => item.domain === selectedLocation[0])?.name;
    return "location";
  })();

  // handle submit
  function handleSubmit(options: string[]) {
    router.push({
      pathname: basePath as typeof SITEROUTES.clinicsList,
      params: {
        options,
      },
      query: Object.fromEntries(queries.entries()),
    });
  }

  return (
    <div className="w-full flex  gap-2">
      <SheetContentTrigger
        variant={"outline"}
        className="w-1/2 h-12 border rounded-md flex justify-between items-center gap-1 relative font-medium pl-2"
        sheetProps={{
          side: "bottom",
          slug: "locationFilter",
          content: (
            <ClinicLocation
              {...{ cities, districts }}
              showGetCurrentLocation
              onComplete={(location) => {
                setSelectedLocation(location);
                if (!showSubmit) handleSubmit([selectedTreatment, ...location]);
              }}
            />
          ),
        }}
      >
        <div className="flex items-center w-full">
          <IconLocation className="mr-1 flex-shrink-0" />
          <span className="text-ellipsis overflow-hidden whitespace-nowrap text-sm text-left flex-grow">
            {locationLabel === "location" ? t("location") : locationLabel}
          </span>
        </div>
      </SheetContentTrigger>

      <SheetContentTrigger
        variant={"outline"}
        className="w-1/2 h-12 border rounded-md flex justify-between items-center gap-1 relative font-medium pl-2"
        sheetProps={{
          side: "bottom",
          title: t("treatment"),
          content: (
            <div className="flex flex-col gap-0">
              {treatments.map((item: any) => (
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  key={item.domain[lang]}
                  value={item.domain[lang]}
                  aria-label={item.name[lang]}
                  className="text-start bg-white justify-start border-b rounded-none text-sm h-9"
                  onClick={() => {
                    setSelectedTreatment(item.domain[lang]);
                    if (!showSubmit)
                      handleSubmit([item.domain[lang], ...selectedLocation]);
                    sheet?.close();
                  }}
                >
                  {item.name[lang]}
                </Button>
              ))}
            </div>
          ),
        }}
      >
        <div className="text-ellipsis overflow-hidden whitespace-nowrap text-sm text-left flex font-medium items-center w-full">
          <IconTreatment className="mr-1 flex-shrink-0" />
          <span className="overflow-hidden text-ellipsis">
            {treatmentLabel === "tedavi" ? t("treatment") : treatmentLabel}
          </span>
        </div>
      </SheetContentTrigger>

      {showSubmit && (
        <Button
          onClick={() => handleSubmit([selectedTreatment, ...selectedLocation])}
        >
          submit
        </Button>
      )}
    </div>
  );
}

export function ClinicBasicFilterSkeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="w-full h-[48px] rounded-md" />
      <Skeleton className="w-full h-[48px] rounded-md" />
    </div>
  );
}
