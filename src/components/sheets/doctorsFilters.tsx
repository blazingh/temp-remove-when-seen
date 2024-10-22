"use client";
import { Button } from "../ui/button";
import { SheetCloseTrigger } from "../ui/sheet";
import { useRouter } from "@/navigation";
import IconStarFilled from "@/icons/starFilled";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Toggle } from "@/components/ui/toggle";
import IconX from "@/icons/x";
import { useLocale } from "next-intl";

export default function DoctorsFiltersSheetContent({
  treatments,
}: {
  treatments: any[];
}) {
  const router = useRouter();

  const lang = useLocale() as Locale;

  const [selectedTreatments, setSelectedTreatments] = useQueryState(
    "treatment_category_ids",
    parseAsArrayOf(parseAsString).withOptions({ shallow: false }),
  );
  const [selectedLanguages, setSelectedLanguages] = useQueryState(
    "spokenLanguages",
    parseAsArrayOf(parseAsString).withOptions({ shallow: false }),
  );
  const [selectedScore, setSelectedScore] = useQueryState(
    "reviewCount",
    parseAsArrayOf(parseAsString).withOptions({ shallow: false }),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center gap-4 mt-4">
        <SheetCloseTrigger className="p-0 w-min">
          <IconX className="w-[16px] h-[16px] flex-shrink-0" />
        </SheetCloseTrigger>
        <span className="text-foreground text-2xl w-full ">Filtrele</span>
        <SheetCloseTrigger
          className="p-0 w-min"
          onClick={() => {
            setSelectedTreatments([]);
            setSelectedLanguages([]);
            setSelectedScore([]);
            router.refresh();
          }}
        >
          <span className="text-foreground text-red-500 text-md items-center">
            Temizle
          </span>
        </SheetCloseTrigger>
      </div>

      <Separator />

      <div>
        <span className="text-lg font-bold mb-1">Tedaviler</span>
        <div className="flex gap-2 flex-wrap">
          {treatments.map((item: any) => (
            <Toggle
              variant={"outline"}
              key={item.id}
              pressed={selectedTreatments?.includes(String(item.id))}
              onClick={() =>
                setSelectedTreatments((p) =>
                  p?.includes(String(item.id))
                    ? p.filter((i) => i !== String(item.id))
                    : p
                      ? [...p, String(item.id)]
                      : [String(item.id)],
                )
              }
            >
              {item.name?.[lang]}
            </Toggle>
          ))}
        </div>
      </div>

      <div>
        <span className="text-lg font-bold mb-1">Konuşulan Diller</span>
        <div className="flex gap-2 flex-wrap">
          {languages.map((item: (typeof languages)[0]) => (
            <Toggle
              variant={"outline"}
              key={item.value}
              pressed={selectedLanguages?.includes(item.value)}
              onClick={() =>
                setSelectedLanguages((p) =>
                  p?.includes(item.value)
                    ? p.filter((i) => i !== item.value)
                    : p
                      ? [...p, item.value]
                      : [item.value],
                )
              }
            >
              {item.label}
            </Toggle>
          ))}
        </div>
      </div>

      <div>
        <span className="text-lg font-bold mb-1">Değerlendirmeler</span>
        <div className="flex gap-2 flex-wrap">
          {scores.map((item: (typeof scores)[0]) => (
            <Toggle
              variant={"outline"}
              key={item.value}
              className="flex gap-2"
              pressed={selectedScore?.includes(item.value)}
              onClick={() =>
                setSelectedScore((p) =>
                  p?.includes(item.value)
                    ? p.filter((i) => i !== item.value)
                    : p
                      ? [...p, item.value]
                      : [item.value],
                )
              }
            >
              <IconStarFilled />
              {item.label}
            </Toggle>
          ))}
        </div>
      </div>

      <Separator />

      <SheetCloseTrigger asChild>
        <Button
          type="button"
          className="col-span-1 p-4 w-full font-medium"
          variant={"default"}
          onClick={() => {}}
        >
          <span>{"Sonuçları Göster"}</span>
        </Button>
      </SheetCloseTrigger>
    </div>
  );
}

const languages = [
  {
    value: "tr",
    label: "Türkçe",
  },
  {
    value: "en",
    label: "İngilizce",
  },
];

const scores = [
  {
    value: "2",
    label: "2+",
  },
  {
    value: "3",
    label: "3+",
  },
  {
    value: "4",
    label: "4+",
  },
];
