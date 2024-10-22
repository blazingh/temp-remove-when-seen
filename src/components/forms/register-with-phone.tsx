"use client";

import { registerWithPhone } from "@/actions/authentication";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { SheetClose, SheetContent, SheetTitle } from "../ui/sheet";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HidePrivacyPopup from "@/components/ui/hidePrivacyPopup";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMask } from "@react-input/mask";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Locale } from "@/i18n";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import countryCodes, { otp_availble_codes } from "@/constants/countries";
import { LoginWithOtp } from "./otp-login";
import { ROUTES } from "@/constants/routes";

import privacyPolicyContent from "./privacyPolicyText";
import privacyPolicyContentEN from "./privacyPolicyTextEN";

import termsPolicyContent from "./termsPolicyText";
import termsPolicyContentEN from "./termsPolicyTextEN";

const initialState = {
  phone: "",
  country_code: "90",
  email: "",
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

export function RegisterForm({ hideTitle }: { hideTitle?: boolean }) {
  const t = useTranslations("forms") as any;
  const lang = useLocale() as Locale;

  const [state, formAction] = useFormState(registerWithPhone, initialState);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneFormat, setPhoneFormat] = useState<
    (typeof countryCodes)[0] | undefined
  >(countryCodes[0]);

  const inputPhoneRef = useMask({
    mask: (phoneFormat || countryCodes[0]).format,
    replacement: { _: /\d/ },
  });

  return (
    <div>
      {!state?.success && (
        <form action={formAction} className="flex flex-col gap-4 w-full">
          {!hideTitle && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 text-left mb-1">
                {t("Register.title")}
              </h1>
              <p className="text-sm font-normal text-gray-600 text-left mb-1">
                {t("Register.description")}
              </p>
            </div>
          )}
          <div
            className={cn(
              "flex rounded-md",
              state?.zod_errors?.phone?.length > 0 &&
              "outline outline-1 outline-destructive-foreground",
            )}
          >
            <Select
              name="country_code"
              defaultValue={countryCodes[0].value}
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
                placeholder=""
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
              placeholder={t("Register.Labels.phone_number")}
              className={cn("rounded-l-none border-l-0 w-full")}
              ref={inputPhoneRef}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>

          {phoneFormat?.value !== "90" && (
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t("Register.Labels.email")}
              className={cn(
                state?.zod_errors?.email?.length > 0 &&
                "outline outline-1 outline-destructive-foreground",
              )}
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
                : state?.zod_errors2 || state?.message}
            </p>
          )}

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
                      privacyPolicyText="Kullanım koşulları "
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

          <SubmitButton label={t("Register.submit")} />
        </form>
      )}

      {state?.success && <LoginWithOtp identifier={state.identifier} />}
    </div>
  );
}
