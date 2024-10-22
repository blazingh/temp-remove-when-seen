import { Skeleton } from "@/components/ui/skeleton"
import IconCreditCard from "@/icons/creditCard"
import IconWallet from "@/icons/walletIcon"
import { useTranslations } from "next-intl";

export default function ClinicPaymentMethodSections(
  {
    lang
  }: {
    lang: any
  }
) {

  const t = useTranslations('layout.clinicPage') as any

  return (
    <div>

      <ItemCard
        title={t('payment_methods')}
        content={
          <div className="flex flex-col gap-4">
            <div className='flex gap-4 items-center'>
              <div className='bg-[#F4F4F4] p-2 flex items-center rounded-full'>
                <IconCreditCard className='w-[24px] h-[24px] flex-shrink-0' />
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-sm font-poppins font-bold'>{t('payment_methods_12')}</span>
                {/* <span className='text-xs'>{t('payment_methods_3')}</span> */}
              </div>
            </div>

            <div className='flex gap-4 items-center'>
              <div className='bg-[#F4F4F4] p-2 rounded-full flex items-center'>
                <IconWallet className='w-[24px] h-[24px] flex-shrink-0' />
              </div>
              <span className='text-base font-poppins font-bold'>Nakit ile ödeme</span>
            </div>
          </div>
        }
        trigger={null}
      />

    </div>
  )
}
function ItemCard({ trigger, title, content }: { trigger: React.ReactNode, title: string, content: React.ReactNode }) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex w-full items-start justify-between mb-4">
        <h3 className="text-xl font-extrabold">
          {title}
        </h3>
        {trigger}
      </div>
      {content}
    </div>
  );
}