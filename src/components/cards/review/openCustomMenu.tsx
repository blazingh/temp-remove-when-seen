'use client'

import { MoreHorizontal } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"




export default function OpenCustomMenu(
    {
        id,
        setOpen,
        setOpenEdit
    }: {
        id: number,
        setOpen: (item:boolean) => void,
        setOpenEdit: (item:boolean) => void
    }    
) {


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger><MoreHorizontal className="h-4 w-4" /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => { setOpenEdit(true) }}>Düzenle</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { setOpen(true) }}>Sil</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}


