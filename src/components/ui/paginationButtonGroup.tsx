"use client";
import { Button } from "./button";
/* eslint-disable-next-line */
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n";
import { Link } from "@/navigation";
import SpecialPopup from "../pages/clinic/popup";

export default function PaginationButtonBar({
  totalPages,
  lang,
  shallow,
}: {
  totalPages: number;
  lang: Locale;
  shallow?: false;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between w-full">
      <SpecialPopup itemKey="clincs-page" isHome={false} />
      <Link
        href={createPageURL(currentPage - 1) as any}
        className={cn("w-2/5", currentPage === 1 && "pointer-events-none")}
        shallow={shallow}
      >
        <Button
          variant={"outline"}
          className="w-full"
          disabled={currentPage === 1}
        >
          {lang === "en" ? "Previous" : "Önceki"}
        </Button>
      </Link>

      <span className="font-bold flex px-2 items-center">
        {currentPage} / {totalPages}
      </span>

      <Link
        href={
          (currentPage >= totalPages
            ? "#"
            : createPageURL(currentPage + 1)) as any
        }
        className={cn(
          "w-2/5",
          currentPage >= totalPages && "pointer-events-none",
        )}
        shallow={shallow}
      >
        <Button
          variant={"outline"}
          className="w-full"
          disabled={currentPage >= totalPages}
        >
          {lang === "en" ? "Next" : "Sonraki"}
        </Button>
      </Link>
    </div>
  );
}
