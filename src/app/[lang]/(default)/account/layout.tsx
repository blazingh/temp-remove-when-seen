import { Locale } from "@/i18n";
import SITEROUTES from "@/constants/site_routes";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getPathname, redirect } from "@/navigation";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
import { ROUTES } from "@/constants/routes";

type PageProps = {
  params: {
    lang: Locale;
  };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: PageProps) {
  return {
    title: ROUTES.userPage.title[params.lang],
    description: ROUTES.userPage.description[params.lang],
    alternates: {
      canonical: getPathname({
        href: {
          pathname: SITEROUTES.userPage,
        },
        locale: params.lang,
      }),
      languages: {
        en: getPathname({
          href: {
            pathname: SITEROUTES.userPage,
          },
          locale: "en",
        }),
        tr: getPathname({
          href: {
            pathname: SITEROUTES.userPage,
          },
          locale: "tr",
        }),
      },
    },
  };
}

export default async function Layout({
  params,
  children,
}: {
  params: { lang: Locale };
  children: React.ReactNode;
}) {
  unstable_setRequestLocale(params.lang);
  const session = await getServerSession(authOptions);
  const messages = await getMessages();

  if (!session?.user) redirect(SITEROUTES.login);

  return (
    <>
      <NextIntlClientProvider
        locale={params.lang}
        messages={pick(messages, ["pages.Profile"])}
      >
        {children}
      </NextIntlClientProvider>
    </>
  );
}
