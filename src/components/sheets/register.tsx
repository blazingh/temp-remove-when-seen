"use client";
import IconLeft from "@/icons/arrowLeft";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { RegisterForm } from "@/components/forms/register-with-phone";
import { useSession } from "next-auth/react";
import SheetContentTrigger from "./sheet-content-trigger";
import RightMenuSheetContent from "./rightMenu";

export default function RegisterSheetContent() {
  const t = useTranslations("sheets.Register") as any;

  const { data: session } = useSession();

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (session?.user) ref.current?.click();
  }, [session, ref]);

  return (
    <div className="w-full h-full block">
      <div className="flex items-center justify-start">
        <SheetContentTrigger
          sheetProps={{
            side: "right",
            content: <RightMenuSheetContent />,
          }}
          ref={ref}
        >
          <IconLeft />
        </SheetContentTrigger>
        <div className="ml-4">
          <span className="text-xl font-bold">{t("title")}</span>
        </div>
      </div>
      <div className="w-full mt-8">
        <RegisterForm hideTitle />
      </div>
    </div>
  );
}
