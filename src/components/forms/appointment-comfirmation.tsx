"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMask } from "@react-input/mask";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect, useRef, useState } from "react";
import countryCodes from "@/constants/countries";
import { useSession } from "next-auth/react";
import { Checkbox } from "../ui/checkbox";
import { Sheet, SheetContent } from "../ui/sheet";
import { LoginWithOtpAppointment } from "../pages/appointment/smsVerification";
import { VerifyAppointment } from "@/actions/verify-appointmen";
import { useRouter } from "@/navigation";
import HidePrivacyPopup from "@/components/ui/hidePrivacyPopup";

import privacyPolicyContent from "./privacyPolicyText";
import privacyPolicyContentEN from "./privacyPolicyTextEN";

import termsPolicyContent from "./termsPolicyText";
import termsPolicyContentEN from "./termsPolicyTextEN";

import onlineTermsPolicyContent from "./onlineTermsPolicyContent";
import onlineTermsPolicyContentEN from "./onlineTermsPolicyContentEN";
import { Locale } from "@/i18n";
import { SheetContext } from "@/contextPorviders/sheetContext";

const initialState = {
  id: "",
  date: "",
  startedMinute: "",
  phone: "",
  country_code: "90",
  email: "",
  first_name: "",
  last_name: "",
  appointment_type: "in_person",
  accepted_terms: false,
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className={cn(pending && "opacity-50", "w-full")}
    >
      {pending ? <Loader2 className="h-6 w-6 animate-spin" /> : label}
    </Button>
  );
}

