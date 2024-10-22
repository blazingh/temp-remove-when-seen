import AuthContextProvider from "./auth";
import TanstackQueryContextProvider from "./query";
import SheetContextProvider from "./sheetContext";
import { getMessages } from "next-intl/server";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";

// add all context providers in this component
export default async function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <>
      {/* add any global translation here */}
      <NextIntlClientProvider
        messages={pick(messages, [
          "sheets",
          "layout",
          "forms",
          "components.clientLocation",
        ])}
      >
        {/* next auth context for user authentication */}
        <AuthContextProvider>
          {/* tanstack query context for fetching data */}
          <TanstackQueryContextProvider>
            {/* sheet context for opening and closing sheet */}
            <SheetContextProvider>{children}</SheetContextProvider>
          </TanstackQueryContextProvider>
        </AuthContextProvider>
      </NextIntlClientProvider>
    </>
  );
}
