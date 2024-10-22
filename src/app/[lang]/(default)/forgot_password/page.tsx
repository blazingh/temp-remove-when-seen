import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n";
import { RenewPasswordWithPhoneForm } from "@/components/forms/renew-passwor-with-phone";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";

export default async function Page({ params }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang);

  const messages = await getMessages();

  return (
    <div className="w-full max-w-xl mx-auto">
      <NextIntlClientProvider
        messages={pick(messages, [
          "forms.Renew_password",
          "forms.Otp_confirmation",
          "messages.Errors",
        ])}
      >
        <RenewPasswordWithPhoneForm />
      </NextIntlClientProvider>
      {/*
      <Tabs defaultValue="login" className="w-full">
        <NextIntlClientProvider
          messages={pick(messages, ["forms.Login", "forms.Otp_confirmation"])}
        >

          <TabsContent value="login">
            <LoginWithPhoneForm />
          </TabsContent>

          <TabsContent value="register">
            <LoginWithEmailForm />
          </TabsContent>

        </NextIntlClientProvider>
      </Tabs>
      */}

      {/* register link */}
      {/*
      <div className="flex items-center justify-center mt-2">
        {t('no_account')} &nbsp;<Link className="font-medium text-blue-600 hover:underline text-center" href="/register">{t('create_account')}</Link>
      </div>
      */}
    </div>
  );
}
