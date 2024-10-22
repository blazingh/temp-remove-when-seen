"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import SITEROUTES from "@/constants/site_routes";
import { useRouter } from "@/navigation";
import { useState } from "react";

export default function RegisterFormSuccess() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const closeHandler = () => {
    setOpen(false);
    router.push(SITEROUTES.home);
  };

  return (
    <AlertDialog open={open} onOpenChange={closeHandler}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            Diştedavim ön kayıt işlemini başarıyla tamamladın. Satış
            temsilcimiz kayıt sürecini tamamlamak için sizinle en kısa süre
            içerisinde iletişime geçecektir.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={closeHandler}>Tamam</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
