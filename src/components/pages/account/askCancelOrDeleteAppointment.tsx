
"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import router from "next/router";
import { useState } from "react";

export default function AskCancelOrDelete(
  { items }: { items: any }
) {
  const [open, setOpen] = useState(true);
  const user = useSession();

  const token = user.data?.user.tokens.accessToken
  if (!token) router.push('/login')

  const closeHandler = () => {
    setOpen(false);
  };

  const changeOrCancelAppointments = async (isCancel: boolean, items: any) => {
    const data = {
      book_id: items.id,
    }
    try {


      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api-appointments/v2/appointment/delete', {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        return {
          message: (await response.json()).error?.message || 'İptal ederken problem ile karşılaşıldı',
          success: false
        }
      }
      window.location.reload()

    } catch (error) {
      return { message: 'İptal ederken problem ile karşılaşıldı', success: false }
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={closeHandler}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            Randevunu iptal etmek istediğine emin misin ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex w-full">
            <AlertDialogAction className="w-2/4 mr-2" onClick={() => changeOrCancelAppointments(true, items)}>Evet</AlertDialogAction>
            <AlertDialogAction className="w-2/4 mr-2" onClick={closeHandler}>Hayır</AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}









