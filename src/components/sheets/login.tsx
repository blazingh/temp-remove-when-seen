"use client";

import IconLeft from "@/icons/arrowLeft";
import { useEffect, useRef } from "react";
import { LoginWithPhoneForm } from "@/components/forms/login-with-phone";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import SheetContentTrigger from "./sheet-content-trigger";
import RightMenuSheetContent from "./rightMenu";

export default function LoginSheetContent() {
  const t = useTranslations() as any;

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
          <span className="text-xl font-medium">{t("sheets.Login.title")}</span>
        </div>
      </div>
      <div className="w-full mt-8">
        <Tabs defaultValue="login" className="w-full">
          <TabsContent value="login">
            <LoginWithPhoneForm hideTitle isInDialog />
          </TabsContent>
          {/* <TabsContent value="register">
              <LoginWithEmailForm hideTitle isInDialog />
            </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
