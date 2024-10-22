import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from './dialog';

interface HidePrivacyPopupProps {
  privacyPolicyText: string;
  title: string;
  textColor?: string;
  content: React.ReactNode;
}

const defaultProps: Partial<HidePrivacyPopupProps> = {
  textColor: 'text-[#7424ff]'
};


function HidePrivacyPopup({ privacyPolicyText, content, title, textColor }: HidePrivacyPopupProps) {
  const [show, setShow] = useState(false);

  return (

    <>
      <button className='text-[#7424ff]' onClick={() => setShow(true)}>{privacyPolicyText}</button>
      <Dialog open={show} onOpenChange={() => { setShow(false) }} >
        <DialogContent
          onPointerDownOutside={() => setShow(false)}
          className="p-6 z-50"
        >
          <DialogHeader>
            <div className="text-xl font-semibold">
              {title}
            </div>
          </DialogHeader>
          <DialogDescription className="h-[80vh] overflow-y-auto">
            <div className="h-full">
              {content}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default HidePrivacyPopup;
