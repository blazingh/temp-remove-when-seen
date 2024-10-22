'use client'
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import { useState } from 'react';
import { RegisterWithOtp } from '@/components/pages/clinic_register/registerWithOTP';
import { useTranslations } from 'next-intl';


export default function OtpPopup(
  { identifier }: { identifier: string }
) {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Sheet open={isOpen} key={'map'}>
        <SheetContent side={'bottom'}>
          <SheetClose onClick={() => { setIsOpen(false) }} className='items-start justify-start left-2.5 top-8 w-[20px]' />
          <RegisterWithOtp identifier={identifier} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
