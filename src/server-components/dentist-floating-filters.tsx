import {
  getBranchTypes,
  getTreatmentsList,
} from "@/app/[lang]/(default)/clinics/[[...options]]/actions";
import DoctorsFiltersSheetContent from "@/components/sheets/doctorsFilters";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";
import IconFilter from "@/icons/filter";

export default async function DentistFloatingFilters() {
  const treatments = await getTreatmentsList();

  return (
    <div
      className="bg-[#212121] rounded-full px-6 py-3 flex items-center justify-around fixed bottom-[76px] left-1/2 -translate-x-1/2 z-10"
      data-cls="dentist-btn"
    >
      <SheetContentTrigger
        className="flex gap-2 text-background"
        sheetProps={{
          side: "bottom",
          content: <DoctorsFiltersSheetContent treatments={treatments} />,
        }}
      >
        <IconFilter />
        <span className="text-sm font-medium">Filtrele</span>
      </SheetContentTrigger>
    </div>
  );
}
