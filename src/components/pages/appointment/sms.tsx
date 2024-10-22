"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import Countdown from "react-countdown";
import { useEffect, useRef, useState } from "react";
import { Locale } from "@/i18n";
import SITEROUTES from "@/constants/site_routes";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { getAutofillOtp } from "@/lib/client/opt";

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

export function LoginWithOtpAppointment({
  identifier,
  date,
  startedMinute,
  id,
}: {
  identifier: any;
  date: string | null;
  startedMinute: string | null;
  id: string | null;
}) {
  const router = useRouter();

  const lang = useLocale() as Locale;

  async function handleSubmit(prevState: any, formData: FormData) {
    const data = {
      identifier: formData.get("identifier"),
      otp_code: formData.get("otp_code"),
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/api-patients/auth/verify_otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error();
    }
    const verifyData = await response.json();

    const { is_booked, reserve_id } = verifyData.appointment_data;

    if (id && date && startedMinute) {
      if (is_booked == "true") {
        router.push({
          pathname: SITEROUTES.appointmentSuccess,
          query: { id: id, date: date, "started-minute": startedMinute },
        });
      } else {
        router.push({
          pathname: SITEROUTES.appointmentForm,
          query: {
            id: id,
            date: date,
            "started-minute": startedMinute,
            "reserve-id": reserve_id,
          },
        });
      }
    }

    return { success: true };
  }

  const [counterCompleted, setCounterCompleted] = useState(false);
  const [otpValue, setOtp] = useState("");
  const [state, formAction] = useFormState(handleSubmit, initialState);

  const [now] = useState(Date.now());

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      navigator.credentials
        .get({
          // @ts-ignore
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          ac.abort();
          // @ts-ignore
          setOtp((p) => otp?.code || p);
        })
        .catch((err) => {
          ac.abort();
        });
    }
  }, []);

  return (
    <div>
      <form
        action={formAction}
        className="flex flex-col gap-12 mt-[50px]"
        ref={formRef}
      >
        <input type="hidden" name="identifier" value={identifier} />

        <div className="flex flex-col gap-2">
          <h2 className="text-foreground font-bold text-xl">
            {lang === "en" ? "Confirmation Code" : "Onay Kodu"}
          </h2>
          <p className="text-foreground">
            {lang === "en"
              ? "Enter the confirmation code received via message."
              : "Mesaj ile gelen onay kodunu gir."}
          </p>
        </div>

        <InputOTP
          autoFocus
          maxLength={6}
          id="otp_code"
          name="otp_code"
          value={otpValue}
          onChange={setOtp}
          containerClassName="w-full flex justify-center"
          onComplete={() =>
            !counterCompleted && formRef.current?.requestSubmit()
          }
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }, (_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {state?.success === false && (
          <p aria-live="polite" className="error-paragraph" role="status">
            {Object.keys(state?.zod_errors ?? {}).length > 0
              ? state?.zod_errors[Object.keys(state?.zod_errors ?? {})[0]][0]
              : state?.message}
          </p>
        )}

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

        <SubmitButton label={lang === "en" ? "Confirm" : "Onayla"} />
      </form>
    </div>
  );
}
