'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import IMAGES_LINKS from "@/constants/images_links";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SpecialPopup({
  itemKey,
  itemTimeOut = 86400000, // 24 hours
  isHome
}: {
  itemKey: string,
  itemTimeOut?: number
  isHome: boolean
}) {

  const [open, setOpen] = useState(false);

  function handleInit() {
    // wait 2 secconds: better user expirence
    setTimeout(() => {
      const date = Date.now();
      const itemValue = localStorage.getItem(itemKey)
      if (itemValue && (date - Number(itemValue) < itemTimeOut)) return
      setOpen(true)
    }, 2000)
  }

  useEffect(() => {
    handleInit()
  }, []);

  function handleOpenChange(val: any) {
    if (val) { setOpen(val); return }
    const date = Date.now();
    setOpen(false)
    localStorage.setItem(itemKey, String(date))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="p-2" onClick={() => handleOpenChange(false)}>
        <Image src={isHome ? IMAGES_LINKS.POPUPMAINPAGE : IMAGES_LINKS.POPUPLISTPAGE} alt="dtSanalPOS" width={1000} height={1000} className="rounded-sm overflow-hidden bg-gray-50" />
      </DialogContent>
    </Dialog>
  )
}
