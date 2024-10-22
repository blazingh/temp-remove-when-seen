"use client";
import { Locale } from "@/i18n";
import IconChevron from "@/icons/chevron";
import { Button } from "@radix-ui/themes";
import { Link, useRouter } from "@/navigation";
import SITEROUTES from "@/constants/site_routes";

export function BreadCrumbs({
  lang,
  breadCrumbsList = [],
  pageTile,
}: {
  lang: Locale;
  breadCrumbsList?: any[];
  pageTile: string;
}) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <Button onClick={goBack}>
          <IconChevron className="rotate-90 w-6 h-6" />
        </Button>
        <div className="flex items-center gap-[2px]">
          <Link href={SITEROUTES.home} className="items-center flex gap-[2px]">
            <span className="text-xs text-[#919191]">
              {lang === "tr" ? "Anasayfa" : "Home"}
            </span>
            <IconChevron className="-rotate-90 w-2 h-2 text-[#919191]" />
          </Link>
          {breadCrumbsList.map((route) => (
            <Link
              key={route}
              href={route}
              className="items-center flex gap-[2px]"
            >
              <span className="text-xs text-[#919191]">{route.title}</span>
              <IconChevron className="-rotate-90 w-2 h-2 text-[#919191]" />
            </Link>
          ))}
          <span className="text-xs text-[#919191] line-clamp-1">
            {pageTile}
          </span>
        </div>
      </div>
      <h1 className="text-2xl font-bold font-sans">{pageTile}</h1>
    </div>
  );
}
