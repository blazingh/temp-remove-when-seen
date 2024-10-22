"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, MessageSquare } from "lucide-react";
import { useRouter } from "@/navigation";
import { signIn, useSession } from "next-auth/react";
import Countdown from "react-countdown";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n";
import SITEROUTES from "@/constants/site_routes";
import { SheetContext } from "@/contextPorviders/sheetContext";
import useUtils from "@/hooks/utils-hook";
import { getAutofillOtp } from "@/lib/client/opt";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
  appointment_type,
  id,
  resend,
}: {
  resend: () => any;
  identifier: any;
  date: string;
  startedMinute: string;
  appointment_type: string;
  id: string;
}) {
  const { t, lang, session, sheet } = useUtils({
    nameSpace: "forms.appointmentOtp",
  });
  const router = useRouter();

  async function handleSubmit(prevState: any, formData: FormData) {
    const res = await signIn("credentials", {
      identifier: formData.get("identifier"),
      otp_code: formData.get("otp_code"),
      redirect: false,
    });
    if (!res?.ok) return { success: false, message: res?.error };
    return { success: true };
  }

  const [otpValue, setOtp] = useState("");
  const [state, formAction] = useFormState(handleSubmit, initialState);
  const [otpExpired, setOtpExpired] = useState(false);

  const [now] = useState(Date.now());

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.success || !session?.user?.tokens?.appointment_data) return;
    const { is_booked, reserve_id } = session.user.tokens.appointment_data;
    const path = is_booked
      ? SITEROUTES.appointmentSuccess
      : SITEROUTES.appointmentForm;
    router.push({
      pathname: path,
      query: {
        id: id,
        date: date,
        "started-minute": startedMinute,
        appointment_type: appointment_type,
        "reserve-id": reserve_id,
      },
    });
    sheet?.close();
  }, [session?.user, state]);

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
      <form action={formAction} className="flex flex-col gap-12 " ref={formRef}>
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
          onComplete={() => !otpExpired && formRef.current?.requestSubmit()}
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
              : state?.message === "otp_expired"
                ? "OTP süresi doldu! Lütfen yeni bir OTP isteyin."
                : state?.message === "invalid_verification_code"
                  ? "Geçersiz doğrulama kodu! Lütfen doğru kodu gir."
                  : state?.message}
          </p>
        )}
        <div className="flex items-center justify-center">
          {!otpExpired && (
            <Countdown
              date={now + 65000}
              onComplete={() => setOtpExpired(true)}
              renderer={({ total }) => {
                return (
                  <p className="w-[44px] h-[44px] rounded-full border-2 border-primary font-semibold flex items-center justify-center">
                    {total / 1000}
                  </p>
                );
              }}
            />
          )}
          {otpExpired && (
            <Button
              onClick={() => resend && resend()}
              size={"sm"}
              type="button"
            >
              <MessageSquare className="mr-2" /> {t("resend")}
            </Button>
          )}
        </div>
        <SubmitButton
          label={lang === "en" ? "Confirm" : "Onayla"}
          disabled={otpExpired}
        />
      </form>
    </div>
  );
}
