"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import Countdown from "react-countdown";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/navigation";
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

export function LoginWithOtp({
  identifier,
  afterSuccess,
}: {
  identifier: any;
  afterSuccess?: () => void;
}) {
  const t = useTranslations("forms") as any;
  const t2 = useTranslations("messages.Errors") as any;
  const router = useRouter();

  const [counterCompleted, setCounterCompleted] = useState(false);
  const [otpValue, setOtp] = useState("");

  async function handleSubmit(prevState: any, formData: FormData) {
    const res = await signIn("credentials", {
      identifier: formData.get("identifier"),
      otp_code: formData.get("otp_code"),
      redirect: false,
    });

    if (!res?.ok) return { success: false, message: t2(res?.error) };

    if (afterSuccess) afterSuccess();
    else router.refresh();

    return { success: true };
  }

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
        className="flex flex-col gap-12 h-[90svh]"
        ref={formRef}
      >
        <input type="hidden" name="identifier" value={identifier} />

        <div className="flex flex-col gap-2">
          <h2 className="text-foreground font-bold text-xl">
            {t("Otp_confirmation.Labels.sms_code")}
          </h2>
          <p className="text-foreground">
            {t("Otp_confirmation.Descriptions.sms_code")}
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
            <p
              aria-live="polite"
              className="error-paragraph"
              role="status"
              data-id="test"
            >
              {Object.keys(state?.zod_errors ?? {}).length > 0
                ? state?.zod_errors[Object.keys(state?.zod_errors ?? {})[0]][0]
                : state?.message}
            </p>
          )}
          <SubmitButton
            label={t("Otp_confirmation.submit")}
            disabled={counterCompleted}
          />
        </div>
      </form>
    </div>
  );
}
