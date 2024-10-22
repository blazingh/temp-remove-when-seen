"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Info, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMask } from "@react-input/mask";

import { Sheet, SheetContent } from "../ui/sheet";
import { LoginWithOtpAppointment } from "../pages/appointment/smsVerification";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SubmitAppointment } from "@/actions/basic-appointment-submition";
import { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import { Locale } from "@/i18n";
import { useSession } from "next-auth/react";
import SITEROUTES from "@/constants/site_routes";
import { Checkbox } from "../ui/checkbox";

const initialState = {
  reserve_id: "",
  identity_no: "",
  birth_date: "Gün/Ay/Yıl",
  gender: "",
  accepted_terms: false,
  is_foreign: false,
  passport_no: "",
};

function SubmitButton({
  label,
  disabled,
}: {
  label: string;
  disabled: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={pending || disabled}
      className={cn((pending || disabled) && "opacity-50", "w-full")}
    >
      {pending ? <Loader2 className="h-6 w-6 animate-spin" /> : label}
    </Button>
  );
}

export function AppointmentBasicForm({
  id,
  date,
  startedMinute,
  appointment_type,
  reserve_id,
}: {
  id: string;
  date: string;
  startedMinute: string;
  appointment_type: string;
  reserve_id: string;
}) {
  const t = useTranslations("forms.AppointmentConfirmation") as any;
  const lang = useLocale() as Locale;
  const router = useRouter();
  const [state, formAction] = useFormState(SubmitAppointment, initialState);
  const inputIdentityNoRef = useMask({
    mask: "___________",
    replacement: { _: /\d/ },
  });

  /*
    try {
      const requestBody = {
        tc_number: formData.identity_no,
        name: formData.first_name || sesName,
        surname: formData.last_name || sesLastName,
        birth_year: formData.birth_date.split("-")[0],
      };

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL +
        "/api-patients/auth/confirm-citizen",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      const result = await response.json();
      const isValid = result;

      setIsFormValid(isValid);

      setTimeout(() => {
        if (isValid == true) {
          setIsValidationSuccessful(true);
        } else {
          setIsValidationSuccessful(false);
        }
      }, 1000);
    } catch (error) {
      setIsFormValid(false);
    }
  */

  useEffect(() => {
    if (!state.success) return;
    router.push({
      pathname: SITEROUTES.appointmentSuccess,
      query: {
        id: id,
        date: date,
        "started-minute": startedMinute,
        appointment_type: appointment_type,
      },
    });
  }, [state.success]);

  const { data: session } = useSession();
  const [sesName, setSesName] = useState<string>("");
  const [sesLastName, setSesLastName] = useState<string>("");
  const [isForeign, setIsForeign] = useState(false);

  useEffect(() => {
    if (!session?.user) return;
    setSesName(session.user.name || "");
    setSesLastName(session.user.last_name || "");
  }, [session]);

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-4 w-full">
        <div className="flex gap-2">
          <label
            htmlFor="accepted_terms"
            className="text-xs font-poppins text-gray-500 font-normal"
          >
            {lang === "en"
              ? "You must enter the information required by the Ministry of Health to confirm your appointment."
              : "Randevunun onaylanması için Sağlık Bakanlığı’nın istediği bilgileri girmelisin."}
          </label>
        </div>
        <input type="hidden" name="reserve_id" value={reserve_id} />
        <Input
          required
          name="birth_date"
          type="date"
          placeholder={lang === "en" ? "Birth Date" : "Doğum Tarihi"}
          className={cn(
            state?.zod_errors?.birth_date?.length > 0 &&
            "outline outline-1 outline-destructive-foreground",
          )}
        />

        <div className="hidden">
          <Input
            required
            id="first_name"
            name="first_name"
            type="text"
            placeholder={t("Labels.first_name")}
            defaultValue={sesName}
            className={cn(
              state?.zod_errors?.first_name?.length > 0 &&
              "outline outline-1 outline-destructive-foreground",
            )}
          />

          <Input
            required
            id="last_name"
            name="last_name"
            type="text"
            placeholder={t("Labels.last_name")}
            defaultValue={sesLastName}
            className={cn(
              state?.zod_errors?.last_name?.length > 0 &&
              "outline outline-1 outline-destructive-foreground",
            )}
          />
        </div>

        {!isForeign && (
          <>
            <Input
              required={true}
              id="identity_no"
              ref={inputIdentityNoRef}
              name="identity_no"
              type="number"
              placeholder={lang === "en" ? "ID Number" : "TC Kimlik Numarası"}
              className={cn(
                state?.zod_errors?.identity_no?.length > 0 &&
                "outline outline-1 outline-destructive-foreground",
              )}
            />
            <span className="font-extralight text-xs flex text-[#212121] bg-[#f9f7ff] p-2 rounded-xl">
              <Info className="inline mr-2 flex-shrink-0" />
              <span>{t("identify_no_info")}</span>
            </span>
          </>
        )}

        {isForeign && (
          <Input
            required
            id="passport_no"
            name="passport_no"
            type="text"
            placeholder={
              lang === "en" ? "passaport Number" : "Pasaport Numarası"
            }
            className={cn(
              state?.zod_errors?.identity_no?.length > 0 &&
              "outline outline-1 outline-destructive-foreground",
            )}
          />
        )}

        <div className="flex">
          <div>
            <Checkbox
              id="is_foreign"
              name="is_foreign"
              checked={isForeign}
              onCheckedChange={(v) => {
                setIsForeign(v as any);
              }}
              value={"true"}
            />
          </div>
          <div className="ml-2">
            <span>{t("Labels.is_foreign")}</span>
          </div>
        </div>

        <div className="flex">
          <span className="font-bold">
            {lang === "en" ? "Gender:" : "Cinsiyet:"}
          </span>
          <RadioGroup
            name="gender"
            defaultValue="male"
            className="flex items-center space-x-2 ml-2"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="male" id="gender-male" />
              <Label htmlFor="gender-male">
                {lang === "en" ? "Male" : "Erkek"}
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="female" id="gender-female" />
              <Label htmlFor="gender-female">
                {lang === "en" ? "Female" : "Kadın"}
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="other" id="gender-other" />
              <Label htmlFor="gender-other">
                {lang === "en" ? "Other" : "Diğer"}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {state?.success === false && (
          <p
            aria-live="polite"
            className="error-paragraph w-full"
            role="status"
          >
            {Object.keys(state?.zod_errors ?? {}).length > 0
              ? state?.zod_errors[Object.keys(state?.zod_errors ?? {})[0]][0]
              : state?.message}
          </p>
        )}

        <SubmitButton label={t("submit")} disabled={false} />
      </form>
    </div>
  );
}
