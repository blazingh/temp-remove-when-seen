import { LoginWithPhoneForm } from "@/components/forms/login-with-phone";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { LoginWithEmailForm } from "@/components/forms/login-with-email";
import { Locale } from "@/i18n";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Link, redirect } from "@/navigation";
import SITEROUTES from "@/constants/site_routes";

export default async function Page({ params }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang);

  const session = await getServerSession(authOptions);

  if (session?.user) redirect(SITEROUTES.userPage);

  const t = await getTranslations("forms.Login");

  const messages = await getMessages();

  return (
    <div className="w-full max-w-xl mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <NextIntlClientProvider
          messages={pick(messages, [
            "forms.Login",
            "forms.Otp_confirmation",
            "messages.Errors",
          ])}
        >
          <TabsContent value="login">
            <LoginWithPhoneForm />
          </TabsContent>

          <TabsContent value="register">
            <LoginWithEmailForm />
          </TabsContent>
        </NextIntlClientProvider>
      </Tabs>

      {/* register link */}
      <div className="flex items-center justify-center mt-2">
        {t("no_account")} &nbsp;
        <Link
          className="font-medium text-blue-600 hover:underline text-center"
          href={SITEROUTES.register}
        >
          {t("create_account")}
        </Link>
      </div>
    </div>
  );
}
