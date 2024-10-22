"use client";
import { Button } from "../ui/button";
import { SheetCloseTrigger } from "../ui/sheet";
import { useRouter } from "@/navigation";
import IconStarFilled from "@/icons/starFilled";
import { Separator } from "@/components/ui/separator";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Toggle } from "@/components/ui/toggle";
import { useEffect } from "react";

export default function ClinicsFiltersSheetContent() {
  const router = useRouter();

  const [selectedClinicTypes, setSelectedClinicTypes] = useQueryState(
    "clinicTypes",
    parseAsArrayOf(parseAsString),
  );
  const [selectedLanguages, setSelectedLanguages] = useQueryState(
    "spokenLanguages",
    parseAsArrayOf(parseAsString),
  );
  const [selectedScore, setSelectedScore] = useQueryState(
    "reviewCount",
    parseAsArrayOf(parseAsString),
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-end gap-4 mt-4">
        <span className="text-foreground text-2xl w-full ">Filtrele</span>
        <SheetCloseTrigger
          className="p-0 w-min"
          onClick={() => {
            setSelectedClinicTypes([]);
            setSelectedLanguages([]);
            setSelectedScore([]);
            router.refresh();
          }}
        >
          <span className="text-foreground text-red-500  text-md items-center">
            Temizle
          </span>
        </SheetCloseTrigger>
      </div>

      <Separator />

      <div>
        <span className="text-lg font-bold mb-1">Klinik Tipi</span>
        <div className="flex gap-2 flex-wrap">
          {clinictypes.map((item: (typeof clinictypes)[0]) => (
            <Toggle
              variant={"outline"}
              key={item.id}
              pressed={selectedClinicTypes?.includes(String(item.id))}
              onClick={() =>
                setSelectedClinicTypes((p) =>
                  p?.includes(String(item.id)) ? [] : [String(item.id)],
                )
              }
            >
              {item.name}
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
                  p?.includes(item.value) ? [] : [item.value],
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
                  p?.includes(item.value) ? [] : [item.value],
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
          onClick={() => {
            router.refresh();
          }}
        >
          <span>{"Sonuçları Göster"}</span>
        </Button>
      </SheetCloseTrigger>
    </div>
  );
}

const clinictypes = [
  {
    id: 1,
    name: "Özel Muayenehane",
  },
  {
    id: 3,
    name: "Ağız Diş Sağlığı Merkezi",
  },
  {
    id: 2,
    name: "Ağız ve Diş Sağlığı Polikliniği",
  },
  {
    id: 4,
    name: "Özel Diş Hastanesi",
  },
  {
    id: 5,
    name: "Üniversite Hastanesi",
  },
];

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
