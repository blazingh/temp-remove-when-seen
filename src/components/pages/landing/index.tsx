
"use client";

import CookiesSheetContent from "@/components/sheets/cookiesSheet";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function CookiesPermission() {
    const [open, setOpen] = useState(true);


    function handleOpenChange() {
        const date = Date.now();
        setOpen(false)
        localStorage.setItem('cookiesPermission', String(date))
    }

    return (
        <>
            {open && <div className=" bg-primary flex flex-col justify-center items-center fixed bottom-[60px] left-1/2 w-full transform -translate-x-1/2 shadow-[0_0_4px_0_rgba(0,0,0,0.11)] z-50 md:hidden text-black">
                <SheetContentTrigger
                    className="flex justify-center items-center"
                    sheetProps={{
                        side: "bottom",
                        content: < CookiesSheetContent />,
                    }}
                >
                    <div className="flex flex-col text-white px-4 w-full justify-center items-center">
                        <span className="text-sm text-center">
                            Daha iyi bir deneyim için iznini istiyoruz.
                        </span>
                        <span className="text-sm text-center">
                            <span className="underline"> çerez politikamızı</span> kabul ediyor musun ?
                        </span>
                    </div>
                </SheetContentTrigger>

                <div className="w-full flex justify-center items-center">
                    <Button className="px-4 py-2" onClick={handleOpenChange}>Kabul Et</Button>
                </div>
            </div>}
        </>
    );
}
