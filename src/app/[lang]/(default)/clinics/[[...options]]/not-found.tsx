'use client'
import PaginationButtonBar from "@/components/ui/paginationButtonGroup";
import { Locale } from "@/i18n";

export default function NotFound({
  totalPages,
  lang,
}: {
  totalPages: number,
  lang: Locale
}) {
  return (
    <div className='h-[300px] flex items-center justify-start flex-col gap-10 pt-10'>
      <p className="font-bold">Klinik bulunamadı.</p>

      <PaginationButtonBar totalPages={0} lang={lang} />
    </div>
  )
}
