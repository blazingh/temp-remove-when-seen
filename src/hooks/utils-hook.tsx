import { SheetContext } from "@/contextPorviders/sheetContext";
import { Locale } from "@/i18n";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useContext } from "react";

type UtilsProps = {
  nameSpace?: Parameters<typeof useTranslations>[0];
};

export default function useUtils({ nameSpace }: UtilsProps) {
  const t = useTranslations(nameSpace);
  const lang = useLocale() as Locale;
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const sheet = useContext(SheetContext);

  return {
    t,
    lang,
    session,
    sheet,
    queryClient,
  };
}
