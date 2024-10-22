"use client";

import { Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { APIROUTE } from "@/constants/api_routes";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { CommandLoading } from "cmdk";
import IconClinic from "@/icons/clinic";
import IconTreatment from "@/icons/treatments";
import IconDoctor from "@/icons/doctorIcon";
import { useRouter } from "@/navigation";
import SITEROUTES from "@/constants/site_routes";
import { Input } from "./ui/input";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function SearchComboBox() {
  const lang = useLocale();
  const t = useTranslations("layout.right_menu") as any;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openFrom, setOpenFrom] = useState("");

  const [q, setQ] = useState("");
  const [debouncedQ] = useDebounce(q, 500);

  const query = useQuery({
    queryKey: ["searchQ", debouncedQ],
    enabled: !!debouncedQ,
    queryFn: async () => {
      const res = await fetch(APIROUTE("seach", { q, lang }));
      return (await res.json()) as any[];
    },
  });

  const isLoading = q !== debouncedQ || query.isFetching;
  const isEmpty = !isLoading && query.data?.length === 0;
  const isFetched = !isLoading && !isEmpty;

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-label="search"
            variant="child"
            className="flex justify-center items-center"
            role="combobox"
            aria-expanded={open}
            onClick={() => {
              setOpen(true);
              setOpenFrom("icon");
            }}
          >
            <Search strokeWidth={3} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-screen p-0 mt-3 rounded-none border shadow-2xl">
          <Command
            className="max-w-5xl mx-auto"
            shouldFilter={false}
            filter={() => 1}
          >
            <CommandInput
              placeholder={t("search_placeholder")}
              value={q}
              onValueChange={setQ}
              rootClassName="lg:hidden"
            />
            <CommandList className=" max-h-[50svh]">
              {isLoading && (
                <CommandLoading className="w-full py-8 flex items-center justify-center">
                  <Loader2 className="animate-spin" />
                </CommandLoading>
              )}
              {isEmpty && (
                <CommandEmpty>{t("search_placeholder_result")}</CommandEmpty>
              )}
              {isFetched && (
                <CommandGroup>
                  {query.data?.map((item) => (
                    <CommandItem
                      className="p-0"
                      key={item.id}
                      value={item.url}
                      onSelect={() => {
                        setQ("");
                        router.push({
                          pathname:
                            (
                              {
                                clinic: SITEROUTES.clinicPage,
                                dentist: SITEROUTES.dentistPage,
                                treatment: SITEROUTES.treatmentPage,
                              } as any
                            )[item.subject_type] ?? "",
                          params: {
                            options: item.url.split("/"),
                          },
                        });
                        setOpen(false);
                      }}
                    >
                      <Button
                        className="w-full p-2 rounded-md border flex mt-2 items-center"
                        variant={"child"}
                      >
                        {(
                          {
                            clinic: <IconClinic />,
                            dentist: <IconDoctor />,
                            treatment: <IconTreatment />,
                          } as any
                        )[item.subject_type] ?? null}
                        <div className="flex flex-col ml-2 w-full align-start">
                          <span className="text-foreground font-semibold w-full text-left line-clamp-1">
                            {item.name}
                          </span>
                          <span className="text-sm font-semibold text-[#414141] w-full text-left line-clamp-1">
                            {item.sub_name}
                          </span>
                        </div>
                      </Button>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function DesktopSearchCombobox() {
  const lang = useLocale();
  const t = useTranslations("layout.right_menu") as any;
  const router = useRouter();

  const [q, setQ] = useState("");
  const [debouncedQ] = useDebounce(q, 500);

  const query = useQuery({
    queryKey: ["searchQ", debouncedQ],
    enabled: q != "" && debouncedQ !== "",
    queryFn: async () => {
      const res = await fetch(APIROUTE("seach", { q, lang }));
      return (await res.json()) as any[];
    },
  });

  const isLoading = q && (q !== debouncedQ || query.isFetching);
  const isEmpty = q && !isLoading && query.data?.length === 0;
  const isFetched = q && !isLoading && !isEmpty;

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setQ("");
    },
  });

  return (
    <Command
      className="max-w-5xl mx-auto flex items-center relative overflow-visible"
      ref={ref}
      shouldFilter={false}
      filter={() => 1}
    >
      <CommandInput
        placeholder={t("search_placeholder")}
        value={q}
        onValueChange={setQ}
        rootClassName="border rounded-sm h-8"
      />
      <CommandList className=" max-h-[50svh]  absolute bg-white shadow-xl w-full min-w-[300px] left-0 bottom-0 translate-y-full rounded">
        {isLoading && (
          <CommandLoading className="w-full py-8 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </CommandLoading>
        )}
        {isEmpty && (
          <CommandEmpty>{t("search_placeholder_result")}</CommandEmpty>
        )}
        {isFetched && (
          <CommandGroup>
            {query.data?.map((item) => (
              <CommandItem
                className="p-0"
                key={item.id}
                value={item.url}
                onSelect={() => {
                  setQ("");
                  router.push({
                    pathname:
                      (
                        {
                          clinic: SITEROUTES.clinicPage,
                          dentist: SITEROUTES.dentistPage,
                          treatment: SITEROUTES.treatmentPage,
                        } as any
                      )[item.subject_type] ?? "",
                    params: {
                      options: item.url.split("/"),
                    },
                  });
                }}
              >
                <Button
                  className="w-full p-2 rounded-md border flex mt-2 items-center"
                  variant={"child"}
                >
                  {(
                    {
                      clinic: <IconClinic />,
                      dentist: <IconDoctor />,
                      treatment: <IconTreatment />,
                    } as any
                  )[item.subject_type] ?? null}
                  <div className="flex flex-col ml-2 w-full align-start">
                    <span className="text-foreground font-semibold w-full text-left line-clamp-1">
                      {item.name}
                    </span>
                    <span className="text-sm font-semibold text-[#414141] w-full text-left line-clamp-1">
                      {item.sub_name}
                    </span>
                  </div>
                </Button>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
