"use client";

import { renewPasswordWithPhone } from "@/actions/password-reset";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMask } from "@react-input/mask";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import countryCodes from "@/constants/countries";
import { LoginWithOtp } from "./otp-login";
import { useRouter } from "@/navigation";
import IconPasswordEye from "@/icons/password-eye";

const initialState = {
  phone: "",
  country_code: "90",
  password: "",
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

export function RenewPasswordWithPhoneForm({
  hideTitle,
}: {
  hideTitle?: boolean;
}) {
  const t = useTranslations("forms") as any;

  const router = useRouter();

  const [state, formAction] = useFormState(
    renewPasswordWithPhone,
    initialState,
  );
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneFormat, setPhoneFormat] = useState(countryCodes[0].format);

  const inputPhoneRef = useMask({
    mask: phoneFormat,
    replacement: { _: /\d/ },
  });

  useEffect(() => {
    setPhoneFormat(
      countryCodes.find(
        (countryCode) => countryCode.value === state?.country_code,
      )?.format || countryCodes[0].format,
    );
  }, [state, setPhoneFormat]);

  return (
    <div>
      {!state?.success && (
        <form action={formAction} className="flex flex-col gap-4 w-full">
          {!hideTitle && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 text-left mb-1">
                {t("Renew_password.title")}
              </h1>
            </div>
          )}

          {/*
          <TabsList className="w-full mb-4">
            <TabsTrigger value="login" className="w-full">{t("Renew_password.login_with_phone")}</TabsTrigger>
            <TabsTrigger value="register" className="w-full">{t("Renew_password.login_with_email")}</TabsTrigger>
          </TabsList>
          */}

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
                  )?.format || countryCodes[0].format,
                );
                setPhoneNumber("");
              }}
            >
              <SelectTrigger
                aria-label="country codes dropdown"
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
                    aria-label={countryCode.label}
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
              placeholder={t("Renew_password.Labels.phone_number")}
              className={cn("rounded-l-none border-l-0 w-full")}
              ref={inputPhoneRef}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>

          <div className="relative">
            <Input
              required
              id="password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              placeholder={t("Renew_password.Labels.password")}
              className={cn(
                state?.zod_errors?.password?.length > 0 &&
                  "outline outline-1 outline-destructive-foreground",
              )}
            />
            <Button
              type="button"
              variant="child"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setPasswordVisible((p) => !p)}
              aria-label="toggle password visibility"
              aria-describedby="toggle password visibility"
            >
              <IconPasswordEye
                active={!passwordVisible}
                className="text-[#212121]"
              />
            </Button>
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

          <SubmitButton label={t("Renew_password.submit")} />
        </form>
      )}

      {state?.success && (
        <LoginWithOtp
          identifier={state?.identifier}
          afterSuccess={() => {
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
