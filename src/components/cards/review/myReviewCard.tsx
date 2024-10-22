import IconStarEmpty from "@/icons/starEmpty";
import { Rating } from 'react-simple-star-rating'
import IconStarFilled from "@/icons/starFilled";
import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";

import OpenCustomMenu from "./openCustomMenu";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { EditReviewForm } from "@/components/forms/editReviewForm";



export default function MyReviewCard(
  {
    id,
    reviewComment,
    clinicName,
    dentistName,
    dentistLastName,
    createdAt,

    reviewScore,
    subjectType
  }: {
    id: number,
    reviewComment: string
    clinicName: string
    dentistName: string
    dentistLastName: string
    createdAt: string
    reviewScore: number
    subjectType: string
  }
) {
  const session = useSession()

  const token = session.data?.user.tokens.accessToken
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)



  const removeMyReview = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api-patients/reviews/delete/' + id + '', {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
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

  const closeHandler = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  function formatDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);

    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', ''); // Virgülü kaldır

    return formattedDate;
  }


  return (
    <div className={cn('w-full border rounded-md flex flex-col p-4 pb-2 gap-3 bg-card', reviewComment != null && 'h-[180px]')}>
      {/* comment */}
      {reviewComment != null && <p className="text-foreground text-xs line-clamp-6">{reviewComment}</p>}

      {/* Altta sabit kalan bölüm */}
      <div className="mt-auto">
        <div className="flex gap-2">
          <div className="flex  w-full justify-between items-center">

            <div >
              <div className="flex gap-1 items-end event-none h-min max-h-4">

                <span className="font-bold text-sm text-foreground font-nunito">{reviewScore}</span>
                <Rating
                  allowFraction
                  initialValue={reviewScore}
                  emptyIcon={<IconStarEmpty className="w-3 h-3 inline" />}
                  fillIcon={<IconStarFilled className="w-3 h-3 inline" />}
                  onClick={function noRefCheck() { }}
                  readonly
                />
              </div>
              <p className="text-sm font-bold">klinik adı:{clinicName} </p>
              {dentistName && <p className="text-sm font-bold">doktor adı: {dentistName} {dentistLastName}</p>}
              <p className="text-sm font-bold">yorum yapılan tarih: {formatDateTime(createdAt)}</p>
            </div>
            <OpenCustomMenu id={id} setOpen={setOpen} setOpenEdit={setOpenEdit} />
            <AlertDialog open={open} onOpenChange={closeHandler}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogDescription>
                    Yorumunu  silmek istediğine emin misin?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <div className="flex w-full">
                    <AlertDialogAction className="w-2/4 mr-2" onClick={() => removeMyReview()}>Evet</AlertDialogAction>
                    <AlertDialogAction className="w-2/4 mr-2" onClick={closeHandler}>Hayır</AlertDialogAction>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={openEdit} onOpenChange={closeHandler} >
              <AlertDialogContent className="w-full">
                <AlertDialogHeader>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <EditReviewForm id={id} subjectBody={reviewComment} subjectRate={reviewScore} subjectType={subjectType} />
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>

  )
}
