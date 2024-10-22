'use client'
import IconFilter from "@/icons/filter";
import IconLocation from "@/icons/location"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FilterBottomSheets from '@/components/pages/doctors/filterBottomSheetsDoctors';
import { useState } from "react";
import MapOptions from "../mapOptions";


export default function BottomFilterBar(
) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);


  const path = "/home" as string
  useState
  return (
    <div>
      <div>
        <Sheet open={isOpen} key={'filter'}>
          <SheetContent side={'bottom'}>
            <SheetClose onClick={() => { setIsOpen(false) }} className='items-start justify-start left-2.5 top-8' />
            <FilterBottomSheets />
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <Sheet open={isMapOpen} key={'map'}>
          <SheetContent side={'bottom'}>
            <SheetClose onClick={() => { setIsMapOpen(false) }} className='items-start justify-start left-2.5 top-8' />
            <MapOptions/>
          </SheetContent>
        </Sheet>
      </div>
      <div className={"w-full fixed bottom-8 h-14 z-30 md:hidden"}>
        <div className="w-80 mx-auto h-full bg-black flex items-center justify-center p-3 rounded-full">
          <div className="flex" onClick={() => {
            setIsOpen(true)
          }}>
            <IconFilter className="mx-2 text-white" />
            <span className="text-md text-white mx-2" >Filtrele</span>
          </div>
          <div className="flex" onClick={() => {
            setIsMapOpen(true)
          }}>
          <IconLocation className="text-white mx-2" />
          <span className="text-md text-white mx-2">Haritada Gör
          </span>
          </div>
         
        </div>
      </div>
    </div>
  )
}
