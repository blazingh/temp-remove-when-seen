import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { RegisterForm } from "@/components/forms/register-with-phone";
import { Locale } from "@/i18n";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect, Link } from "@/navigation";
import SITEROUTES from "@/constants/site_routes";

export default async function Page({ params }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang);

  const session = await getServerSession(authOptions);

  if (session?.user) redirect(SITEROUTES.userProfile);

  const t = await getTranslations("forms.Register");

  const messages = await getMessages();

  return (
    <div className="w-full max-w-xl mx-auto">
      <NextIntlClientProvider
        messages={pick(messages, ["forms.Register", "forms.Otp_confirmation"])}
      >
        <RegisterForm />
      </NextIntlClientProvider>

      {/* login link */}
      <div className="flex items-center justify-center mt-2">
        {t("has_account")} &nbsp;
        <Link
          className="font-medium text-blue-600 hover:underline text-center"
          href={SITEROUTES.login}
        >
          {t("login")}
        </Link>
      </div>
    </div>
  );
}
