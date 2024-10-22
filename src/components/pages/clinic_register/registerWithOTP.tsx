"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Countdown from "react-countdown";
import { useEffect, useRef, useState } from "react";
import { APIROUTE } from "@/constants/api_routes";
import RegisterFormSuccess from "./registerSuccess";

const initialState = {
  identifier: "",
  otp_code: "",
};

function SubmitButton({ label, ...props }: ButtonProps & { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className={cn(pending && "opacity-50", "w-full")}
      {...props}
    >
      {pending ? <Loader2 className="h-6 w-6 animate-spin" /> : label}
    </Button>
  );
}

export function RegisterWithOtp({
  identifier,
  afterSuccess,
}: {
  identifier: any;
  afterSuccess?: () => void;
}) {
  const [counterCompleted, setCounterCompleted] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);

  async function registerWithOtp(otp_code: string, identifier: string) {
    try {
      const response = await fetch(APIROUTE("registerClinicOTP"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp_code, identifier }),
      });

      if (!response.ok) {
        return { success: false, message: "Hata oluştu" };
      }

      return { success: true, message: "Başarılı" };
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  }

  async function handleSubmit(prevState: any, formData: FormData) {
    const otp_code = formData.get("otp_code");

    if (otp_code === null) return { success: false, message: "Hata oluştu" };

    const response = await registerWithOtp(String(otp_code), identifier);

    if (!response) return { success: false, message: "Hata oluştu" };
    if (!response.success)
      return { success: false, message: "İstek Başarılı olamadı" };
    setIsOpenSuccess(true);
    return { success: true };
  }

  const [otpCode, setOtpCode] = useState("");
  const [state, formAction] = useFormState(handleSubmit, initialState);

  const [now] = useState(Date.now());

  const fistInputRef = useRef(null);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      fistInputRef?.current?.focus();
    } catch (e) { }
  }, []);

  useEffect(() => {
    if (otpCode.length === 6) {
      formRef.current?.requestSubmit();
    }
  }, [otpCode]);

  return (
    <div className="pt-10">
      <form
        action={formAction}
        className="flex flex-col gap-12 h-auto"
        ref={formRef}
      >
        <input type="hidden" name="identifier" value={identifier} />
        <input type="hidden" name="otp_code" value={otpCode} />

        <div className="flex flex-col gap-2">
          <h2 className="text-foreground font-bold text-xl">
            {/* {t('Otp_confirmation.Labels.sms_code')} */}
            Onay Kodu
          </h2>
          <p className="text-foreground">
            {/* {t('Otp_confirmation.Descriptions.sms_code')} */}
            Telefonuna gelen doğrulama kodunu gir
          </p>
        </div>

        <div className="flex gap-2 w-full justify-around items-center">
          {Array(6)
            .fill("")
            .map((_, index) => (
              <input
                type="number"
                ref={index === 0 ? fistInputRef : null}
                key={index}
                required
                id={`otp_code_${index}`}
                name={`otp_code_${index}`}
                value={otpCode[index] ?? ""}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    setOtpCode((prev) => prev.slice(0, -1));
                    // @ts-ignore
                    const prev = e.target.previousElementSibling;
                    if (prev) {
                      // @ts-ignore
                      try {
                        prev.focus();
                      } catch { }
                    }
                  }
                  if (e.key === "ArrowRight") {
                    // @ts-ignore
                    const next = e.target.nextElementSibling;
                    if (next) {
                      // @ts-ignore
                      try {
                        next.focus();
                      } catch { }
                    }
                  }
                  if (e.key === "ArrowLeft") {
                    // @ts-ignore
                    const prev = e.target.previousElementSibling;
                    if (prev) {
                      // @ts-ignore
                      try {
                        prev.focus();
                      } catch { }
                    }
                  }
                }}
                onChange={(e) => {
                  const target = e.target;
                  const val = target.value as string;
                  if (val != "") {
                    setOtpCode((prev) => prev + String(val));
                    const next = target.nextElementSibling;
                    if (next) {
                      try {
                        // @ts-ignore
                        next.focus();
                      } catch { }
                    }
                  }
                }}
                maxLength={1}
                pattern="\d*"
                className="border-b-2 border-[#757575] w-[36px] text-center font-semibold text-xl focus:outline-none"
              />
            ))}
        </div>

        <div className="flex items-center justify-center">
          <Countdown
            date={now + 60000}
            onComplete={() => {
              setCounterCompleted(true);
            }}
            renderer={({ seconds }) => {
              return (
                <p className="w-[44px] h-[44px] rounded-full border-2 border-primary font-semibold flex items-center justify-center">
                  {seconds}
                </p>
              );
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          {state?.success === false && (
            <p aria-live="polite" className="error-paragraph" role="status">
              {Object.keys(state?.zod_errors ?? {}).length > 0
                ? state?.zod_errors[Object.keys(state?.zod_errors ?? {})[0]][0]
                : state?.message}
            </p>
          )}
          <SubmitButton
            //  label={t('Otp_confirmation.submit')}
            label="Onayla"
            disabled={counterCompleted}
          />
        </div>
        {isOpenSuccess === true && <RegisterFormSuccess />}
      </form>
    </div>
  );
}
