"use client";

import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMask } from "@react-input/mask";
import { z } from "zod";
import { APIROUTE } from "@/constants/api_routes";
import { pick } from "lodash";

import { Checkbox } from "@/components/ui/checkbox";
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
import { Locale } from "@/i18n";
import ReCAPTCHA from "react-google-recaptcha";
interface ZodErrors {
  phone?: string[];
  [key: string]: string[] | undefined;
}
interface State {
  phone: string;
  country_code: string;
  password: string;
  remember_me: boolean;
  pending: boolean;
  success: boolean;
  message: string;
  zod_errors: ZodErrors;
  identifier: string;
  captcha_token: string;
}
const initialState: State = {
  phone: "",
  country_code: "90",
  password: "",
  remember_me: false,
  pending: false,
  success: false, // Başlangıçta 'start' olarak ayarlandı
  message: "",
  zod_errors: {}, // Boş nesne olarak ayarlandı
  identifier: "",
  captcha_token: "",
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

export function LoginWithPhoneForm({
  hideTitle,
  isInDialog,
}: {
  hideTitle?: boolean;
  isInDialog?: boolean;
}) {
  const t = useTranslations();
  const lang = useLocale() as Locale;

  const [state, setState] = useState(initialState);

  const handleRecaptchaChange = (value: any) => {
    setRecaptchaCounter(false);
    setState({ ...state, captcha_token: value });
    setCaptcha_token(value);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [remember_me, setRemember_me] = useState(false);
  const [phoneFormat, setPhoneFormat] = useState(countryCodes[0].format);
  const [recaptchaCounter, setRecaptchaCounter] = useState(false);
  const [captcha_token, setCaptcha_token] = useState("");
  const inputPhoneRef = useMask({
    mask: phoneFormat,
    replacement: { _: /\d/ },
  });

  const loginWithPhone = async (formData: any) => {
    const schema = z.object({
      phone: z
        .string({
          invalid_type_error: t("messages.Errors.invalid_phone_number"),
        })
        .min(10, t("messages.Errors.invalid_phone_number")),
      country_code: z.string({
        invalid_type_error: t("messages.Errors.invalid_phone_code"),
      }),
      remember_me: z.any(),

      captcha_token: z
        .string({
          invalid_type_error: t("messages.Errors.invalid_captcha_token"),
        })
        .refine(
          (value) => {
            if (recaptchaCounter) {
              return value !== "";
            }
            return true;
          },
          {
            message: t("messages.Errors.invalid_captcha_must"),
          },
        ),
    });

    const parse = schema.safeParse({
      phone: state.phone.replace(/\D/g, ""),
      country_code: state.country_code,
      remember_me: state.remember_me,
      captcha_token: captcha_token,
    });

    if (!parse.success) {
      return {
        message: "zod",
        success: "error",
        zod_errors: parse.error.flatten().fieldErrors,
      };
    }
    const data = parse.data;
    try {
      const response = await fetch(APIROUTE("loginWithPhone"), {
        method: "POST",
        body: JSON.stringify(
          pick(data, ["phone", "country_code", "captcha_token", "remember_me"]),
        ),
        headers: {
          "Content-Type": "application/json",
          "accept-language": lang,
        },
      });

      if (!response.ok)
        return {
          message:
            (await response.json()).error?.message ||
            t("messages.Errors.failed_to_send_message"),
          success: false,
        };

      const response_data = (await response.json()) as any;

      if (response_data.show_captcha) {
        setRecaptchaCounter(true);
      }
      if (!response_data.identifier) {
        throw new Error();
      }
      return {
        message: t("messages.Success.loged_in"),
        success: true,
        identifier: response_data.identifier,
        ...response_data,
      };
    } catch (error) {
      return {
        message: t("messages.Errors.failed_to_send_message"),
        success: false,
      };
    }
  };
  // const handleRecaptchaVerify = (token: string) => {

  //   state.captcha_token = token
  //   setCaptcha_token(token)
  // };
  const [recaptchaSize, setRecaptchaSize] = useState<"compact" | "normal">(
    "normal",
  );

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setState({ ...state, pending: true });
    const response = await loginWithPhone(state);

    if (response.success === true) {
      setState({
        ...state,
        ...response,
        pending: false,
        success: true,
        zod_errors: {},
      });
      setCaptcha_token("");
    } else {
      setCaptcha_token("");
      if (response.message === "zod") {
        setState({ ...state, zod_errors: response.zod_errors, pending: false });
      } else {
        setState({ ...state, message: response.message, pending: false });
      }
    }
  };

  useEffect(() => {
    setPhoneFormat(
      countryCodes.find(
        (countryCode) => countryCode.value === state?.country_code,
      )?.format || countryCodes[0].format,
    );
  }, [state, setPhoneFormat]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setRecaptchaSize("compact");
      } else {
        setRecaptchaSize("normal");
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {!state?.success && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {!hideTitle && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 text-left mb-1">
                {t("forms.Login.title")}
              </h1>
              <p className="text-sm font-normal text-gray-600 text-left mb-1">
                {t("forms.Login.description")}
              </p>
            </div>
          )}

          <div
            className={cn(
              "flex rounded-md outline-none",
              state?.zod_errors?.phone ? "border-red-500" : "",
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
                setState({ ...state, country_code: value });
              }}
            >
              <SelectTrigger
                aria-label="country codes dropdown"
                hideChevron
                placeholder=""
                className="w-min h-14 flex-shrink-0 items-center outline-none text-sm font-medium text-center text-gray-900 bg-white border border-[#DBD1F8] rounded-e-none"
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
              placeholder={t("forms.Login.Labels.phone_number")}
              className={cn("rounded-l-none border-l-0 w-full")}
              ref={inputPhoneRef}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setState({ ...state, phone: e.target.value });
              }}
            />
          </div>
          {/* <div className={cn("flex flex-col gap-2")}>
            <div className='relative'>
              <Input
                required
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder={t('Login.Labels.password')}
                className={cn(state?.zod_errors?.password?.length > 0 && 'outline outline-1 outline-destructive-foreground')}
              />
              <Button
                type="button"
                variant="child"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setPasswordVisible(p => !p)}
                aria-label="toggle password visibility"
                aria-describedby="toggle password visibility"
              >
                <IconPasswordEye active={!passwordVisible} className='text-[#212121]' />
              </Button>
            </div>
          </div> */}

          {/* Remember me checkbox */}
          <div className={"flex items-center justify-between"}>
            {" "}
            {/* <div className="flex items-start">
              <Checkbox
                aria-label="remember me"
                aria-describedby="remember me"
                id="remember_me"
                name="remember_me"
                onCheckedChange={() => {
                  setRemember_me(!state.remember_me);
                  setState({ ...state, remember_me: !state.remember_me });
                }}
              />
              <label
                htmlFor="remember_me"
                className="text-gray-500 ml-2 float-left text-xs"
              >
                {t("forms.Login.Labels.stay_logged_in")}
              </label>
            </div> */}
            {/* <div className=''>
            {isInDialog ? (
              <SheetCloseTrigger asChild>
                <Link href={ROUTES.forgotPasswordPage.path[lang]} className="text-xs font-normal text-primary text-right w-full mb-1">
                  {t("Login.forgot_password")}
                </Link>
              </SheetCloseTrigger>
            ) : (
              <Link href={ROUTES.forgotPasswordPage.path[lang]} className="text-xs font-normal text-primary text-right w-full mb-1">
                {t("Login.forgot_password")}
              </Link>
            )}
            </div> */}
          </div>

          {recaptchaCounter && (
            <div className="w-80">
              <ReCAPTCHA
                sitekey="6LfhNggqAAAAAD9NsnTabKD6ltpPUw0JDW2M8U98"
                onChange={handleRecaptchaChange}
                badge="bottomright"
                size={recaptchaSize}
              />
            </div>
          )}

          <Input
            style={{ display: "none" }}
            className="hidden"
            id="captcha_token"
            name="captcha_token"
            value={captcha_token}
          />
          {(state?.zod_errors?.phone || !(state?.message === "")) && (
            <p
              aria-live="polite"
              className="error-paragraph w-full"
              role="status"
            >
              {Object.keys(state?.zod_errors ?? {}).length > 0
                ? (Object.values(state.zod_errors)[0] as string[])[0]
                : state?.message}
            </p>
          )}
          <SubmitButton label={t("forms.Login.submit")} />
        </form>
      )}

      {state?.success && <LoginWithOtp identifier={state?.identifier} />}
    </div>
  );
}