export function AppointmentConfirmationForm({
  id,
  date,
  appointment_type,
  startedMinute,
}: {
  id: string;
  date: string;
  appointment_type: string;
  startedMinute: string;
}) {
  const lang = useLocale() as Locale;
  const t = useTranslations("forms.AppointmentConfirmation") as any;
  const sheet = useContext(SheetContext);
  const { data: session } = useSession();

  const [state, formAction] = useFormState(VerifyAppointment, initialState);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneFormat, setPhoneFormat] = useState(countryCodes[0]);

  const inputPhoneRef = useMask({
    mask: phoneFormat.format,
    replacement: { _: /\d/ },
  });

  const ref = useRef<any>(!null);

  useEffect(() => {
    setPhoneFormat(
      countryCodes.find(
        (countryCode) => countryCode.value === state?.country_code,
      ) || countryCodes[0],
    );
  }, [state, setPhoneFormat]);

  useEffect(() => {
    if (session?.user?.phone) {
      setPhoneNumber(session?.user?.phone);
    }
  }, [session]);

  useEffect(() => {
    if (!state?.identifier) return;
    sheet?.setSheetContent({
      side: "bottom",
      content: (
        <LoginWithOtpAppointment
          key={state.identifier + state.lastSubmit}
          identifier={state.identifier}
          id={id}
          date={date}
          startedMinute={startedMinute}
          appointment_type={appointment_type}
          resend={() => {
            sheet?.close();
            ref?.current?.requestSubmit();
          }}
        />
      ),
    });
  }, [state?.identifier, state.lastSubmit]);

  return (
    <div>
      <form
        action={formAction}
        className="flex flex-col gap-4 w-full"
        ref={ref}
      >
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="date" value={date} />
        <input type="hidden" name="startedMinute" value={startedMinute} />
        <input type="hidden" name="appointment_type" value={appointment_type} />

        <div className="flex gap-3">
          <Input
            required
            id="first_name"
            name="first_name"
            type="text"
            placeholder={t("Labels.first_name")}
            className={cn(
              state?.zod_errors?.first_name?.length > 0 &&
              "outline outline-1 outline-destructive-foreground",
              "capitalize"
            )}
            defaultValue={session?.user?.name}
          />

          <Input
            required
            id="last_name"
            name="last_name"
            type="text"
            placeholder={t("Labels.last_name")}
            className={cn(
              state?.zod_errors?.last_name?.length > 0 &&
              "outline outline-1 outline-destructive-foreground",
              "capitalize"
            )}
            defaultValue={session?.user?.last_name}
          />
        </div>

        <div
          className={cn(
            "flex rounded-md",
            state?.zod_errors?.phone?.length > 0 &&
            "outline outline-1 outline-destructive-foreground",
          )}
        >
          <Select
            name="country_code"
            defaultValue={session?.user?.country_code || countryCodes[0].value}
            onValueChange={(value) => {
              setPhoneFormat(
                countryCodes.find(
                  (countryCode) => countryCode.value === value,
                ) || countryCodes[0],
              );
              setPhoneNumber("");
            }}
          >
            <SelectTrigger
              hideChevron
              className="w-min h-14 flex-shrink-0 items-center text-sm font-medium text-center text-gray-900 bg-white border border-[#DBD1F8] rounded-e-none"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((countryCode) => (
                <SelectItem
                  value={countryCode.value}
                  className="flex"
                  key={countryCode.value}
                >
                  <div key={countryCode.value} className="flex items-center">
                    {countryCode.flag}
                    <span className="pl-2 flex items-center">
                      {countryCode.label}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            required
            id="phone"
            name="phone"
            type="tel"
            placeholder={t("Labels.phone_number")}
            className={cn("rounded-l-none border-l-0 w-full")}
            ref={inputPhoneRef}
            defaultValue={session?.user?.phone}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </div>

        {phoneFormat.value !== "90" && (
          <Input
            required
            id="email"
            name="email"
            type="email"
            placeholder={t("Labels.email")}
            className={cn(
              state?.zod_errors?.email?.length > 0 &&
              "outline outline-1 outline-destructive-foreground",
            )}
            defaultValue={session?.user?.email}
          />
        )}

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

        <div className="fixed lg:relative bottom-[69px] lg:bottom-[unset] border-t lg:border-none flex flex-col gap-4 bg-background w-full left-0 lg:left-[unset] p-4 lg:p-0 max-w-5xl">
          <div className="flex flex-col gap-2">


            <div className="flex flex-row gap-2">
              <Checkbox
                required
                name="accepted_terms"
                id="accepted_terms"
                className={cn(
                  state?.zod_errors?.agreementChecked?.length > 0 &&
                  "outline outline-1 outline-destructive-foreground",
                )}
              />

              <label
                htmlFor="accepted_terms"
                className="text-xs font-poppins text-black-500 leading-4 font-normal"
              >
                {lang === "en" ? (
                  <>
                    <a className="text-[#7424ff]" href="#">
                      <HidePrivacyPopup
                        title="Terms of Use"
                        privacyPolicyText="Terms of Use"
                        content={termsPolicyContentEN}
                      />
                    </a>{" "}
                    read, understood, and agreed. I consent to the processing and
                    transfer of my personal data in this context.
                  </>
                ) : (
                  <>
                    <a className="text-[#7424ff]" href="#">
                      <HidePrivacyPopup
                        title="Kullanım koşulları"
                        privacyPolicyText="Kullanım koşulları'nı"
                        content={termsPolicyContent}
                      />
                    </a>{" "}

                    okudum, anladım ve kabul ediyorum. Kişisel verilerimin bu
                    kapsamda işlenmesine ve aktarılmasına rıza veriyorum.
                  </>
                )}
              </label>
            </div>
            <div className="flex flex-row gap-2">
              <Checkbox
                required
                name="accepted_terms"
                id="accepted_terms"
                className={cn(
                  state?.zod_errors?.agreementChecked?.length > 0 &&
                  "outline outline-1 outline-destructive-foreground",
                )}
              />

              <label
                htmlFor="accepted_terms"
                className="text-xs font-poppins text-black-500 leading-4 font-normal"
              >
                {lang === "en" ? (
                  <>

                    <HidePrivacyPopup
                      title="Privacy Policy"
                      textColor="text-[#7424ff]"
                      privacyPolicyText="Privacy Policy"
                      content={privacyPolicyContentEN}
                    />{" "}
                    read, understood, and agreed. I consent to the processing and
                    transfer of my personal data in this context.
                  </>
                ) : (
                  <>
                    <HidePrivacyPopup
                      title="Gizlilik Politikası"
                      textColor="text-[#7424ff]"
                      privacyPolicyText="Gizlilik Politikası'nı"
                      content={privacyPolicyContent}
                    />{" "}
                    okudum, anladım ve kabul ediyorum. Kişisel verilerimin bu
                    kapsamda işlenmesine ve aktarılmasına rıza veriyorum.
                  </>
                )}
              </label>
            </div>
            <div className="flex flex-row gap-2">
              <Checkbox
                name="accepted_terms"
                id="accepted_terms"
                className={cn(
                  state?.zod_errors?.agreementChecked?.length > 0 &&
                  "outline outline-1 outline-destructive-foreground",
                )}
              />

              <label
                htmlFor="accepted_terms"
                className="text-xs font-poppins text-black-500 leading-4 font-normal"
              >
                {lang === "en" ? (
                  <>
                    <a className="text-[#7424ff]" href="#">
                      <HidePrivacyPopup
                        title="Terms of Use"
                        privacyPolicyText="Terms of Use"
                        content={termsPolicyContentEN}
                      />
                    </a>{" "}
                    accordingly, I consent to receive commercial electronic messages from me to be informed of important campaigns.
                  </>
                ) : (
                  <>
                    <a className="text-[#7424ff]" href="#">
                      <HidePrivacyPopup
                        title="Kullanım koşulları"
                        privacyPolicyText="Kullanım koşulları"
                        content={termsPolicyContent}
                      />
                    </a>{" "}

                    uyarınca, önemli kampanyalardan haberdar olabilmek için tarafıma ticari elektronik ileti gönderilmesine onay veriyorum.
                  </>
                )}
              </label>
            </div>

            <div className="flex gap-2 text-xs">
              <HidePrivacyPopup
                textColor="text-[#7424ff]"
                title={
                  lang === "tr" ? "KVKK Aydınlatma Metni" : "KVKK Disclosure Text"
                }
                privacyPolicyText={
                  lang === "tr"
                    ? "KVKK Aydınlatma Metni'ne buradan ulaşabilirsin."
                    : "You can access the KVKK Privacy Policy from here."
                }
                content={
                  lang === "tr" ? privacyPolicyContent : privacyPolicyContentEN
                }
              />
            </div>

          </div>

          {appointment_type === "online" && (
            <div className="flex gap-2">
              <label
                htmlFor="accepted_terms"
                className="text-xs font-poppins text-black-500 leading-4 font-normal"
              >
                <a className="text-[#7424ff] ml-6 mt-5" href="#">
                  <HidePrivacyPopup
                    title={
                      lang === "en"
                        ? "Online Consultation Information"
                        : "Online Görüşme Bilgilendirme Metni"
                    }
                    privacyPolicyText={
                      lang === "en"
                        ? "Online Consultation Information"
                        : "Online Görüşme Bilgilendirme Metni"
                    }
                    content={
                      lang === "en"
                        ? onlineTermsPolicyContentEN
                        : onlineTermsPolicyContent
                    }
                  />
                </a>
              </label>
            </div>
          )}

          <SubmitButton
            label={lang === "en" ? "Confirm Appointment" : "Randevuyu Onayla"}
          />
        </div>

        {/* <Button onClick={() => router.back()}> İptal</Button> */}
      </form>
    </div>
  );
}
