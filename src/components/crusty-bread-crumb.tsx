"use client";
import { create } from "zustand";
import { Button } from "./ui/button";
import IconChevron from "@/icons/chevron";
import { Link, usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import * as ld from "lodash";
import { useEffect } from "react";

type Crumb = {
  label: string;
  href: string | any;
};

type State = {
  currentPath: string;
  crumbs: Crumb[];
};

type Actions = {
  addCrumb: (crumb: Crumb, index: number) => void;
  clearCrumbs: (path: string) => void;
};

const useBreadCrumbStore = create<State & Actions>((set) => ({
  currentPath: "",
  crumbs: [] as Crumb[],
  addCrumb: (crumb, index) => {
    set((state) => ({ crumbs: ld.set(state.crumbs, index, crumb) }));
  },
  clearCrumbs: (path) => {
    set((state) => ({ crumbs: [], currentPath: path }));
  },
}));

export function CrustyBreadCrumbSetter({
  crumb,
  index,
}: {
  crumb: Crumb;
  index: number;
}) {
  const { addCrumb, currentPath } = useBreadCrumbStore();
  useEffect(() => {
    addCrumb(crumb, index);
  }, [crumb, index, currentPath]);
  return null;
}

export function CrustyBreadCrumbBase() {
  const { crumbs, clearCrumbs } = useBreadCrumbStore();
  const t = useTranslations("layout.breadCrumb");

  const router = useRouter();
  const pathname = usePathname();
  const goBack = () => {
    router.back();
  };

  // reset/update the crumbs on path change
  useEffect(() => {
    clearCrumbs(pathname);
  }, [pathname]);

  return (
    <div className="*:whitespace-nowrap">
      <div className="flex items-center gap-2">
        <Button onClick={goBack} variant={"child"}>
          <IconChevron className="rotate-90 w-6 h-6" />
        </Button>
        <div className="flex items-center gap-[2px]">
          <Link href={"/"} className="items-center flex gap-[2px]">
            <span className="text-xs text-[#919191]">{t("home")}</span>
            <IconChevron className="-rotate-90 w-2 h-2 text-[#919191]" />
          </Link>
          {ld.initial(ld.compact(crumbs))?.map((crumb) => (
            <Link
              key={crumb.href}
              href={crumb.href as any}
              className="items-center flex gap-[2px]"
            >
              <span className="text-xs text-[#919191] whitespace-nowrap">
                {crumb.label}
              </span>
              <IconChevron className="-rotate-90 w-2 h-2 text-[#919191]" />
            </Link>
          ))}
          <span className="text-xs text-[#919191] line-clamp-1">
            {ld.last(crumbs)?.label}
          </span>
        </div>
      </div>
      <h1 className="text-2xl font-bold font-sans min-h-[32px] mt-4">
        {ld.last(crumbs)?.label}
      </h1>
    </div>
  );
}
