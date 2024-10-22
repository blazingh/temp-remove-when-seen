"use client";

export function getAutofillOtp() {
  if ("OTPCredential" in window) {
    const ac = new AbortController();
    setTimeout(() => {
      ac.abort(); // abort after 30 sec
    }, 30 * 1000);
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
}
