import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n";
import type { Metadata } from 'next';
import { notFound } from "next/navigation";

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Hata Aradığın Sayfa Bulunamadı!',
};
/* just test meta data */

export default function Page({ params }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang);
  notFound()
}
