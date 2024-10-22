"use client";

import { loginWithEmail } from "@/actions/authentication";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Checkbox } from "@/components/ui/checkbox";
import { LoginWithOtp } from "./otp-login";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SheetCloseTrigger } from "../ui/sheet";
import { Link } from "@/navigation";
import { Locale } from "@/i18n";
import IconPasswordEye from "@/icons/password-eye";
import { useState } from "react";
import SITEROUTES from "@/constants/site_routes";

const initialState = {
  email: "",
  password: "",
  remember_me: false,
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

export function LoginWithEmailForm({
  hideTitle,
  isInDialog,
}: {
  hideTitle?: boolean;
  isInDialog?: boolean;
}) {
  const t = useTranslations("forms") as any;
  const lang = useLocale() as Locale;

  const [state, formAction1] = useFormState(loginWithEmail, initialState);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div>
      {!state?.success && (
        <form action={formAction1} className="flex flex-col gap-4 w-full">
          {!hideTitle && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 text-left mb-1">
                {t("Login.title")}
              </h1>
              <p className="text-sm font-normal text-gray-600 text-left mb-1">
                {t("Login.description")}
              </p>
            </div>
          )}

          <TabsList className="w-full mb-4">
            <TabsTrigger value="login" className="w-full">
              {t("Login.login_with_phone")}
            </TabsTrigger>
            <TabsTrigger value="register" className="w-full">
              {t("Login.login_with_email")}
            </TabsTrigger>
          </TabsList>

          <Input
            required
            id="email"
            name="email"
            type="email"
            placeholder={t("Login.Labels.email")}
            className={cn(
              state?.zod_errors?.email?.length > 0 &&
              "outline outline-1 outline-destructive-foreground",
            )}
          />

          <div className="flex flex-col gap-2">
            <div className="relative">
              <Input
                required
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder={t("Login.Labels.password")}
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
            {isInDialog ? (
              <SheetCloseTrigger asChild>
                <Link
                  href={SITEROUTES.forgotPassword}
                  className="text-sm font-normal text-primary underline text-right w-full mb-1"
                >
                  {t("Login.forgot_password")}
                </Link>
              </SheetCloseTrigger>
            ) : (
              <Link
                href={SITEROUTES.forgotPassword}
                className="text-sm font-normal text-primary underline text-right w-full mb-1"
              >
                {t("Login.forgot_password")}
              </Link>
            )}
          </div>

          {/* <div
            className={cn(
              state?.zod_errors?.terms?.length > 0 &&
                "outline outline-1 outline-destructive-foreground",
              "flex items-center",
            )}
          >
            <Checkbox
              aria-label="remember me"
              aria-describedby="remember me"
              id="remember_me"
              name="remember_me"
            />
            <label htmlFor="remember_me" className="text-gray-500 ms-2 text-sm">
              {t("Login.Labels.stay_logged_in")}
            </label>
          </div> */}

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

          <SubmitButton label={t("Login.submit")} />
        </form>
      )}

      {state?.success && <LoginWithOtp identifier={state.identifier} />}
    </div>
  );
}
