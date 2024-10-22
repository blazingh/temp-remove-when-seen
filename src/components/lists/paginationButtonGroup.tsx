"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Locale } from "@/i18n";
import { Link, usePathname } from "@/navigation";

export default function PaginationButtonGroup({
  totalPages = 1,
  lang,
}: {
  totalPages: number;
  lang: Locale;
}) {
  const serchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = parseInt(serchParams.get("page") || "1");

  return (
    <div className="flex items-center justify-between gap-6 w-full">
      <Link
        href={{
          pathname: pathname as any,
          query: { page: currentPage - 1 },
        }}
        scroll={true}
        prefetch={true}
        className={cn("w-full", currentPage === 1 ? "pointer-events-none" : "")}
      >
        <Button
          variant={"outline"}
          className="w-full"
          disabled={currentPage === 1}
        >
          {lang === "en" ? "Previous" : "Önceki"}
        </Button>
      </Link>

      <span className="font-bold">
        {currentPage}/{totalPages}
      </span>

      <Link
        href={{
          pathname: pathname as any,
          query: { page: currentPage + 1 },
        }}
        scroll={true}
        prefetch={true}
        className={cn(
          "w-full",
          currentPage === totalPages ? "pointer-events-none" : "",
        )}
      >
        <Button
          variant={"outline"}
          className="w-full"
          disabled={currentPage === totalPages}
        >
          {lang === "en" ? "Next" : "Sonraki"}
        </Button>
      </Link>
    </div>
  );
}
