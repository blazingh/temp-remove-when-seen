"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function ReviewFormSuccess() {
  const [open, setOpen] = useState(true);

  const closeHandler = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <AlertDialog open={open} onOpenChange={closeHandler}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            Yorum düzenleme işlemini başarıyla tamamladın.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={closeHandler}>Tamam</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
