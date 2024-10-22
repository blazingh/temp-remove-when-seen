"use client";

import IconTreatments from "@/icons/treatments";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { Locale } from "@/i18n";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import SITEROUTES from "@/constants/site_routes";
import IconLocationPin2 from "@/icons/locationPin2";
import { useContext } from "react";
import { SheetContext } from "@/contextPorviders/sheetContext";
import ClinicLocation from "../sheets/clinicsLocation";

export default function HomeMainForm({
  cities,
  districts,
  treatments,
}: {
  cities: any[];
  districts: any[];
  treatments: any[];
}) {
  const t = useTranslations("forms.Clinic_Filter") as any;

  const lang = useLocale() as Locale;

  const router = useRouter();

  const sheet = useContext(SheetContext);

  const mainPageFormSchema = z.object({
    city: z.string().optional(),
    district: z.string().optional(),
    treatments: z.string().optional(),
  });

  const mainPageForm = useForm<z.infer<typeof mainPageFormSchema>>({
    resolver: zodResolver(mainPageFormSchema),
    defaultValues: {
      city: "",
      district: "",
      treatments: "",
    },
  });

  function onSubmitMainPageForm(formValue: z.infer<typeof mainPageFormSchema>) {
    const values = {
      treatments: formValue.treatments !== "" ? formValue.treatments : "tumu",
      city: formValue.city !== "" ? formValue.city : "",
      district: formValue.district !== "" ? formValue.district : "",
    };

    router.push({
      pathname: SITEROUTES.clinicsList,
      params: {
        options: [
          values.treatments || "",
          values.city || "",
          values.district || "",
        ],
      },
    });
  }

  // find the selected location name
  const locationLabel: string | null = (function () {
    const { city, district } = mainPageForm.getValues();
    if (district && district !== "tumu") {
      const label = districts.find((item) => item.domain === district)?.name;
      const cityLabel = cities.find((item) => item.domain === city)?.name;
      return cityLabel + ", " + label;
    }
    if (city && city !== "tumu")
      return cities.find((item) => item.domain === city)?.name;
    return null;
  })();

  function openLocationPopup() {
    sheet?.setSheetContent({
      side: "bottom",
      slug: "locationFilter",
      content: (
        <ClinicLocation
          showGetCurrentLocation
          {...{ cities, districts }}
          onComplete={(location) => {
            mainPageForm.setValue("city", location[0]);
            mainPageForm.setValue("district", location[1]);
            if (mainPageForm.getValues().treatments === "")
              openTreatmentsPopup();
          }}
        />
      ),
    });
  }

  function openTreatmentsPopup() {
    sheet?.setSheetContent({
      side: "bottom",
      title: t("Labels.select_treatment"),
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
                mainPageForm.setValue("treatments", item.domain[lang]);
                sheet?.close();
              }}
            >
              {item.name[lang]}
            </Button>
          ))}
        </div>
      ),
    });
  }

  return (
    <>
      <Form {...mainPageForm}>
        <form
          className="w-full flex flex-col md:flex-row gap-2"
          onSubmit={mainPageForm.handleSubmit(onSubmitMainPageForm)}
        >
          <FormField
            control={mainPageForm.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select
                  open={false}
                  name="city"
                  aria-label={t("Labels.select_city")}
                  value={locationLabel ?? ""}
                >
                  <FormControl>
                    <SelectTrigger
                      placeholder={t("Labels.select_city")}
                      icon={<IconLocationPin2 className="w-8 h-8" />}
                      className="h-14 font-normal text-lg rounded-xl"
                      placeholderClassName="font-normal text-base group-data-[state=open]:text-base group-data-[placeholder]:text-lg"
                      aria-label={t("Labels.select_city")}
                      onClick={(e) => {
                        e.preventDefault();
                        openLocationPopup();
                      }}
                    >
                      {locationLabel ?? undefined}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locationLabel && (
                      <SelectItem value={locationLabel}>
                        {locationLabel}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={mainPageForm.control}
            name="treatments"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select
                  open={false}
                  name="treatment"
                  aria-label={t("Labels.select_treatment")}
                  value={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger
                      placeholder={t("Labels.select_treatment")}
                      aria-label={t("Labels.select_treatment")}
                      icon={<IconTreatments className="w-8 h-8" />}
                      className="h-14 font-normal text-lg rounded-xl"
                      placeholderClassName="font-normal text-base group-data-[state=open]:text-base group-data-[placeholder]:text-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        openTreatmentsPopup();
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {field.value &&
                      treatments
                        .filter((i) => i.domain[lang] === field.value)
                        .map((item: any) => (
                          <SelectItem
                            key={item.domain[lang]}
                            value={item.domain[lang]}
                            aria-label={item.name[lang]}
                          >
                            {item.name[lang]}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-xl font-semibold"
            aria-label={t("Submit")}
          >
            {t("Submit")}
          </Button>
        </form>
      </Form>
    </>
  );
}
