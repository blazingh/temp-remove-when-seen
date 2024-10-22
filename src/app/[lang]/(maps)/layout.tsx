import { pick } from 'lodash';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, 'layout')}>

      <main className="mx-auto">
        {children}
      </main>

    </NextIntlClientProvider>
  );
}

