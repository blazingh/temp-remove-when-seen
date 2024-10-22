"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button, ButtonProps } from "./ui/button";
import { useState, useTransition } from "react";
import { Loader2, MapPinXInside } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  onfail?: () => void;
  onSuccess?: (geolocation: GeolocationPosition) => void;
};

export default function GetClientLocationButton(props: ButtonProps & Props) {
  const t = useTranslations("components.clientLocation") as any;
  const [failDialogOpen, setfailDialogOpen] = useState(false);
  const [loading, startTransition] = useTransition();

  function success(geolocation: GeolocationPosition) {
    setfailDialogOpen(false);
    if (props.onSuccess) {
      props.onSuccess(geolocation);
      return;
    }
  }

  function fail() {
    if (props.onfail) {
      props.onfail();
      return;
    }
    setfailDialogOpen(true);
  }

  function tryGetLocation() {
    startTransition(async () => {
      // this await is only for user experience reasions. it has to purpose except to show a loader for 500ms
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        const res = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            if (typeof navigator === "undefined") reject();
            if (!navigator.geolocation) reject();
            navigator.geolocation.getCurrentPosition(
              (geolocation) => {
                resolve(geolocation);
              },
              () => {
                reject();
              },
              { timeout: 10000 },
            );
          },
        );
        success(res);
      } catch (e) {
        fail();
      }
    });
  }

  return (
    <>
      <Button {...props} disabled={loading} onClick={tryGetLocation} />
      <Dialog open={failDialogOpen} onOpenChange={setfailDialogOpen}>
        <DialogContent className="flex flex-col items-center">
          <MapPinXInside className="w-20 h-20 text- shrink-0" />
          <p className="text-xl font-semibold">{t("fail_text")}</p>
          <p className="font-medium">{t("enable_text")}</p>
          <Button
            disabled={loading}
            className="w-full"
            onClick={tryGetLocation}
          >
            {loading && <Loader2 className="animate-spin" />}
            {!loading && t("retry")}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
