"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"


const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

type SheetSide = (typeof SHEET_SIDES)[number]

export default function SheetSide() {
  return (
    <div className="grid grid-cols-2 gap-2 min-h-screen p-10">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetClose />
            <SheetHeader>
              <SheetTitle>{side}</SheetTitle>
              <SheetDescription>Sheet description</SheetDescription>
            </SheetHeader>
            <div className="min-h-40">
            </div>
            <SheetFooter>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}

